import React, { useMemo } from "react";
import {
  TableHeading,
  PhoneCell,
  AntdUserProfile,
  AntdInfoCell,
  StudentLabels,
} from "components";
import { Cell, ProfileWrapper } from "./style";
import { useQueryClient } from "@tanstack/react-query";
import { useChangeCommentStudent } from "hooks";
import { toast } from "react-toastify";
import moment from "moment";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MMM_YYYY,
} from "constants/dates";
import { toggleModal } from "store";
import { Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { colors } from "layout/header/style";
import { studentStatusIdentifier } from "utils/studentStatusIdentifier";
import { IUserPhone } from "types/userPhone";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const Columns = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const changeComment = useChangeCommentStudent({
    onSuccess: () => {
      toast.success("Student comment changed");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.lost_list],
      });
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmitChangeComment = (id: number, comment: string) => {
    changeComment.mutate({ id, comment });
  };

  return useMemo(() => {
    return [
      {
        dataIndex: "userProfile",
        title: (
          <TableHeading padding style={{ width: "180px" }}>
            Name
          </TableHeading>
        ),
        render: (value: any, record: any, index: number) => {
          return (
            <AntdUserProfile
              disabled
              props={record}
              propsValue={value}
              index={index}
              isStudent={false}
              isMark
              isFreshman
            />
          );
        },
      },
      {
        dataIndex: "user",
        title: (
          <TableHeading padding style={{ width: "180px" }}>
            Status
          </TableHeading>
        ),
        render: (value: any, record: any, index: number) => {
          return (
            <ProfileWrapper>
              <div
                className="studying"
                style={
                  colors[studentStatusIdentifier(record) as keyof typeof colors]
                }
              >
                {studentStatusIdentifier(record)}
              </div>
            </ProfileWrapper>
          );
        },
      },
      {
        title: (
          <TableHeading style={{ minWidth: "80px", width: "90px" }}>
            Phone
          </TableHeading>
        ),
        dataIndex: ["user", "userPhones"],
        render: (value: IUserPhone[], record: any, index: number) => {
          return <PhoneCell value={value} />;
        },
      },
      {
        title: <TableHeading>Last group info</TableHeading>,
        dataIndex: ["lastStudentFlow", "group"],
        render: (value: any, record: any, index: number) => {
          return <AntdInfoCell record={record} value={value} />;
        },
      },
      {
        title: <TableHeading>Stopped category</TableHeading>,
        dataIndex: ["lastStudentFlow", "leavingCategory", "name"],
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
                        id: record?.lastStudentFlow?.id,
                        queryKeys: [queryKeys.lost_list],
                        student: record,
                        leaving_category_id:
                          record?.lastStudentFlow?.leaving_category_id,
                        reason: record?.lastStudentFlow?.leaving_reason,
                      },
                    },
                  })
                )
              }
            >
              <Tooltip destroyTooltipOnHide title={value}>
                {value ?? "-"}
              </Tooltip>
            </Cell>
          );
        },
      },
      {
        title: (
          <TableHeading style={{ width: "52px", minWidth: "52px" }}>
            Reason
          </TableHeading>
        ),
        dataIndex: ["lastStudentFlow", "leaving_reason"],
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <Tooltip destroyTooltipOnHide title={value ?? "-"}>
                {value ?? record?.note ?? "-"}
              </Tooltip>
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Stopped date</TableHeading>,
        dataIndex: ["lastStudentFlow", "created_at"],
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              {value
                ? moment(value, DATE_FORMAT_CREATED_AT).format(
                    DATE_FORMAT_DD_MMM_YYYY
                  )
                : "-"}
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Label</TableHeading>,
        dataIndex: ["user", "userLabels"],
        render: (value: any, record: any, index: number) => (
          <StudentLabels
            data={record}
            queryKeys={[queryKeys.lost_list]}
            activeLabels={{ lifecycle: true }}
            tableKey={queryKeys.lost_list}
            clientUpdate
          />
        ),
      },
    ];
  }, []);
};
