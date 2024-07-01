import React, { memo } from "react";
import { ITypeFuncReturn } from "../../../functions";
import moment from "moment/moment";
import { useRouter } from "next/router";
import VacationHoverDetailsPopup from "../../../../hoveredDepartmentDetails";
import { IUserProfile } from "types/userProfile";

interface IProps {
  months: ITypeFuncReturn[];
  userProfile?: IUserProfile;
  hiredDate: string;
  rbacRoleId: number;
  rbacRoleShiftId: number | null;
  assignment?: any;
}

const YearPeriod = memo((props: IProps) => {
  const { months, hiredDate, userProfile } = props;
  const router = useRouter();

  return (
    <>
      {months.map((month, index) => {
        const currentMonthKey = moment(new Date()).format("MMM_YYYY");
        const monthKey = `${month.month_details.short}_${month.month_details.year}`;
        const selectedMonth = `${months.filter((m) => m.month_details.key == router.query?.month)[0]?.month_details?.short}_${router.query?.year}`;
        const countOfDays = moment(month.vacationDetails?.to_date).diff(
          month.vacationDetails?.from_date,
          "days",
        );

        return (
          <div
            key={monthKey}
            className={`month-vacation ${month.color} ${index === 11 ? "year-end" : index === 0 ? "year-start" : ""}`}
          >
            {month.has_vacation && !month.isMulti ? (
              <VacationHoverDetailsPopup
                hiredDate={hiredDate}
                details={month.vacationDetails}
                userProfile={userProfile}
              >
                <div
                  style={{
                    width:
                      countOfDays > 20
                        ? "30px"
                        : countOfDays > 25
                          ? "40px"
                          : "17px",
                  }}
                  className={`slot vacation-${month.vacation_type} part-${month.part}`}
                ></div>
              </VacationHoverDetailsPopup>
            ) : month.has_vacation && month.isMulti ? (
              month.multiVacations?.map((vacation) => {
                return (
                  <VacationHoverDetailsPopup
                    hiredDate={hiredDate}
                    details={vacation.vacationDetails}
                    userProfile={userProfile}
                  >
                    <div
                      style={{
                        width:
                          countOfDays > 20
                            ? "30px"
                            : countOfDays > 25
                              ? "40px"
                              : "17px",
                      }}
                      className={`slot vacation-${vacation.vacationDetails.vacation_type} part-${vacation.part}`}
                    ></div>
                  </VacationHoverDetailsPopup>
                );
              })
            ) : null}
            {selectedMonth === monthKey && selectedMonth === currentMonthKey ? (
              <div className="month-select current-m"></div>
            ) : selectedMonth === monthKey ? (
              <div className="month-select"></div>
            ) : null}
          </div>
        );
      })}
    </>
  );
});

export default YearPeriod;
