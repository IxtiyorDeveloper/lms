import React, { useMemo } from "react";
import {
  AntdInfoCell,
  AntdUserProfile,
  ArrowRight,
  PhoneCell,
  TableHeading,
} from "components";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { IFetchTeachers, StudentStat } from "types";
import { ArchiveWrapper, Cell, WaitingWrapper } from "./style";
import { LostTypes } from "../../index";
import { StoppingActionCard } from "../../../../style";
import { StopSvg, TransferSvg } from "@jasurbekyuldashov/lms-web-icons";
import { toggleModal } from "store";
import { queryKeys } from "constants/queryKeys";
import { Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { ITeacherLost } from "types/statistics/teacherLost";
import { generateGroup } from "./components/utils/generateGroup";

const Columns = ({
  data,
}: {
  data: IFetchTeachers<ITeacherLost> | undefined;
}) => {
  const dispatch = useDispatch();

  return useMemo(
    () => [
      {
        key: 1,
        title: (
          <TableHeading
            color={bgColors.white}
            isId
            style={{
              padding: "8px",
              fontSize: fontSizes.f10,
            }}
          >
            Full name
          </TableHeading>
        ),
        dataIndex: ["user", "userProfile"],
        render: (value: any, record: any, index: number) => {
          return (
            <AntdUserProfile
              props={record}
              propsValue={value}
              index={index}
              isStudent={false}
            />
          );
        },
      },
      {
        title: (
          <TableHeading
            color={textColors.white}
            style={{
              padding: "8px",
              fontSize: fontSizes.f10,
            }}
          >
            All phones
          </TableHeading>
        ),
        dataIndex: ["user", "userPhones"],
        render: (value: any, record: any, index: number) => {
          return <PhoneCell value={value} />;
        },
      },
      {
        title: (
          <TableHeading
            color={textColors.white}
            style={{
              padding: "8px",
              fontSize: fontSizes.f10,
            }}
          >
            Group info box
          </TableHeading>
        ),
        dataIndex: "group",
        render: (arrayValue: any, arrayRecord: any, index: number) => {
          const { record, value } = generateGroup({
            group_detail: arrayRecord?.group_detail,
          });
          return <AntdInfoCell record={record} value={value} />;
        },
      },
      {
        title: (
          <TableHeading
            color={textColors.white}
            style={{
              padding: "8px",
              fontSize: fontSizes.f10,
            }}
          ></TableHeading>
        ),
        dataIndex: "action",
        render: (value: any, record: any, index: number) => (
          <ArrowRight width={34} height={34} color={bgColors.soulfulBlue} />
        ),
      },
      {
        title: (
          <TableHeading
            color={textColors.white}
            style={{
              padding: "8px",
              fontSize: fontSizes.f10,
            }}
          >
            Current location
          </TableHeading>
        ),
        dataIndex: ["student", "currentGroupContact", "group"],
        render: (value: any, record: any, index: number) => {
          return value ? (
            <div style={{ padding: "5px 0" }}>
              <AntdInfoCell
                recordValue={record?.student?.currentGroupContact?.group}
                value={value}
              />
            </div>
          ) : record.student?.status == StudentStat.STUDENT_ARCHIVED ? (
            <ArchiveWrapper>Archived</ArchiveWrapper>
          ) : (
            <WaitingWrapper>Waiting</WaitingWrapper>
          );
        },
      },
      {
        title: (
          <TableHeading
            color={textColors.white}
            style={{
              padding: "8px",
              fontSize: fontSizes.f10,
            }}
          >
            Leaving action
          </TableHeading>
        ),
        dataIndex: ["leavingCategory", "type"],
        render: (value: any, record: any, index: number) => {
          const bool = value == LostTypes.stopping;

          return (
            <Cell>
              <StoppingActionCard bool={bool}>
                <div>
                  {bool ? (
                    <StopSvg width={12} height={12} />
                  ) : (
                    <TransferSvg
                      width={12}
                      height={12}
                      color={bgColors.royal}
                    />
                  )}
                </div>
                <div>{bool ? "Stopping" : "Transferring"}</div>
              </StoppingActionCard>
            </Cell>
          );
        },
      },
      {
        title: (
          <TableHeading
            color={textColors.white}
            style={{
              padding: "8px",
              fontSize: fontSizes.f10,
              textAlign: "center",
            }}
          >
            Category
          </TableHeading>
        ),
        dataIndex: "leavingCategory",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell
              onClick={() =>
                dispatch(
                  toggleModal({
                    key: "updateStudentFlow",
                    data: {
                      open: true,
                      data: {
                        id: record?.id,
                        queryKeys: [queryKeys.teacher_lost_list],
                        leaving_category_id: record?.leaving_category_id,
                        reason: record?.leaving_reason,
                      },
                    },
                  })
                )
              }
              style={{ textAlign: "center" }}
            >
              <Tooltip destroyTooltipOnHide title={value?.name}>
                {value?.name}
              </Tooltip>
            </Cell>
          );
        },
      },

      {
        title: (
          <TableHeading
            color={textColors.white}
            style={{
              padding: "8px",
              fontSize: fontSizes.f10,
            }}
          >
            Reason
          </TableHeading>
        ),
        dataIndex: "leaving_reason",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <Tooltip destroyTooltipOnHide title={value} trigger="click">
                {value}
              </Tooltip>
            </Cell>
          );
        },
      },
    ],
    [data]
  );
};

export default Columns;
