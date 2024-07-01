import moment from "moment";
import {
  IUserObj,
  UserVacationHistory,
  UserVacationHistoryObj,
} from "types/staffSettings/vacation";
import { EVacationCell } from "./type";
import { checkIsWorking } from "./functions/checkIsWorking";
import { checkNotRecommended } from "./functions/checkNotRecommended";
import { checkIsRecommended } from "./functions/checkIsRecommended";
import { checkUnused } from "./functions/checkUnused";
import { IVacation } from "types";

export const departmentCollector = (data: any[], departments: any) => {
  for (let i = 0; i < data?.length; i++) {
    departments = [...departments, data[i]?.department];
  }
  return departments;
};

export const departmentAdaptor = (data: any[], sidebar: any, temp: any) => {
  for (let n = 0; n < temp?.length; n++) {
    sidebar = [
      ...sidebar,
      {
        ...temp[n],
        num: data
          ?.filter((p) => p?.department?.id === temp[n]?.id)
          ?.reduce((acc, curr) => {
            return acc + curr?.assignments?.length;
          }, 0),
        children: data?.filter((p) => p?.department?.id === temp[n]?.id),
      },
    ];
  }

  return sidebar;
};

export function generateYearPeriod(
  baseYear: number,
  numberOfYears: number,
  isNext: boolean,
): number[] {
  const period: number[] = [];

  if (isNext) {
    for (let i = 1; i <= numberOfYears; i++) {
      period.push(baseYear + i);
    }
  } else {
    for (let i = 1; i <= numberOfYears; i++) {
      period.push(baseYear - i);
    }
  }

  return period;
}

export interface IGenerateMonths {
  name: string;
  key: string;
}

export function generateMonthsByGivenYear(year: number): IGenerateMonths[] {
  const months: IGenerateMonths[] = [];

  for (let month = 0; month < 12; month++) {
    const monthName = moment(`${year}-${month + 1}-01`).format("MMM");
    months.push({ name: monthName, key: `${monthName}_${year}` });
  }

  return months;
}

const getMonthList = (year: number) => {
  const months = [];
  const fullNames = moment.months();
  const shortNames = moment.monthsShort();
  for (let a = 0; a < 12; a++) {
    months.push({
      short: shortNames[a],
      full: fullNames[a],
      index: a,
      key: a + 1 > 9 ? a + 1 : `0${a + 1}`,
      year: year,
      keyWithYear: `${year}-${a + 1 > 9 ? a + 1 : `0${a + 1}`}`,
    });
  }

  return months;
};

enum VacationType {
  NORMAL = 100,
  EARLY = 200,
}

const checkMonthWithVacations = (
  currentMonth: string,
  vacationsList: UserVacationHistory[],
) => {
  const filteredData = vacationsList.filter((v) => {
    return moment(v.from_date).isSame(`${currentMonth}-01`, "month");
  });
  return {
    availability: filteredData.length > 0,
    vacation: filteredData[0],
    isMulti: filteredData.length > 1,
    allVacations: filteredData,
  };
};

const partOfMonthIdentifier = (date: string): 1 | 2 => {
  const currentDate = moment(date, "YYYY-MM-DD");
  const dayOfMonth = currentDate.date();

  if (dayOfMonth <= 14) {
    return 1;
  }

  return 2;
};

export interface ITypeFuncReturn {
  month_details: {
    short: string;
    full: string;
    index: number;
    key: string | number;
    year: number;
    keyWithYear: string;
  };
  has_vacation: boolean;
  isMulti?: boolean;
  multiVacations?: any[];
  key: string;
  vacation_type: string | number;
  vacationDetails: IVacation;
  part: 1 | 2 | 3 | 0;
  color: string;
}

interface ITypeVacationYear {
  user: IUserObj;
  year: number;
  months: ITypeFuncReturn[];
}

