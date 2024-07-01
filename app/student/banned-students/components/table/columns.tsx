import React from "react";

import { CellNameWrapper, HeaderCell } from "./style";
import moment from "moment";
import {
  AntdUserProfile,
  ContactActions,
  NoteEditPopover,
  PhoneCell,
  TableHeading,
} from "components";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useChangeCommentStudent } from "hooks";
import { toast } from "react-toastify";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_HH_mm,
  DATE_FORMAT_HH_mm_ss,
  DATE_FORMAT_SHOW_MMM,
} from "constants/dates";
import { IUserPhone } from "types/userPhone";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const Columns = () => {
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
      queryClient.invalidateQueries({
        queryKey: [queryKeys.banned_student_list],
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
        <TableHeading isId padding>
          Name
        </TableHeading>
      ),
      render: (value: any, record: any, index: number) => {
        return (
          <AntdUserProfile props={record} propsValue={value} index={index} />
        );
      },
    },
    {
      title: <HeaderCell>Created By</HeaderCell>,
      dataIndex: ["createdBy", "userProfile"],
      render: (value: any, record: any, index: number) => {
        const createdBy = value?.firstname
          ? `${value?.firstname} ${value?.lastname}`
          : "-";
        return (
          <CellNameWrapper>
            <p className="name">{createdBy}</p>
          </CellNameWrapper>
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
      dataIndex: ["course", "name"],
      render: (value: any, record: any, index: number) => {
        return (
          <CellNameWrapper style={{ flexDirection: "column" }}>
            <p className="name">{value}</p>
            <p className="name">{record.groupType.name}</p>
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
            reverseFunc(obj1?.parent);
          }
        };
        reverseFunc(value);
        return (
          <CellNameWrapper>
            <span className="name">
              {levelArray && levelArray?.reverse().join(" ")}
            </span>
          </CellNameWrapper>
        );
      },
    },
    {
      title: <HeaderCell style={{ minWidth: "80px" }}>Day & Time</HeaderCell>,
      dataIndex: ["preferDays", "lessonDay", "name"],
      render: (value: any, record: any, index: number) => {
        const preferDays = record?.preferDays as any[];
        const preferTimes = record?.preferTimes as any[];
        const days = preferDays?.map((e) => e.day.name);
        const times = preferTimes?.map(
          (e) =>
            e.time?.time &&
            moment(e.time.time, DATE_FORMAT_HH_mm_ss).format(DATE_FORMAT_HH_mm)
        );
        return (
          <CellNameWrapper>
            <span className="name">
              {days?.join(" ")} <br /> {times?.join(" ")}
            </span>
          </CellNameWrapper>
        );
      },
    },
    {
      title: <HeaderCell>Branch</HeaderCell>,
      dataIndex: ["branch", "name"],
      render: (value: any, record: any, index: number) => {
        return (
          <CellNameWrapper>
            <span className="name">{value}</span>
          </CellNameWrapper>
        );
      },
    },
    {
      title: <HeaderCell style={{ maxWidth: "52px" }}>Note</HeaderCell>,
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
      title: <HeaderCell>Date</HeaderCell>,
      dataIndex: ["user", "created_at"],
      render: (value: any, record: any, index: number) => {
        return (
          <CellNameWrapper>
            <span className="name">
              {value
                ? moment(value, DATE_FORMAT_CREATED_AT).format(
                    DATE_FORMAT_SHOW_MMM
                  )
                : "-"}
            </span>
          </CellNameWrapper>
        );
      },
    },
    {
      title: <HeaderCell>Actions</HeaderCell>,
      dataIndex: "actions",
      render: (value: any, record: any, index: number) => (
        <ContactActions
          queryKeys={[queryKeys.banned_student_list]}
          data={record}
          activeActions={record?.buttonActions}
        />
      ),
    },
  ];
};
