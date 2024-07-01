import { Cell } from "./style";
import React, { useMemo } from "react";
import {
  AntdUserProfile,
  ContactActions,
  NoteEditPopover,
  PaymentInfo,
  PeriodsCell,
  PhoneCell,
  SharpStarSvg,
  StudentLabels,
  TableHeading,
} from "components";
import { IActualPayment } from "types/actualPayment";
import { IStudent } from "types/student";
import { useForm } from "react-hook-form";
import { useChangeCommentStudent } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { IContacts } from "types/contact";
import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
  STOPPING_STUDENT,
  TRANSFERRED_STUDENT,
} from "constants/studentStatuses";
import { IGroup, StudentType, UpdateLabelPages } from "types";
import { bgColors } from "styles/theme";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { IUserPhone } from "types/userPhone";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const Column = ({ group }: { group: IGroup | undefined }) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm();
  const changeComment = useChangeCommentStudent({
    onSuccess: async () => {
      toast.success("Student comment is changed");
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.admin_group_view],
      });
    },
    onError: async (err) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmitChangeComment = (id: number, comment: string) => {
    changeComment.mutate({ id, comment });
  };
  return useMemo(
    () =>
      [
        {
          title: (
            <TableHeading padding isId>
              Name
            </TableHeading>
          ),
          dataIndex: ["user", "userProfile"],
          render: (value: any, record: any, index: number) => {
            const user: IContacts = record;

            const abs =
              STOPPING_STUDENT.toString() == user?.status.toString() ? (
                user.user?.is_freshman ? (
                  <div className="abs">
                    <SharpStarSvg />
                  </div>
                ) : null
              ) : user?.student?.type == StudentType.TYPE_OLD &&
                (user.status.toString() ===
                  NEW_STUDENT_NOT_ATTENDED.toString() ||
                  user.status.toString() ===
                    NEW_STUDENT_ATTENDED.toString()) ? (
                <div className="abs1">
                  <SharpStarSvg color={bgColors.primary} />
                </div>
              ) : null;

            return (
              <AntdUserProfile
                props={record}
                propsValue={value}
                index={index}
                isMark
                abs={abs}
              />
            );
          },
        },
        {
          title: (
            <TableHeading padding style={{ width: "120px" }}>
              Phone
            </TableHeading>
          ),
          dataIndex: ["user", "userPhones"],
          render: (value: IUserPhone[], record: any, index: number) => {
            return <PhoneCell value={value} />;
          },
        },
        {
          title: <TableHeading padding>Periods</TableHeading>,
          dataIndex: "actualPayment",
          render: (value: any, record: any, index: number) => {
            const user: IContacts = record;
            return (
              <PeriodsCell
                row={record}
                queryKeys={[queryKeys.admin_group_view]}
                disabled={
                  user?.status.toString() == TRANSFERRED_STUDENT.toString()
                }
              />
            );
          },
        },
        {
          title: <TableHeading padding>Lesson</TableHeading>,
          dataIndex: "lesson_count",
          render: (value: any, record: any, index: number) => {
            const data: IActualPayment = record.actualPayment;
            return (
              <Cell>
                <div className="ordinary">{data?.lesson_count ?? 0}</div>
              </Cell>
            );
          },
        },
        funcCheckPermission([COMPONENTS_VIEWS.can_see_student_payment]) && {
          title: <TableHeading padding>Payment</TableHeading>,
          dataIndex: "payment",
          render: (value: any, record: any, index: number) => {
            const user: IContacts = record;
            return (
              <Cell>
                <div className="ordinary">
                  <PaymentInfo
                    user={user}
                    group={group}
                    paymentDisabled={
                      user?.status.toString() == TRANSFERRED_STUDENT.toString()
                    }
                    queryKeys={[queryKeys.admin_group_view]}
                  />
                </div>
              </Cell>
            );
          },
        },
        {
          title: <TableHeading padding>Note</TableHeading>,
          dataIndex: ["user", "student"],
          render: (value: any, record: any, index: number) => {
            const user: IContacts = record;
            const data: IStudent = value;
            const user_id = record.user?.id || null;

            return (
              <NoteEditPopover
                id={user_id}
                disabled={
                  user?.status.toString() == TRANSFERRED_STUDENT.toString() ||
                  !funcCheckPermission([
                    COMPONENTS_VIEWS.can_change_student_note,
                  ])
                }
                note={data?.note}
                control={control}
                defaultValue={data?.note}
                handleSubmit={handleSubmit}
                onSubmit={(p: any) => {
                  onSubmitChangeComment(user_id, p?.[`note_${user_id}`]);
                }}
              />
            );
          },
        },
        {
          title: <TableHeading padding>Label</TableHeading>,
          dataIndex: ["student", "permissionLabels"],
          render: (value: any, record: any, index: number) => {
            const user: IContacts = record;
            if (user?.status.toString() == TRANSFERRED_STUDENT.toString()) {
              return "";
            } else
              return (
                <Cell>
                  <StudentLabels
                    data={record}
                    shouldPay={record?.actualPayment?.debt > 0}
                    queryKeys={[queryKeys.admin_group_view]}
                    activeLabels={value}
                    tableKey={queryKeys.admin_group_view}
                    clientUpdate
                    page={UpdateLabelPages.GROUP_VIEW}
                  />
                </Cell>
              );
          },
        },
        {
          title: <TableHeading padding>Actions</TableHeading>,
          dataIndex: "buttonActions",
          render: (value: any, record: any, index: number) => {
            const user: IContacts = record;
            if (user?.status.toString() == TRANSFERRED_STUDENT.toString()) {
              return "";
            } else
              return (
                <Cell>
                  <ContactActions
                    queryKeys={[queryKeys.admin_group_view]}
                    data={{
                      ...record,
                      groupId: group?.id,
                      lessonDays: group?.lessonDays,
                    }}
                    activeActions={value}
                  />
                </Cell>
              );
          },
        },
      ].filter((e) => !!e),
    [group],
  );
};

export default Column;
