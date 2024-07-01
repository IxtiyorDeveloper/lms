import React, { useMemo } from "react";

import {
  Cell,
  CellNameWrapper,
  CellNameWrapperForDate,
  HeaderCell,
} from "./style";
import moment from "moment";
import {
  AntdInfoCell,
  AntdUserProfile,
  NoteEditPopover,
  PaymentInfo,
  PeriodsCell,
  PhoneCell,
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
  DATE_FORMAT_HH_mm_ss,
  DATE_FORMAT_MMM_DD_YYYY,
  DATE_FORMAT_SHOW_MMM,
} from "constants/dates";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { Tooltip } from "antd";
import { GROUP_FORM_INDIVIDUAL } from "constants/groupForms";
import { studentMarkColors } from "constants/studentStatuses";
import { IUserPhone } from "types/userPhone";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { sortTimes } from "./components/sortTime";
import { getStudentStatus } from "utils/studentStatusIdentifier";
import { useRouter } from "next/router";
import { ETabStatuses } from "types";
import _ from "lodash";
import { tab_fields } from "./components/fields";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";

export const getWaitingListColumns = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const router = useRouter();

  const tab_id = router.query?.tab_id?.toString() || ETabStatuses.TAB_WAITING;

  const activeColumns = tab_fields[tab_id as keyof typeof tab_fields];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const a = errors as any;

  const changeComment = useChangeCommentStudent({
    onSuccess: () => {
      toast.success("Student comment changed");
      queryClient.invalidateQueries([queryKeys.waiting_list]);
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

  const columns = {
    name: {
      dataIndex: ["user", "userProfile"],
      title: (
        <TableHeading isId padding>
          Name
        </TableHeading>
      ),
      render: (value: any, record: any, index: number) => {
        const overallStatus = getStudentStatus({ user: record });
        const markColor =
          studentMarkColors[overallStatus as keyof typeof studentMarkColors];

        return (
          <AntdUserProfile
            props={record}
            propsValue={value}
            index={index}
            markColor={markColor}
          />
        );
      },
    },
    phone: {
      title: <HeaderCell>Phone</HeaderCell>,
      dataIndex: ["user", "userPhones"],
      render: (value: IUserPhone[], record: any, index: number) => {
        return <PhoneCell value={value} />;
      },
    },
    course: {
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
    level: {
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
    day_time: {
      title: <TableHeading>Day & Time</TableHeading>,
      dataIndex: ["preferDays", "lessonDay", "name"],
      render: (value: any, record: any, index: number) => {
        const preferDays = record?.preferDays as any[];
        const preferTimes = record?.preferTimes as any[];
        const days = preferDays?.map((e) => e.day.name);
        const times = sortTimes(
          preferTimes?.map(
            (e) =>
              e.time?.time &&
              moment(e.time.time, DATE_FORMAT_HH_mm_ss).format(
                DATE_FORMAT_HH_mm,
              ),
          ),
        );

        return (
          <CellNameWrapper>
            <Tooltip destroyTooltipOnHide title={times?.join(" ")}>
              <span className="name">
                {days?.join(" ")} <br /> {times?.join(" ")}
              </span>
            </Tooltip>
          </CellNameWrapper>
        );
      },
    },
    branch: {
      title: <TableHeading>Branch</TableHeading>,
      dataIndex: ["branch", "name"],
      render: (value: any, record: any, index: number) => {
        return (
          <CellNameWrapper>
            <span className="name">{value}</span>
          </CellNameWrapper>
        );
      },
    },
    period: {
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
    lesson: {
      title: <TableHeading>Lesson</TableHeading>,
      dataIndex: ["currentGroupContact", "actualPayment", "lesson_count"],
      render: (value: any, record: any, index: number) => {
        return (
          <Cell>
            <div className="ordinary">{value ?? 0}</div>
          </Cell>
        );
      },
    },
    payment: funcCheckPermission([
      COMPONENTS_VIEWS.can_see_student_payment,
    ]) && {
      title: <TableHeading isId>Payment</TableHeading>,
      dataIndex: ["currentGroupContact", "actualPayment"],
      render: (value: any, record: any, index: number) => {
        const user: any = record?.currentGroupContact;
        return (
          <Cell>
            <div className="ordinary">
              <PaymentInfo user={user} group={user?.group} />
            </div>
          </Cell>
        );
      },
    },
    group_info: {
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
    archivedDate: {
      title: (
        <TableHeading style={{ width: "52px", minWidth: "52px" }}>
          Archived Date
        </TableHeading>
      ),
      dataIndex: ["lastStudentFlow", "created_at"],
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
    note: {
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
    stoppedCategory: {
      title: <TableHeading>Stopped category</TableHeading>,
      dataIndex: ["lastStudentFlow", "leaving_reason"],
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
                      queryKeys: [queryKeys.admin_statistics_created_student],
                      leaving_category_id:
                        record?.lastStudentFlow?.leaving_category_id,
                      reason: record?.lastStudentFlow?.leaving_reason,
                      student: record,
                    },
                  },
                }),
              )
            }
          >
            <Tooltip destroyTooltipOnHide title={value}>
              <p className="text">{value}</p>
            </Tooltip>
          </Cell>
        );
      },
    },
    last_group_info: {
      title: <TableHeading>Last group info</TableHeading>,
      dataIndex: "lastGroup",
      render: (value: any, record: any, index: number) => {
        return <AntdInfoCell record={record} value={value} />;
      },
    },
    date: {
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
    label: {
      title: <TableHeading>Label</TableHeading>,
      dataIndex: ["user", "userLabels"],
      render: (value: any, record: any, index: number) => (
        <StudentLabels
          data={record}
          queryKeys={[queryKeys.admin_statistics_created_student]}
          tableKey={queryKeys.admin_statistics_created_student}
          clientUpdate
        />
      ),
    },
    action: canManage
      ? {
          title: <TableHeading>Actions</TableHeading>,
          dataIndex: "actions",
          render: (value: any, record: any, index: number) => (
            <StudentActions
              queryKeys={[queryKeys.admin_statistics_created_student]}
              data={record}
              activeActions={record?.buttonActions}
              extra={{
                delete: {
                  textarea: true,
                  mySelect: false,
                },
              }}
            />
          ),
        }
      : {
          title: <TableHeading>Actions</TableHeading>,
          dataIndex: "actions",
          render: () => <></>,
        },
  };

  return useMemo(
    () =>
      _.map(activeColumns, (value, key: string) => {
        if (value) return columns[key as keyof typeof columns];
      }),
    [activeColumns],
  );
};
