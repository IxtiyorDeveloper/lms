import React from "react";
import {
  AntdInfoCell,
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
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useChangeCommentStudent } from "hooks";
import { toast } from "react-toastify";
import { IUser, StudentType } from "types";
import { CellNameWrapper } from "./style";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { IContacts } from "types/contact";
import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
} from "constants/studentStatuses";
import { bgColors } from "styles/theme";
import GroupInfoHeader from "./groupInfoPage";
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
        queryKey: [queryKeys.admin_grouped_group_contact_index],
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
        <TableHeading
          isId
          style={{
            maxWidth: "180px",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          Name
        </TableHeading>
      ),
      render: (value: any, record: any, index: number) => {
        const user: IContacts = record;
        const abs =
          user?.user?.student?.type == StudentType.TYPE_OLD &&
          (user.status.toString() === NEW_STUDENT_NOT_ATTENDED.toString() ||
            user.status.toString() === NEW_STUDENT_ATTENDED.toString()) ? (
            <div className="abs1">
              <SharpStarSvg color={bgColors.primary} />
            </div>
          ) : null;

        return (
          <AntdUserProfile
            props={record}
            propsValue={value}
            index={index}
            abs={abs}
            isMark
          />
        );
      },
    },
    {
      title: (
        <TableHeading isId style={{ minWidth: "100px" }}>
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
        <TableHeading isId style={{ minWidth: "80px" }}>
          Periods
        </TableHeading>
      ),
      dataIndex: "periods",
      render: (value: any, record: any, index: number) => {
        return (
          <PeriodsCell
            row={record}
            queryKeys={queryKeys.admin_grouped_group_contact_index}
          />
        );
      },
    },
    {
      title: <TableHeading style={{ minWidth: "40px" }}>Lesson</TableHeading>,
      dataIndex: ["actualPayment", "lesson_count"],
      render: (value: any, record: any, index: number) => {
        return (
          <CellNameWrapper style={{ minWidth: "40px" }}>
            <span className="name">{value || 0}</span>
          </CellNameWrapper>
        );
      },
    },
    funcCheckPermission([COMPONENTS_VIEWS.can_see_student_payment]) && {
      title: (
        <TableHeading isId style={{ minWidth: "100px" }}>
          Payment
        </TableHeading>
      ),
      dataIndex: "actualPayment",
      render: (value: any, record: any, index: number) => {
        const user: { user: IUser; group: any } = record;
        return (
          <CellNameWrapper style={{ minWidth: "100px" }}>
            <PaymentInfo user={user as any} group={user?.group} />
          </CellNameWrapper>
        );
      },
    },
    {
      title: GroupInfoHeader,
      dataIndex: "group",
      render: (value: any, record: any, index: number) => {
        return <AntdInfoCell record={record} value={value} />;
      },
    },
    {
      title: <TableHeading style={{ minWidth: "52px" }}>Note</TableHeading>,
      dataIndex: ["user", "student", "note"],
      render: (value: any, record: any, index: number) => {
        const data: string = value;
        const user_id = record.user?.id || null;
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
    {
      title: <TableHeading isId>Label</TableHeading>,
      dataIndex: ["user", "userLabels"],
      render: (value: any, record: any, index: number) => (
        <StudentLabels
          data={record}
          activeLabels={record?.user?.student?.permissionLabels}
          queryKeys={[queryKeys.admin_grouped_group_contact_index]}
          tableKey="admin-grouped-group-contact-index"
          clientUpdate
        />
      ),
    },
    {
      title: <TableHeading isId>Actions</TableHeading>,
      dataIndex: "actions",
      render: (value: any, record: any, index: number) => (
        <ContactActions
          queryKeys={[queryKeys.admin_grouped_group_contact_index]}
          data={record}
          activeActions={record?.buttonActions}
          onlyChoices={{ move: true }}
        />
      ),
    },
  ].filter((e) => !!e);
};