export const getPeriodByYearAdaptor = (
  years: number[],
  user: IUserObj,
  vacationsList: UserVacationHistoryObj,
): ITypeVacationYear[] => {
  const dateInfoByYears: ITypeVacationYear[] = [];

  const vacationTookUserIds = Object.keys(vacationsList);
  const hiderDate = user.staff.hired_date;
  const currentTime = moment(new Date()).format("YYYY-MM-DD");

  const hasVacation = vacationTookUserIds.includes(`${user.user_id}`);

  const nextRecommendedPeriod = `${user?.staff?.next_recommended_vacation}-01`;

  const working_periods = user?.staff?.working_periods;

  const nextRecommendedDate = user.staff.next_recommended_vacation;

  for (let yearIndex = 0; yearIndex < years.length; yearIndex++) {
    const year: ITypeVacationYear = { year: 2000, user: user, months: [] };

    year.months = getMonthList(years[yearIndex]).map((month) => {
      const monthFormatted = `${month.keyWithYear}-01`;
      const monthFormattedMoment = moment(monthFormatted);
      let vacationCheckedWithMonth: any = {};
      let vacationType = "";
      let vacationTypeAsNumber = 100 | 200;
      let part: 1 | 2 = 1;
      const selectedVacations: {
        vacationType: string;
        vacationTypeAsNumber: number;
        part: 1 | 2;
        vacationDetails: any;
      }[] = [];
      let isMulti = false;

      const isWorking = checkIsWorking({
        working_periods,
        checked_date: moment(monthFormatted),
        hiderDate: moment(hiderDate),
      });

      const isRecommended = checkIsRecommended({
        monthFormatted: monthFormattedMoment,
        nextRecommendedPeriod,
      });
      let isNotRecommended = checkNotRecommended({
        monthKeyWithYear: month.keyWithYear,
        hiredDate: hiderDate,
        nextRecommendedDate,
      });
      let isUnused = checkUnused({
        currentMonth: month.keyWithYear,
        vacations: vacationsList,
        user: user,
      });

      if (hasVacation) {
        vacationCheckedWithMonth = checkMonthWithVacations(
          month.keyWithYear,
          vacationsList[user.user_id].vacations,
        );
        isNotRecommended = checkNotRecommended({
          monthKeyWithYear: month.keyWithYear,
          hiredDate: hiderDate,
          nextRecommendedDate,
        });
      }

      if (vacationCheckedWithMonth.availability) {
        const vacationPeriod = moment(
          vacationCheckedWithMonth.vacation.to_date,
        ).isBefore(currentTime)
          ? "past"
          : "upcoming";
        vacationType = `${vacationPeriod}-${vacationCheckedWithMonth.vacation.type}`;
        vacationTypeAsNumber = vacationCheckedWithMonth.vacation.type;
        isMulti = vacationCheckedWithMonth.isMulti;
        part = partOfMonthIdentifier(
          vacationCheckedWithMonth.vacation.from_date,
        );
      }

      if (vacationCheckedWithMonth.availability) {
        vacationCheckedWithMonth.allVacations.map((vacation: any) => {
          const vacationPeriod = moment(vacation.to_date).isBefore(currentTime)
            ? "past"
            : "upcoming";
          const vType = `${vacationPeriod}-${vacation.type}`;

          selectedVacations.push({
            vacationType: vType,
            vacationTypeAsNumber: vacation.type,
            vacationDetails: vacation,
            part: partOfMonthIdentifier(vacation.from_date),
          });
        });
      }

      return {
        month_details: month,
        has_vacation: vacationCheckedWithMonth.availability,
        key: `${month.keyWithYear}-01`,
        vacation_type: vacationType,
        part: part,
        isMulti,
        multiVacations: selectedVacations,
        vacationDetails: vacationCheckedWithMonth.vacation,
        color: !isWorking
          ? EVacationCell.not_working
          : isUnused
            ? EVacationCell.unused_period
            : isNotRecommended ||
                (hasVacation && vacationTypeAsNumber == VacationType.EARLY)
              ? EVacationCell.not_recommended_period
              : isRecommended
                ? EVacationCell.recommended_period
                : EVacationCell.recommended_period,
      };
    });
    year.user = user;
    year.year = years[yearIndex];

    dateInfoByYears.push(year);
  }

  return dateInfoByYears;
};
