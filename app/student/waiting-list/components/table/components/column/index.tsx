import React from "react";

import { CellNameWrapper, CellNameWrapperForDate, HeaderCell } from "./style";
import moment from "moment";
import {
  AntdUserProfile,
  NoteEditPopover,
  PhoneCell,
  SharpStarSvg,
  StudentActions,
  StudentLabels,
  TableHeading,
} from "components";
import { useForm } from "react-hook-form";
import { useChangeCommentStudent } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_HH_mm,
  DATE_FORMAT_SHOW_MMM,
} from "constants/dates";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { GROUP_FORM_INDIVIDUAL } from "constants/groupForms";
import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
} from "constants/studentStatuses";
import { StudentType } from "types";
import { bgColors } from "styles/theme";
import { IUserPhone } from "types/userPhone";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import PreferredBranches from "./components/preferredBranches";
import PreferredTimeAndDate from "./components/preferredTimeAndDate";

export const getWaitingListColumns = () => {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const a = errors as any;

  const changeComment = useChangeCommentStudent({
    onSuccess: () => {
      toast.success("Student comment changed");
      queryClient.invalidateQueries([queryKeys.admin_student_list]);
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmitChangeComment = (id: number, comment: string) => {
    changeComment.mutate({ id, comment });
  };

  const canManage = funcCheckPermission([
    COMPONENTS_VIEWS.can_manage_waiting_students,
  ]);

  return [
    {
      dataIndex: ["user", "userProfile"],
      title: (
        <TableHeading isId padding>
          Name
        </TableHeading>
      ),
      render: (value: any, record: any, index: number) => {
        const user = record;
        const abs =
          user?.type == StudentType.TYPE_OLD &&
          (user.status.toString() === NEW_STUDENT_NOT_ATTENDED.toString() ||
            user.status.toString() === NEW_STUDENT_ATTENDED.toString()) ? (
            <div className="abs1">
              <SharpStarSvg color={bgColors.primary} />
            </div>
          ) : null;

        return (
          <AntdUserProfile
            props={record}
            abs={abs}
            propsValue={value}
            index={index}
            labelColor={false}
          />
        );
      },
    },
    {
      title: <HeaderCell>Phone</HeaderCell>,
      dataIndex: ["user", "userPhones"],
      render: (value: IUserPhone[], record: any, index: number) => {
        return <PhoneCell value={value} />;
      },
    },
    {
      title: <HeaderCell>Course</HeaderCell>,
      dataIndex: "course",
      render: (value: any, record: any, index: number) => {
        const data = record;
        return (
          <CellNameWrapper>
            <span className="name-wel">
              {data.course?.name}
              {"\n"}
              <p
                className={
                  data.groupType?.group_form === GROUP_FORM_INDIVIDUAL
                    ? "ind"
                    : ""
                }
              >
                {data.groupType?.name}
              </p>
            </span>
          </CellNameWrapper>
        );
      },
    },
    {
      title: <HeaderCell>Level</HeaderCell>,
      dataIndex: "level",
      render: (value: any, record: any, index: number) => {
        const levelArray: string[] = [];
        const reverseFunc = (obj1: any) => {
          levelArray.push(obj1?.name);
          if (obj1?.parent) {
            reverseFunc(obj1.parent);
          }
        };
        reverseFunc(value);
        return (
          <CellNameWrapper>
            <span className="name-wel">
              {levelArray &&
                levelArray?.reverse().map((name, index) => {
                  return <p key={index}>{name}</p>;
                })}
            </span>
          </CellNameWrapper>
        );
      },
    },
    {
      title: <TableHeading>Day & Time</TableHeading>,
      dataIndex: ["preferDays", "lessonDay", "name"],
      render: (value: any, record: any, index: number) => {
        return <PreferredTimeAndDate record={record} />;
      },
    },
    {
      title: <TableHeading>Branch</TableHeading>,
      dataIndex: ["preferBranches"],
      render: (value: any, record: any, index: number) => {
        return <PreferredBranches branches={value} />;
      },
    },
    {
      title: <TableHeading>Note</TableHeading>,
      dataIndex: "note",
      render: (value: any, record: any, index: number) => {
        const id = record?.user_id || null;
        return (
          <NoteEditPopover
            control={control}
            note={value}
            defaultValue={value}
            handleSubmit={handleSubmit}
            onSubmit={(data: any) => {
              onSubmitChangeComment(id, data?.[`note_${id}`]);
            }}
            error={a?.[`note_${id}`]?.message as string}
            id={id}
          />
        );
      },
    },
    {
      title: <TableHeading>Date</TableHeading>,
      dataIndex: "updated_at",
      render: (value: any, record: any, index: number) => {
        return (
          <CellNameWrapperForDate>
            <p className="name">
              {value
                ? moment(value, DATE_FORMAT_CREATED_AT).format(
                    DATE_FORMAT_SHOW_MMM,
                  )
                : "-"}
            </p>
            <p className="name">
              {value
                ? moment(value, DATE_FORMAT_CREATED_AT).format(
                    DATE_FORMAT_HH_mm,
                  )
                : "-"}
            </p>
          </CellNameWrapperForDate>
        );
      },
    },
    {
      title: <TableHeading>Label</TableHeading>,
      dataIndex: ["user", "userLabels"],
      render: (value: any, record: any, index: number) => (
        <StudentLabels
          data={record}
          queryKeys={[queryKeys.admin_student_list]}
        />
      ),
    },
    canManage
      ? {
          title: <TableHeading>Actions</TableHeading>,
          dataIndex: "actions",
          render: (value: any, record: any, index: number) => {
            return (
              <StudentActions
                queryKeys={[queryKeys.admin_student_list]}
                data={record}
                activeActions={{
                  ...record?.buttonActions,
                  ban: false,
                }}
                extra={{
                  delete: {
                    textarea: true,
                    mySelect: false,
                  },
                }}
              />
            );
          },
        }
      : {
          title: <TableHeading>Actions</TableHeading>,
          dataIndex: "actions",
          render: () => <></>,
        },
  ];
};
