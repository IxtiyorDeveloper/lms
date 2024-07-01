import React, { FC, useEffect, useRef } from "react";
import { IRedList, IStudentRedListDay } from "types/absentStudents";
import { useGroupContactLsatAttendance, useStudentUnits } from "hooks";
import { Spin } from "antd";
import { Wrapper } from "./style";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import {
  STUDENT_ATTENDANCE_ABSENT,
  STUDENT_ATTENDANCE_ABSENT_CLAIMED,
  STUDENT_ATTENDANCE_TICKED,
} from "constants/studentAttendence";
import { mockData } from "./mockData";

interface IProps {
  redList: IRedList;
}

const UserUnitTooltip: FC<IProps> = ({ redList }) => {
  const { isFetching, data, isSuccess, isLoading } = useStudentUnits({
    query_params: {
      id: redList.group_id,
      user_id: redList.user_id || redList?.user?.id,
    },
    isMerged: true,
  });

  const { data: lastAttendance } = useGroupContactLsatAttendance({
    contact_id: redList.id,
  });

  const containerRef = useRef<HTMLDivElement | any>();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [data]);
  return (
    <Spin spinning={isFetching}>
      <Wrapper>
        <div className="container" ref={containerRef} style={{}}>
          {(isSuccess && !isLoading ? data || [] : (mockData as any))?.map(
            (e: IStudentRedListDay) => {
              const status = lastAttendance?.find(
                (item) => item.date == e.opening_date
              )?.status;
              const classNameOfRound =
                status == STUDENT_ATTENDANCE_ABSENT
                  ? "red-outline"
                  : status == STUDENT_ATTENDANCE_ABSENT_CLAIMED
                  ? "yellow"
                  : status === STUDENT_ATTENDANCE_TICKED
                  ? "transparent-outline"
                  : "none-outline";
              return e.child?.opening_date ? (
                <div className="item">
                  <div className="day">
                    {moment(e.opening_date, DATE_FORMAT_YYYY_MM_DD).format(
                      "D MMM"
                    )}
                  </div>
                  <div className="merge-unit">
                    <div className="">{`${e.unit?.parent_unit?.order}.${e.unit?.order}`}</div>
                    <div className="">{`${e.child?.unit?.parent_unit?.order}.${e.child?.unit?.order}`}</div>
                  </div>
                  <div className="merge-percent">
                    <div className={`percent ${classNameOfRound}`}>
                      {`${Math.round(
                        ((e.student_unit?.collected_points ?? 0) /
                          e.unit?.points) *
                          100
                      )}%`}
                    </div>
                    <div className={`percent ${classNameOfRound}`}>
                      {`${Math.round(
                        ((e.student_unit?.collected_points ?? 0) /
                          e.unit?.points) *
                          100
                      )}%`}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="item">
                  <div className="day">
                    {moment(e.opening_date, DATE_FORMAT_YYYY_MM_DD).format(
                      "D MMM"
                    )}
                  </div>
                  <div className="unit">{`${e.unit?.parent_unit?.order}.${e.unit?.order}`}</div>
                  <div className={`percent ${classNameOfRound}`}>
                    {`${Math.round(
                      ((e.student_unit?.collected_points ?? 0) /
                        e.unit?.points) *
                        100
                    )}%`}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </Wrapper>
    </Spin>
  );
};

export default UserUnitTooltip;
