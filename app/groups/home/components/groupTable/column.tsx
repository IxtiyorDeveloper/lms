import React, { useMemo } from "react";
import {
  Button,
  GroupActions,
  NoteEditPopover,
  TableHeading,
  BadgeStarSvg,
} from "components";
import { Cell, CellFlex, Content } from "./style";
import { EMentorTypes, IGroup, IGroupMentor, TGeneral, TParams } from "types";
import { ToHourMinute } from "utils/toHourMinute";
import { bgColors, borders, textColors } from "styles/theme";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useChangeGroupNote } from "hooks";
import { toast } from "react-toastify";
import { getRowNumber } from "utils/getRowNumber";
import _ from "lodash";
import moment from "moment";
import { DATE_FORMAT_SHOW_MMM_YYYY } from "constants/dates";
import TimSortHeader from "./components/time/timeSort";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { isDateInMonthAndYear } from "utils/checkThisMonth";
import { AttendSvg, ColoredAttendSvg } from "@jasurbekyuldashov/lms-web-icons";
import Responsible from "./components/responsible";

const Column = ({ activeColumns }: { activeColumns: TParams }) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<TGeneral>();
  const changeComment = useChangeGroupNote({
    onSuccess: () => {
      toast.success("Group note is updated");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.admin_group_index],
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onSubmitChangeComment = (id: number, comment: string) => {
    changeComment.mutate({ id, comment });
  };

  const elements: TParams = {
    group: {
      title: (
        <TableHeading padding isId>
          Group
        </TableHeading>
      ),
      dataIndex: "name",
      render: (value: any, record: any, index: number) => {
        const id = getRowNumber({ index });
        const name = value;
        const groupType = record?.groupType?.name;
        return (
          <Cell>
            <CellFlex>
              <div className="id">{id}</div>
              <Content>
                <Link href={`groups/${record.id}`} className="title link">
                  {name}
                </Link>
                <div className="desc">{groupType}</div>
              </Content>
            </CellFlex>
          </Cell>
        );
      },
    },
    teacher: {
      title: <TableHeading padding>Teacher</TableHeading>,
      dataIndex: "groupMentors",
      render: (value: any, record: any, index: number) => {
        const teacher = value.find(
          (t: IGroupMentor) => t?.type === EMentorTypes.Teacher,
        );
        const name = teacher?.user?.userProfile?.firstname
          ? teacher?.user?.userProfile?.firstname +
            " " +
            teacher?.user?.userProfile?.lastname
          : "-";
        const isHiredDateThisMonth = isDateInMonthAndYear({
          dateString: teacher?.user?.staff?.hired_date,
        });
        return (
          <Cell>
            <CellFlex>
              <Content>
                <div className="title">
                  {name}
                  {isHiredDateThisMonth && (
                    <div className="absn">
                      <BadgeStarSvg />
                      <p className="num_new">New</p>
                    </div>
                  )}
                </div>
                <div className="desc">
                  {moment(record?.start_date).format(
                    DATE_FORMAT_SHOW_MMM_YYYY,
                  ) ?? "-"}
                </div>
              </Content>
            </CellFlex>
          </Cell>
        );
      },
    },
    teacher_updated_at: {
      title: <TableHeading padding>Teacher</TableHeading>,
      dataIndex: "groupMentors",
      render: (value: any, record: any, index: number) => {
        const teacher = value.find(
          (t: IGroupMentor) => t?.type === EMentorTypes.Teacher,
        );
        const name = teacher?.user?.userProfile?.firstname
          ? teacher?.user?.userProfile?.firstname +
            " " +
            teacher?.user?.userProfile?.lastname
          : "-";
        return (
          <Cell>
            <CellFlex>
              <Content>
                <div className="title">{name}</div>
                <div className="desc">
                  {!!record?.updated_at
                    ? moment(record?.updated_at).format(
                        DATE_FORMAT_SHOW_MMM_YYYY,
                      )
                    : moment(record?.start_date).format(
                        DATE_FORMAT_SHOW_MMM_YYYY,
                      )}
                </div>
              </Content>
            </CellFlex>
          </Cell>
        );
      },
    },
    teacher_without_start_date: {
      title: <TableHeading padding>Teacher</TableHeading>,
      dataIndex: "groupMentors",
      render: (value: any, record: any, index: number) => {
        const teacher = value.find(
          (t: IGroupMentor) => t?.type === EMentorTypes.Teacher,
        );
        const name = teacher?.user?.userProfile?.firstname
          ? teacher?.user?.userProfile?.firstname +
            " " +
            teacher?.user?.userProfile?.lastname
          : "-";
        return (
          <Cell>
            <CellFlex>
              <Content>
                <div className="title">{name}</div>
              </Content>
            </CellFlex>
          </Cell>
        );
      },
    },
    responsible: {
      title: <TableHeading padding>Responsible</TableHeading>,
      dataIndex: "groupMentors",
      render: (value: any, record: IGroup, index: number) => {
        return <Responsible record={record} />;
      },
    },
    start_date: {
      title: <TableHeading padding>Start date</TableHeading>,
      dataIndex: "start_date",
      render: (value: any, record: any, index: number) => {
        return (
          <Cell>
            <CellFlex>
              <Content>
                <div className="date">
                  {value
                    ? moment(value).format(DATE_FORMAT_SHOW_MMM_YYYY)
                    : "-"}
                </div>
              </Content>
            </CellFlex>
          </Cell>
        );
      },
    },
    updated_at: {
      title: <TableHeading padding>Closed date</TableHeading>,
      dataIndex: "updated_at",
      render: (value: any, record: any, index: number) => {
        return (
          <Cell>
            <CellFlex>
              <Content>
                <div className="date">
                  {value
                    ? moment(value).format(DATE_FORMAT_SHOW_MMM_YYYY)
                    : "-"}
                </div>
              </Content>
            </CellFlex>
          </Cell>
        );
      },
    },
    branch: {
      title: <TableHeading padding>Branch</TableHeading>,
      dataIndex: "room",
      render: (value: any, record: any, index: number) => {
        const room = value?.name;
        const branch = value?.branch?.name;
        return (
          <Cell>
            <CellFlex>
              <Content>
                <div className="title">{branch}</div>
                <div className="desc">{room}</div>
              </Content>
            </CellFlex>
          </Cell>
        );
      },
    },
    day: {
      title: <TimSortHeader />,
      dataIndex: "lessonDay",
      render: (value: any, record: any, index: number) => {
        const day = value?.name;
        const time = record?.lessonTime?.time;
        return (
          <Cell>
            <CellFlex>
              <Content>
                <div className="title">{ToHourMinute(time)}</div>
                <div className="desc">{day}</div>
              </Content>
            </CellFlex>
          </Cell>
        );
      },
    },
    note: {
      title: <TableHeading padding>Note</TableHeading>,
      dataIndex: "note",
      render: (value: any, record: any, index: number) => {
        const data: string = value;
        const id = record?.id || null;
        return (
          <NoteEditPopover
            id={id}
            note={data}
            control={control}
            defaultValue={data}
            handleSubmit={handleSubmit}
            onSubmit={(p: any) => {
              onSubmitChangeComment(id, p?.[`note_${id}`]);
            }}
          />
        );
      },
    },
    course: {
      title: <TableHeading padding>Course</TableHeading>,
      dataIndex: "course",
      render: (value: any, record: any, index: number) => {
        const course = value?.name;
        const level = record?.level;
        const mainLevel = level?.parent?.name;
        const subLevel = level?.name;
        return (
          <Cell>
            <CellFlex>
              <Content>
                <div className="title">{course}</div>
                <div className="desc">{`${mainLevel} / ${subLevel}`}</div>
              </Content>
            </CellFlex>
          </Cell>
        );
      },
    },
    students: {
      title: <TableHeading padding>Students</TableHeading>,
      dataIndex: "real_total_contact_count",
      render: (value: any, record: any, index: number) => {
        const partial_payed_count = record?.partial_payed_count;
        const payment_count = record?.payment_count;
        return (
          <Cell>
            <CellFlex>
              <Content>
                <div className="top">
                  <Button
                    style={{
                      backgroundColor: bgColors.slate,
                      color: textColors.white,
                      padding: "2px 6px",
                      minHeight: 0,
                      borderRadius: borders.b40,
                    }}
                  >
                    Total ({value})
                  </Button>
                </div>
                <div className="bottom">
                  <Button
                    style={{
                      backgroundColor: bgColors.midori,
                      color: textColors.white,
                      padding: "2px 6px",
                      minHeight: 0,
                      borderRadius: borders.b40,
                    }}
                  >
                    Paid ({payment_count})
                  </Button>
                  <Button
                    style={{
                      backgroundColor: bgColors.primary,
                      color: textColors.white,
                      padding: "2px 6px",
                      minHeight: 0,
                      minWidth: "100px",
                      borderRadius: borders.b40,
                    }}
                  >
                    Partly Paid({partial_payed_count})
                  </Button>
                </div>
              </Content>
            </CellFlex>
          </Cell>
        );
      },
    },
    new_students: {
      title: <TableHeading padding>New Students</TableHeading>,
      dataIndex: "new_student_attended_contact_count",
      render: (value: any, record: any, index: number) => {
        return (
          <Cell>
            <CellFlex>
              <Content>
                <div className="top">
                  <Button
                    style={{
                      backgroundColor: bgColors.purpleCrystal,
                      padding: "2px 6px",
                      minHeight: 0,
                    }}
                    className="new-student"
                  >
                    <AttendSvg
                      width={14}
                      height={14}
                      color={bgColors.yourShadow}
                    />{" "}
                    Not attended (
                    {record?.new_student_not_attended_contact_count})
                  </Button>
                </div>
                <div className="bottom">
                  <Button
                    className="new-student"
                    style={{
                      backgroundColor: bgColors.purpleCrystal,
                      padding: "2px 6px",
                      minHeight: 0,
                    }}
                  >
                    <ColoredAttendSvg
                      width={14}
                      height={14}
                      color={bgColors.yourShadow}
                    />{" "}
                    Attended ({value})
                  </Button>
                </div>
              </Content>
            </CellFlex>
          </Cell>
        );
      },
    },
    attend: {
      title: <TableHeading padding>Attend</TableHeading>,
      dataIndex: "new_student_attended_contact_count",
      render: (value: any, record: any, index: number) => {
        return (
          <Cell>
            <CellFlex>
              <Content>
                <div className="title">{value}</div>
              </Content>
            </CellFlex>
          </Cell>
        );
      },
    },
    not_attend: {
      title: <TableHeading padding>Not Attended</TableHeading>,
      dataIndex: "new_student_not_attended_contact_count",
      render: (value: any, record: any, index: number) => {
        return (
          <Cell>
            <CellFlex>
              <Content>
                <div className="title">{value}</div>
              </Content>
            </CellFlex>
          </Cell>
        );
      },
    },
    actions: {
      title: <TableHeading padding>Actions</TableHeading>,
      dataIndex: "id",
      render: (value: any, record: any, index: number) => {
        return (
          <GroupActions
            queryKeys={[queryKeys.admin_group_index]}
            groupId={value}
            activeActions={
              record?.buttonActions
                ? {
                    lifeCycle: true,
                    // changeTeacher: true,
                    ...record.buttonActions,
                  }
                : {}
            }
            group={record}
          />
        );
      },
    },
  };
  return useMemo(
    () =>
      _.map(activeColumns, (value, key: string) => {
        if (value) return elements[key];
      }),
    [activeColumns],
  );
};

export default Column;
