import React, { memo, useEffect, useState } from "react";
import {
  CountAssignment,
  CurrentVacationHolders,
  DepartmentInfoWrapper,
  DepartmentName,
  HeadWrapper,
  SlotStatistic,
  WarningWrapper,
  Wrapper,
} from "./style";
import { bgColors } from "styles/theme";
import {
  IDepartmentsListForVacation,
  UserVacationHistoryObj,
} from "types/staffSettings/vacation";
import moment from "moment";
import {
  PodoSvg,
  SettingsSvg,
  VacationPalmSvg,
  XMoreInfoIcon,
} from "@jasurbekyuldashov/lms-web-icons";
import { IGenerateMonths } from "../../../functions";
import FileB from "./fileB";
import { useDispatch } from "react-redux";
import { toggleModal } from "store";
import HoverShiftInfoComponent from "../../../../hoverShiftInfo";
import { Progress } from "antd";
import { VacationModalType } from "../../../../modals/createVacation";
import _ from "lodash";

interface IProps {
  id: string;
  part_id: string;
  yearsList: number[];
  tableData: IDepartmentsListForVacation;
  period: { year: number; months: IGenerateMonths[] }[];
  vacationList?: UserVacationHistoryObj;
  slotsData: any;
  slotsDataNoFilter?: any;
}

