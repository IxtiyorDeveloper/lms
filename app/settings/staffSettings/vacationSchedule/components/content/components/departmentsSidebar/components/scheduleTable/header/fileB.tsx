import React, { memo } from "react";
import {
  IDepartmentsListForVacation,
  IUserObj,
  UserVacationHistoryObj,
} from "types/staffSettings/vacation";
import moment from "moment/moment";
import { getPeriodByYearAdaptor } from "../../../functions";
import {
  HiredDate,
  NameOfStaff,
  Staff,
  UserWrap,
  VacationScheme,
} from "./style";
import { Button } from "components";
import { bgColors } from "styles/theme";
import { PlusSvg } from "@jasurbekyuldashov/lms-web-icons";
import YearPeriod from "./file";
import UserVacationStatus from "../userWithVacationStatus";
import { useMemo } from "react";
import { Popover } from "antd";
import UserDetailsPopover from "./userDetailsPopover";

interface IProps {
  tableData?: IDepartmentsListForVacation;
  vacationList?: UserVacationHistoryObj;
  yearsList: number[];
  part_id: string;
  slotsData: any;
  handleOpenCreateVacation: (string: any, s: string, note: string) => void;
}

const FileB = memo((props: IProps) => {
  const {
    tableData,
    vacationList,
    yearsList,
    part_id,
    handleOpenCreateVacation,
    slotsData,
  } = props;

  const sortAssignments = useMemo(() => {
    const sort = tableData?.assignments.sort((a, b) => {
      const aName = `${a?.user?.userProfile?.firstname || ""} ${a?.user?.userProfile?.lastname || ""}`;
      const bName = `${b?.user?.userProfile?.firstname || ""} ${b?.user?.userProfile?.lastname || ""}`;
      return aName?.localeCompare(bName);
    });
    return sort;
  }, [tableData?.assignments]);

  return (
    <>
      {sortAssignments?.map((assignment: IUserObj, index) => {
        const firstname = assignment?.user?.userProfile?.firstname;
        const lastname = assignment?.user?.userProfile?.lastname;
        const isFirst = index === 0;
        let result;

        const hiredDate = moment(assignment?.staff?.hired_date).format(
          "MMM YYYY",
        );

        if (vacationList) {
          result = getPeriodByYearAdaptor(yearsList, assignment, vacationList);
        }

        return (
          result && (
            <UserWrap key={`${assignment.id}_${part_id}_${index}`}>
              <Popover
                color={bgColors.dark}
                trigger="click"
                placement="right"
                content={() => <UserDetailsPopover assignment={assignment} />}
              >
                <Staff
                  className={
                    isFirst ? "borderTop borderBottom" : "borderBottom"
                  }
                >
                  <UserVacationStatus
                    onVacation={!!assignment?.staff?.activeVacation}
                    src={assignment?.user?.userProfile?.avatar}
                    status={assignment?.staff?.vacation_status}
                  />
                  <div>
                    <NameOfStaff>
                      {firstname} {lastname}
                    </NameOfStaff>
                    <HiredDate>{hiredDate}</HiredDate>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenCreateVacation(
                        assignment.user_id,
                        assignment.staff.next_recommended_vacation,
                        "",
                      );
                    }}
                    className="create-vacation-btn"
                    bgColor={bgColors.midoriVacation}
                  >
                    <PlusSvg color={bgColors.white} />
                  </Button>
                </Staff>
              </Popover>

              <VacationScheme className="scroller-a">
                {result.map((val, index) => {
                  return (
                    <YearPeriod
                      hiredDate={assignment.staff.hired_date}
                      months={val.months}
                      key={index}
                      rbacRoleId={assignment?.rbac_role_id}
                      rbacRoleShiftId={assignment?.rbac_role_shift_id}
                      userProfile={assignment.user?.userProfile}
                      assignment={assignment}
                    />
                  );
                })}
              </VacationScheme>
            </UserWrap>
          )
        );
      })}
    </>
  );
});

export default FileB;
