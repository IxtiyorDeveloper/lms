import React, { useMemo } from "react";
import {
  AntdBadge,
  AntdInfoCell,
  AntdUserProfile,
  NoteEditPopover,
  PhoneCell,
  StudentActions,
  StudentLabels,
  TableHeading,
} from "components";
import { Cell } from "./style";
import { toggleModal } from "store";
import { Tooltip } from "antd";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_MMM_DD_YYYY,
} from "constants/dates";
import { IUserPhone } from "types/userPhone";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { TGeneral } from "types";
import { useChangeCommentStudent } from "hooks";
import { toast } from "react-toastify";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { IPreferBranches } from "types/student";
import { textColors } from "styles/theme";

interface Interface {
  columns: string[];
}

export const Columns: ({ columns }: Interface) => any[] = ({ columns }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<TGeneral>({});

  const changeComment = useChangeCommentStudent({
    onSuccess: () => {
      toast.success("Student comment changed");
      queryClient.invalidateQueries({
        queryKey: ["admin-student-archive-list"],
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmitChangeComment = (id: number, comment: string) => {
    changeComment.mutate({ id, comment });
  };
  return useMemo(() => {
    const fields = {
      profile: {
        dataIndex: "userProfile",
        title: (
          <TableHeading padding style={{ width: "180px" }}>
            Name
          </TableHeading>
        ),
        render: (value: any, record: any, index: number) => {
          return (
            <AntdUserProfile props={record} propsValue={value} index={index} />
          );
        },
      },
      level: {
        dataIndex: "level",
        title: <TableHeading>Level</TableHeading>,
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <span className="name">
                <p>{value?.parent?.name}</p>
                <p>{value?.name}</p>
              </span>
            </Cell>
          );
        },
      },
      branch: {
        dataIndex: "preferBranches",
        title: <TableHeading>Branch</TableHeading>,
        width: "100px",
        render: (value: IPreferBranches[], record: any, index: number) => {
          const len = value?.length || 0;
          return len < 2 ? (
            <Cell>
              <span className="name">
                <span className="name">
                  <p>{value?.[0]?.branch?.name}</p>
                </span>
              </span>
            </Cell>
          ) : (
            <Tooltip
              destroyTooltipOnHide
              title={
                <Cell style={{ width: "auto", color: textColors.white }}>
                  {value.map((e) => {
                    return (
                      <span className="name">
                        <p>{e?.branch?.name}</p>
                      </span>
                    );
                  })}
                </Cell>
              }
            >
              <Cell style={{ display: "flex", gap: "4px" }}>
                <span className="name">
                  <p>{value?.[0]?.branch?.name}</p>
                </span>
                <span className="name">
                  <AntdBadge
                    content={<>+{len - 1}</>}
                    color="red"
                    size="small"
                  />
                </span>
                {/*{value.map((e) => {*/}
                {/*  return (*/}
                {/*   */}
                {/*  );*/}
                {/*})}*/}
              </Cell>
            </Tooltip>
          );
        },
      },
      phone: {
        title: (
          <TableHeading style={{ minWidth: "80px", width: "90px" }}>
            Phone
          </TableHeading>
        ),
        dataIndex: "userPhones",
        render: (value: IUserPhone[], record: any, index: number) => {
          return <PhoneCell value={value} />;
        },
      },
      info: {
        title: <TableHeading>Last group info</TableHeading>,
        dataIndex: "lastGroup",
        render: (value: any, record: any, index: number) => {
          return <AntdInfoCell record={record} value={value} />;
        },
      },
      stoppedCategory: {
        title: <TableHeading>Stopped category</TableHeading>,
        dataIndex: "stopped_category",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell
              style={{ maxWidth: "72px" }}
              onClick={() =>
                dispatch(
                  toggleModal({
                    key: "updateStudentFlow",
                    data: {
                      open: true,
                      data: {
                        id: record?.lastStudentFlow?.id,
                        queryKeys: [queryKeys.admin_student_archive_list],
                        leaving_category_id:
                          record?.lastStudentFlow?.leaving_category_id,
                        reason: record?.stopped_reason,
                        student: record,
                      },
                    },
                  }),
                )
              }
            >
              <Tooltip destroyTooltipOnHide title={value}>
                {value}
              </Tooltip>
            </Cell>
          );
        },
      },
      stoppedReason: {
        title: (
          <TableHeading style={{ width: "72px", minWidth: "72px" }}>
            Reason
          </TableHeading>
        ),
        dataIndex: "stopped_reason",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell style={{ width: "72px" }}>
              <Tooltip destroyTooltipOnHide title={value}>
                {value || record?.note || ""}
              </Tooltip>
            </Cell>
          );
        },
      },
      note: {
        title: (
          <TableHeading style={{ width: "52px", minWidth: "52px" }}>
            Note
          </TableHeading>
        ),
        dataIndex: "note",
        render: (value: any, record: any, index: number) => {
          const data: string = value;
          const user_id = record?.user_id || null;
          return (
            <NoteEditPopover
              id={user_id}
              note={data}
              control={control}
              defaultValue={data}
              handleSubmit={handleSubmit}
              onSubmit={(p: any) => {
                onSubmitChangeComment(user_id, p?.[`note_${user_id}`]);
              }}
            />
          );
        },
      },
      archivedDate: {
        title: (
          <TableHeading style={{ width: "52px", minWidth: "52px" }}>
            Archived Date
          </TableHeading>
        ),
        dataIndex: ["deleted_at"],
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <Tooltip destroyTooltipOnHide title={value}>
                {value
                  ? moment(value, DATE_FORMAT_CREATED_AT).format(
                      DATE_FORMAT_MMM_DD_YYYY,
                    )
                  : "-"}
              </Tooltip>
            </Cell>
          );
        },
      },
      labels: {
        title: <TableHeading>Label</TableHeading>,
        dataIndex: ["user", "userLabels"],
        render: (value: any, record: any, index: number) => (
          <StudentLabels
            data={record}
            queryKeys={[queryKeys.admin_student_archive_list]}
            activeLabels={record?.user?.student?.permissionLabels}
            // isSelectableNoneColor={true}
            tableKey="admin-student-archive-list"
            clientUpdate
          />
        ),
      },
      actions: {
        title: <TableHeading>Actions</TableHeading>,
        dataIndex: "actions",
        render: (value: any, record: any, index: number) => (
          <StudentActions
            queryKeys={[queryKeys.admin_student_archive_list]}
            data={record}
            activeActions={{
              ...(record?.buttonActions || {}),
              ban: false,
            }}
          />
        ),
      },
    };
    return columns?.map((item) => fields[item as keyof typeof fields]);
  }, [columns]);
};