const HeaderSide = memo((props: IProps) => {
  const {
    tableData,
    yearsList,
    slotsDataNoFilter,
    id,
    part_id,
    vacationList,
    slotsData,
  } = props;
  const dispatch = useDispatch();

  const [isWarningAvailable, setIsWarningAvailable] = useState<boolean>(false);

  const [slots, setSlots] = useState<any[]>([]);
  const [slotsNoFilter, setSlotsNoFilter] = useState<any[]>([]);
  const [stats, setStats] = useState<string>("0/0");

  useEffect(() => {
    let slotsByShift: any[] = [];
    const filteredKeys = Object.keys(slotsData || {}).filter((key) => {
      return key.startsWith(`${tableData?.role?.id}:`);
    });

    filteredKeys.map((filterKey) => {
      slotsData[filterKey]?.map((item: any) => {
        if (item?.role_shift_id == tableData?.shift?.id) {
          slotsByShift.push(item);
        }
      });
    });
    setSlots([...slotsByShift]);
  }, [slotsData]);

  useEffect(() => {
    let slotsByShift: any[] = [];
    const filteredKeys = Object.keys(slotsDataNoFilter || {}).filter((key) => {
      return key.startsWith(`${tableData?.role?.id}:`);
    });

    filteredKeys.map((filterKey) => {
      slotsDataNoFilter[filterKey]?.map((item: any) => {
        if (item?.role_shift_id == tableData?.shift?.id) {
          slotsByShift.push(item);
        }
      });
    });
    setSlotsNoFilter([...slotsByShift]);
  }, [slotsDataNoFilter, tableData]);

  const handleOpenModal = () => {
    dispatch(
      toggleModal({
        key: "slotCreateModal",
        data: {
          data: {
            role_name: tableData?.role?.name,
            month: moment(new Date()).format("MM"),
            role_id: tableData?.role?.id,
            role_shift_id: tableData?.shift?.id,
          },
          open: true,
        },
      }),
    );
  };

  const handleOpenCreateVacation = (
    userId: number,
    rDate: string,
    note: string,
  ) => {
    dispatch(
      toggleModal({
        key: "createVacationModal",
        data: {
          data: {
            user_id: userId,
            role_id: tableData?.role?.id,
            role_shift_id: tableData?.shift?.id,
            recommended_date: rDate,
            note,
            type: VacationModalType.CREATE,
          },
          open: true,
        },
      }),
    );
  };

  const countOfActiveVacations = tableData?.assignments?.filter(
    (assignment) => {
      return assignment?.staff?.activeVacation !== null;
    },
  );

  useEffect(() => {
    let st1: number = 0;
    let st2: number = 0;

    slots.map((slot) => {
      st1 += slot?.place;
      st2 += slot?.free_place;
    });

    setStats(`${st1 - st2}/${st1}`);
  }, [slots]);

  const slotPercentageCalculator = (str: string) => {
    const firstNumber = Number(str.split("/")[0]);
    const secondNumber = Number(str.split("/")[1]);

    const proportion = Math.round((firstNumber * 100) / secondNumber);

    return Number.isNaN(proportion) ? 0 : proportion;
  };

  const roleName = `${tableData?.role?.name} ${tableData?.shift ? `(${tableData?.shift?.name}) ${tableData?.role?.id}` : ""}`;

  const currentYearMonth = moment(new Date()).format("YYYY-MM");
  const currentYearMonthMoment = moment(new Date());

  function getYearMonthList(startDate: string, endDate: string) {
    let start = moment(startDate, "YYYY-MM");
    let end = moment(endDate, "YYYY-MM");

    let yearMonthList = [];

    while (start.isSameOrBefore(end, "month")) {
      yearMonthList.push(start.format("YYYY-MM"));
      start.add(1, "month");
    }

    return yearMonthList;
  }

  useEffect(() => {
    let available = true;
    const uniqSlotPeriods = _.uniq(
      slotsNoFilter?.map((obj) => `${obj.year}-${obj.month}`),
    );
    getYearMonthList(
      currentYearMonth,
      currentYearMonthMoment.add(14, "months").format("YYYY-MM"),
    ).map((strMonth) => {
      if (!uniqSlotPeriods.includes(strMonth)) {
        available = false;
      }
    });
    setIsWarningAvailable(!available);
  }, [slotsNoFilter]);

  return (
    <Wrapper>
      <div id={id}>
        <HeadWrapper>
          <div className="wrap">
            <DepartmentName>
              {roleName}
              <CountAssignment className="grotesk">
                {tableData?.assignments?.length}
              </CountAssignment>
              <CurrentVacationHolders className="grotesk">
                {countOfActiveVacations?.length}{" "}
                <VacationPalmSvg
                  style={{ marginBottom: "-2px" }}
                  height={14}
                  width={14}
                  color={bgColors.white}
                />
              </CurrentVacationHolders>
            </DepartmentName>
            <DepartmentInfoWrapper>
              <SlotStatistic>
                <p className="numbers">{!!stats ? stats : "0/0"}</p>
                <Progress
                  style={{ width: "70px" }}
                  showInfo={false}
                  strokeColor={bgColors.emerald}
                  percent={slotPercentageCalculator(stats)}
                  size="small"
                />
              </SlotStatistic>
              <HoverShiftInfoComponent
                slots={slots}
                roleName={roleName}
                freePlace={+stats.split("/")[1] - +stats.split("/")[0]}
                slotDetails={
                  <SlotStatistic
                    style={{ justifyContent: "flex-start", minWidth: "105px" }}
                  >
                    <p className="numbers">{!!stats ? stats : "0/0"}</p>
                    <Progress
                      style={{ width: "70px", marginTop: "1px" }}
                      showInfo={false}
                      strokeColor={bgColors.white}
                      trailColor={bgColors.sceptreBlue}
                      percent={slotPercentageCalculator(stats)}
                      size="small"
                    />
                  </SlotStatistic>
                }
              >
                <XMoreInfoIcon
                  height={19}
                  width={19}
                  color={bgColors.yourShadow}
                />
              </HoverShiftInfoComponent>
              <SettingsSvg
                onClick={handleOpenModal}
                height={20}
                width={20}
                color={bgColors.yourShadow}
              />
            </DepartmentInfoWrapper>
          </div>
          {isWarningAvailable ? (
            <WarningWrapper>
              <PodoSvg width={20} height={20} color={bgColors.white} />
              <p className="warning__text">
                For correct operation you need to create slots 1 year 2 month in
                advance
              </p>
            </WarningWrapper>
          ) : null}
        </HeadWrapper>
        <FileB
          part_id={part_id}
          slotsData={slotsData}
          handleOpenCreateVacation={handleOpenCreateVacation}
          vacationList={vacationList}
          yearsList={yearsList}
          tableData={tableData}
        />
      </div>
    </Wrapper>
  );
});

export default HeaderSide;
