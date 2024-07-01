import React, { useMemo } from "react";
import {
  TableHeading,
  PhoneCell,
  PeriodsCell,
  PaymentInfo,
  StudentLabels,
  ContactActions,
  NoteEditPopover,
  AbsMergedWithUnit,
  AntdUserProfile,
  AntdInfoCell,
} from "components";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { TGeneral, UpdateLabelPages } from "types";
import { useChangeCommentStudent } from "hooks";
import { toast } from "react-toastify";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { queryKeys } from "constants/queryKeys";
import { IUserPhone } from "types/userPhone";
import { validationErrorHandler } from "utils";

export const Columns = () => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<TGeneral>({});
  const changeComment = useChangeCommentStudent({
    onSuccess: () => {
      toast.success("Student comment changed");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.admin_statistics_podo_index],
      });
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmitChangeComment = (id: number, comment: string) =>
    changeComment.mutate({ id, comment });

  return useMemo(() => {
    return [
      {
        dataIndex: ["user", "userProfile"],
        title: (
          <TableHeading padding isId>
            Name
          </TableHeading>
        ),
        render: (value: any, record: any, index: number) => {
          return (
            <AntdUserProfile
              props={record}
              count={record?.absDates?.length}
              propsValue={value}
              index={index}
              isMark
              customTooltipChildren={(props) => (
                <AbsMergedWithUnit
                  {...props}
                  queryKeys={[queryKeys.admin_statistics_podo_index]}
                />
              )}
            />
          );
        },
      },
      {
        title: (
          <TableHeading style={{ minWidth: "80px", width: "90px" }}>
            Phone number
          </TableHeading>
        ),
        dataIndex: ["user", "userPhones"],
        render: (value: IUserPhone[], record: any, index: number) => {
          return <PhoneCell value={value} />;
        },
      },
      {
        title: <TableHeading>Periods</TableHeading>,
        dataIndex: "periods",
        render: (value: any, record: any, index: number) => {
          return (
            <PeriodsCell
              row={record}
              queryKeys={[queryKeys.admin_statistics_podo_index]}
            />
          );
        },
      },
      {
        title: <TableHeading>Lesson</TableHeading>,
        dataIndex: ["actualPayment", "lesson_count"],
        render: (value: any, record: any, index: number) => (
          <p style={{ textAlign: "center" }}>{value}</p>
        ),
      },
      {
        title: <TableHeading>Group info</TableHeading>,
        dataIndex: "group",
        render: (value: any, record: any, index: number) => {
          return <AntdInfoCell record={record} value={value} />;
        },
      },
      {
        title: <TableHeading padding>Note</TableHeading>,
        dataIndex: ["student", "note"],
        render: (value: any, record: any, index: number) => {
          const data: string = value;
          const body = record?.user;
          const user_id = body?.id || null;
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
      funcCheckPermission([COMPONENTS_VIEWS.can_see_student_payment]) && {
        title: <TableHeading>Payment</TableHeading>,
        dataIndex: "actualPayment",
        render: (value: any, record: any, index: number) => {
          const user: any = record;
          return <PaymentInfo user={user} group={user?.group} />;
        },
      },
      {
        title: (
          <TableHeading isId style={{ minWidth: "20px" }}>
            Label
          </TableHeading>
        ),
        dataIndex: ["user", "userLabels"],
        render: (value: any, record: any, index: number) => (
          <StudentLabels
            data={record}
            queryKeys={[queryKeys.admin_statistics_podo_index]}
            activeLabels={record?.student?.permissionLabels}
            clientUpdate
            tableKey="admin-statistics-podo-index"
            page={UpdateLabelPages.PODO}
          />
        ),
      },
      {
        title: <TableHeading isId>Actions</TableHeading>,
        dataIndex: "actions",
        render: (value: any, record: any, index: number) => (
          <ContactActions
            queryKeys={[queryKeys.admin_statistics_podo_index]}
            data={record}
            activeActions={record?.buttonActions}
          />
        ),
      },
    ].filter((e) => !!e);
  }, []);
};
