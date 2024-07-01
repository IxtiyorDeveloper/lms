import React, { useMemo } from "react";
import {
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
import { IUserPhone } from "types/userPhone";
import { queryKeys } from "constants/queryKeys";
import { CellNameWrapper } from "./style";
import { funcCheckPermission, validationErrorHandler } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useChangeCommentStudent } from "hooks";
import { toast } from "react-toastify";
import WhereComponent from "./components/where";
import { IContacts } from "../../../../../../types/contact";
import {
  STOPPING_STUDENT,
} from "../../../../../../constants/studentStatuses";
import { SharpStarSvg } from "../../../../../../components";

export const Columns = ({ columns }: { columns: string[] | undefined }) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm({});
  const changeComment = useChangeCommentStudent({
    onSuccess: () => {
      toast.success("Student comment changed");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.studying_student_list],
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmitChangeComment = (id: number, comment: string) => {
    changeComment.mutate({ id, comment });
  };
  const fields = {
    name: {
      dataIndex: ["user", "userProfile"],
      title: (
        <TableHeading isId padding style={{ width: "180px" }}>
          Name
        </TableHeading>
      ),
      render: (value: any, record: any, index: number) => {
        const user: IContacts = record;

        const abs =
          STOPPING_STUDENT.toString() == user?.status.toString() ? (
            user.user?.is_freshman ? (
              <div className="abs">
                <SharpStarSvg />
              </div>
            ) : null
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
    phone: {
      title: (
        <TableHeading isId style={{ minWidth: "80px", width: "90px" }}>
          Phone
        </TableHeading>
      ),
      dataIndex: ["user", "userPhones"],
      render: (value: IUserPhone[], record: any, index: number) => {
        return <PhoneCell value={value} />;
      },
    },
    period: {
      title: (
        <TableHeading isId style={{ width: "80px", minWidth: "auto" }}>
          Period
        </TableHeading>
      ),
      dataIndex: "periods",
      Footer: "Periods",
      render: (value: any, record: any, index: number) => {
        return (
          <PeriodsCell
            row={record}
            queryKeys={[queryKeys.studying_student_list]}
          />
        );
      },
    },
    lesson: {
      title: (
        <TableHeading style={{ textAlign: "center", minWidth: "30px" }}>
          Lesson
        </TableHeading>
      ),
      dataIndex: ["actualPayment", "lesson_count"],
      render: (value: any, record: any, index: number) => {
        return (
          <CellNameWrapper style={{ minWidth: "30px", textAlign: "center" }}>
            <span
              className="name"
              style={{ textAlign: "center", width: "100%" }}
            >
              {value || 0}
            </span>
          </CellNameWrapper>
        );
      },
    },
    payment_info: funcCheckPermission([
      COMPONENTS_VIEWS.can_see_student_payment,
    ]) && {
      title: <TableHeading isId>Payment</TableHeading>,
      dataIndex: "actualPayment",
      render: (value: any, record: any, index: number) => {
        const user: any = record;
        return <PaymentInfo user={user} group={user?.group} queryKeys={[queryKeys.studying_student_list]}/>;
      },
    },
    group_info: {
      title: <TableHeading isId>Group info</TableHeading>,
      dataIndex: "group",
      render: (value: any, record: any, index: number) => {
        return <AntdInfoCell record={record} value={value} />;
      },
    },
    where: {
      title: <TableHeading>Where</TableHeading>,
      dataIndex: "student_next_status",
      render: (value: any, record: any, index: number) => {
        return <WhereComponent value={value} record={record} />;
      },
    },
    note: {
      title: (
        <TableHeading style={{ width: "52px", minWidth: "52px" }}>
          Note
        </TableHeading>
      ),
      dataIndex: ["user", "student", "note"],
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
    label: {
      title: (
        <TableHeading isId style={{ minWidth: "20px" }}>
          Label
        </TableHeading>
      ),
      dataIndex: ["user", "userLabels"],
      render: (value: any, record: any, index: number) => (
        <StudentLabels
          data={record}
          queryKeys={[queryKeys.studying_student_list]}
          activeLabels={record?.user?.student?.permissionLabels}
          tableKey="studying-student-list"
          clientUpdate
        />
      ),
    },
    actions: {
      title: <TableHeading isId>Actions</TableHeading>,
      dataIndex: "actions",
      render: (value: any, record: any, index: number) => (
        <ContactActions
          queryKeys={[queryKeys.studying_student_list]}
          data={record}
          activeActions={record?.buttonActions}
        />
      ),
    },
  };
  return columns
    ?.map((item: string) => fields[item as keyof typeof fields])
    ?.filter((e: any) => !!e);
};
