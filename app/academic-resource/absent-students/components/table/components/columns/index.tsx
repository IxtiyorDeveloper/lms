import React from "react";
import {
  AbsMergedWithUnit,
  AntdInfoCell,
  AntdUserProfile,
  ContactActions,
  NoteEditPopover,
  PaymentInfo,
  PeriodsCell,
  PhoneCell,
  StudentLabels,
  TableHeading,
} from "components";
import { CellNameWrapper } from "../../style";
import { Cell } from "app/groups/[groupId]/components/administrativeTab/style";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useChangeCommentStudent } from "hooks";
import { toast } from "react-toastify";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { IUserPhone } from "types/userPhone";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const Columns = () => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm({});

  const changeComment = useChangeCommentStudent({
    onSuccess: () => {
      toast.success("Student comment changed");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.admin_grouped_group_contact_absent_student],
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmitChangeComment = (id: number, comment: string) => {
    changeComment.mutate({ id, comment });
  };

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
            propsValue={value}
            index={index}
            isMark
            count={record?.abs_count}
            customTooltipChildren={(props) => (
              <AbsMergedWithUnit
                {...props}
                queryKeys={[
                  queryKeys.admin_grouped_group_contact_absent_student,
                ]}
              />
            )}
          />
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
      title: (
        <TableHeading style={{ width: "80px", minWidth: "auto" }}>
          Period
        </TableHeading>
      ),
      dataIndex: "periods",
      render: (value: any, record: any, index: number) => {
        return (
          <PeriodsCell
            row={record}
            queryKeys={[queryKeys.admin_grouped_group_contact_absent_student]}
          />
        );
      },
    },
    {
      title: <TableHeading style={{ minWidth: "30px" }}>Lesson</TableHeading>,
      dataIndex: ["actualPayment", "lesson_count"],
      render: (value: any, record: any, index: number) => {
        return (
          <CellNameWrapper style={{ minWidth: "30px", textAlign: "center" }}>
            <div
              className="name"
              style={{ textAlign: "center", width: "100%" }}
            >
              {value || 0}
            </div>
          </CellNameWrapper>
        );
      },
    },
    funcCheckPermission([COMPONENTS_VIEWS.can_see_student_payment]) && {
      title: <TableHeading>Payment</TableHeading>,
      dataIndex: "actualPayment",
      render: (value: any, record: any, index: number) => {
        const user: any = record;
        return (
          <Cell>
            <div className="ordinary">
              <PaymentInfo user={user} group={user?.group} />
            </div>
          </Cell>
        );
      },
    },
    {
      title: <TableHeading>Group info</TableHeading>,
      dataIndex: "group",
      render: (value: any, record: any, index: number) => {
        return <AntdInfoCell record={record} value={value} />;
      },
    },
    {
      title: (
        <TableHeading style={{ width: "52px", minWidth: "52px" }}>
          Note
        </TableHeading>
      ),
      dataIndex: ["user","student", "note"],
      render: (value: any, record: any, index: number) => {
        const id = record?.user?.id || null;
        return (
          <NoteEditPopover
            control={control}
            note={value}
            defaultValue={value}
            handleSubmit={handleSubmit}
            onSubmit={(formData: any) =>
              onSubmitChangeComment(id, formData?.[`note_${id}`])
            }
            id={id}
          />
        );
      },
    },
    {
      title: (
        <TableHeading style={{ textAlign: "center", minWidth: "20px" }}>
          Label
        </TableHeading>
      ),
      dataIndex: ["user", "student", "permissionLabels"],
      render: (value: any, record: any, index: number) => {
        return (
          <StudentLabels
            data={record}
            activeLabels={value}
            queryKeys={[queryKeys.admin_grouped_group_contact_absent_student]}
            tableKey="admin-grouped-group-contact-absent-student"
            clientUpdate
          />
        );
      },
    },
    {
      title: (
        <TableHeading style={{ textAlign: "center" }}>Actions</TableHeading>
      ),
      dataIndex: "actions",
      render: (value: any, record: any, index: number) => {
        return (
          <ContactActions
            queryKeys={[queryKeys.admin_grouped_group_contact_absent_student]}
            data={record}
            activeActions={record?.buttonActions}
          />
        );
      },
    },
  ].filter((e) => !!e);
};
