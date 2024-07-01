import React, { useMemo } from "react";
import { ISchedule } from "types";
import { Heading, Cell, HeadingTeacher } from "./style";
import { ToHourMinute } from "utils/toHourMinute";
import { GROUP_MENTOR_100 } from "constants/groupMentors";
import { getObjectByWeekday } from "../../utils";
import GroupCell from "./components/groupCell";
import { freePlaceSumCalc } from "./components/freePlaceSum";

interface Interface {
  data: ISchedule | undefined;
  day_id?: string;
  collection: {
    groups: ISchedule["data"] | undefined;
    rooms: ISchedule["rooms"] | undefined;
    teachers: ISchedule["teachers"] | undefined;
  };
}

interface MenuInterface {
  title: JSX.Element | string;
  dataIndex: string;
  render: (value: any, record: any, index: number) => JSX.Element;
}

const FreePlaceByTeacherColumns: ({
  data,
  collection,
  day_id,
}: Interface) => MenuInterface[] = ({ data, collection, day_id }) => {
  const day =
    day_id ??
    getObjectByWeekday({
      data: data?.days,
    })?.id;

  return useMemo(() => {
    let array: MenuInterface[] = [];
    if (data?.times)
      for (let i = 0; i < data?.times?.length; i++) {
        const time = data?.times?.[i];

        const groups = collection?.groups?.filter(
          (group) =>
            group.lesson_time_id?.toString() === time?.id.toString() &&
            group.lesson_day_id == day,
        );

        const freePlaceSum = freePlaceSumCalc({ groups });

        array = [
          ...array,
          {
            title: (
              <Cell>
                <Heading className={freePlaceSum ? "pale" : "whiteSmoke"}>
                  <div className="room">{ToHourMinute(time?.time)}</div>
                </Heading>
              </Cell>
            ),
            dataIndex: `time_${time?.id}`,
            render: (value, record, index) => {
              return (
                <GroupCell
                  collection={collection}
                  day={day}
                  freePlaceSum={freePlaceSum}
                  index={index}
                  record={record}
                  time={time}
                />
              );
            },
          },
        ];
      }
    return [
      {
        title: (
          <Cell>
            <Heading>
              <div className="room">Teacher</div>
            </Heading>
          </Cell>
        ),
        dataIndex: "name",
        render: (value, record, index) => {
          const groups = collection?.groups?.filter(
            (group) =>
              group.groupMentors
                ?.find(
                  (mentor) =>
                    mentor.type.toString() == GROUP_MENTOR_100.toString(),
                )
                ?.user_id?.toString() === record?.user_id?.toString() &&
              group.lesson_day_id == day,
          );

          const freePlaceSum = groups?.reduce((acc, cur) => {
            return acc + cur?.free_place;
          }, 0);

          if (index == 0)
            return (
              <Cell>
                <Heading className="black">
                  <div className="brilliance">Free places</div>
                </Heading>
              </Cell>
            );
          return (
            <Cell>
              <HeadingTeacher>
                <div>
                  <p>{record?.firstname}</p>
                  <p>{record?.lastname}</p>
                </div>
                <div className="abs">{freePlaceSum}</div>
              </HeadingTeacher>
            </Cell>
          );
        },
      },
      ...array,
    ];
  }, [data, collection, day_id]);
};

export default FreePlaceByTeacherColumns;
