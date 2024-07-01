import React from "react";
import {
  AntdInfoCell,
  AntdUserProfile,
  Cell,
  NoteEditPopover,
  PeriodsCell,
  PhoneCell,
  ReturnMoney,
  TableHeading,
} from "components";
import { TParams } from "types";
import _ from "lodash";
import moment from "moment/moment";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_HH_mm,
  DATE_FORMAT_HH_mm_ss,
  DATE_FORMAT_SHOW_MMM,
} from "constants/dates";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useChangeCommentStudent } from "hooks";
import { toast } from "react-toastify";
import { TAB_WAITING } from "constants/studentBalance";
import PaymentBox from "./payment";
import BalanceInfo from "./toolTip";
import { IUserPhone } from "types/userPhone";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export const TableColumns = ({
  activeCols,
  setSelected,
  tab_id,
}: {
  data?: any;
  tab_id?: any;
  activeCols?: TParams;
  setSelected: (obj: any) => void;
}) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm({});

  const changeComment = useChangeCommentStudent({
    onSuccess: () => {
      toast.success("Student comment changed");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.student_balance],
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmitChangeComment = (id: number, comment: string) => {
    changeComment.mutate({ id, comment });
  };
  const cols: TParams = {
    name: {
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
            isStudent={tab_id !== TAB_WAITING.toString()}
          />
        );
      },
    },
    phone: {
      title: <TableHeading>Phone</TableHeading>,
      dataIndex: ["user", "userPhones"],
      render: (value: IUserPhone[], record: any, index: number) => {
        return <PhoneCell value={value} />;
      },
    },
    stoppedCategory: {
      title: <TableHeading>Stopped category</TableHeading>,
      dataIndex: "stopped_category",
      render: (value: IUserPhone[], record: any, index: number) => {
        return <PhoneCell value={value} />;
      },
    },
    course: {
      title: <TableHeading>Course</TableHeading>,
      dataIndex: ["course", "name"],
      render: (value: any, record: any, index: number) => {
        return <Cell>{value}</Cell>;
      },
    },
    level: {
      title: <TableHeading>Level</TableHeading>,
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
          <Cell>
            <span className="name">
              {levelArray && levelArray?.reverse().join(" ")}
            </span>
          </Cell>
        );
      },
    },
    dayAndTime: {
      title: <TableHeading>Day & Time</TableHeading>,
      dataIndex: ["preferDays", "lessonDay", "name"],
      render: (value: any, record: any, index: number) => {
        const preferDays = record?.preferDays as any[];
        const preferTimes = record?.preferTimes as any[];
        const days = preferDays.map((e) => e.day.name);
        const times = preferTimes.map(
          (e) =>
            e.time?.time &&
            moment(e.time.time, DATE_FORMAT_HH_mm_ss).format(DATE_FORMAT_HH_mm)
        );
        return (
          <Cell>
            <span className="name">
              {days.join(" ")} <br /> {times.join(" ")}
            </span>
          </Cell>
        );
      },
    },
    branch: {
      title: <TableHeading>Branch</TableHeading>,
      dataIndex: ["branch", "name"],
      render: (value: any, record: any, index: number) => {
        return <Cell>{value}</Cell>;
      },
    },
    periods: {
      dataIndex: "periods",
      title: <TableHeading>Periods</TableHeading>,
      render: (value: any, record: any, index: number) => {
        const a = {
          actualPayment: record?.currentGroupContact?.actualPayment,
          id: record?.currentGroupContact?.id,
          ...record,
        };
        return <PeriodsCell row={a} queryKeys={[queryKeys.student_balance]} />;
      },
    },
    countLesson: {
      title: <TableHeading>Count Lessons</TableHeading>,
      dataIndex: ["currentGroupContact", "actualPayment", "lesson_count"],
      render: (value: any, record: any, index: number) => {
        return (
          <Cell>
            <div className="ordinary">{value ?? 0}</div>
          </Cell>
        );
      },
    },
    balance: {
      dataIndex: ["user", "balance"],
      title: <TableHeading>Balance</TableHeading>,
      width: "150px",
      render: (value: any, record: any, index: number) => (
        <Cell>
          <PaymentBox
            original={record}
            value={value}
            customTooltipChildren={(original: any) => (
              <BalanceInfo original={original?.original} />
            )}
          />
        </Cell>
      ),
    },
    note: {
      title: (
        <TableHeading style={{ width: "52px", minWidth: "52px" }}>
          Note
        </TableHeading>
      ),
      dataIndex: "note",
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
    date: {
      title: <TableHeading>Date</TableHeading>,
      dataIndex: ["user", "created_at"],
      render: (value: any, record: any, index: number) => {
        return (
          <Cell>
            {value
              ? moment(value, DATE_FORMAT_CREATED_AT).format(
                  DATE_FORMAT_SHOW_MMM
                )
              : "-"}
          </Cell>
        );
      },
    },
    groupInfo: {
      dataIndex: "group",
      title: <TableHeading>Group Info</TableHeading>,
      render: (value: any, record: any, index: number) => {
        return (
          <AntdInfoCell
            record={{
              ...record,
              group: record?.currentGroupContact?.group,
            }}
            value={record?.currentGroupContact?.group}
          />
        );
      },
    },
    actions: {
      title: <TableHeading>Actions</TableHeading>,
      dataIndex: "actions",
      render: (value: any, record: any, index: number) => (
        <Cell>
          <CheckPermission
            permission={[COMPONENTS_VIEWS.can_manage_money_back]}
          >
            <ReturnMoney
              onClick={() => {
                setSelected({
                  isOpen: true,
                  data: record,
                });
              }}
              size="small"
            />
          </CheckPermission>
        </Cell>
      ),
    },
  };
  return _.map(activeCols, (value, key: string) => {
    if (value) return cols[key];
  });
};
