import React, { useMemo } from "react";
import { ISchedule } from "types";
import { Heading, Cell } from "./style";
import { ToHourMinute } from "utils/toHourMinute";
import { getObjectByWeekday } from "../../utils";
import { freePlaceSumCalc } from "./components/freePlaceSum";
import GroupCell from "./components/groupCell";

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

const FreePlaceByScheduleColumns: ({
  data,
  collection,
  day_id,
}: Interface) => MenuInterface[] = ({ data, collection, day_id }) => {
  return useMemo(() => {
    let array: MenuInterface[] = [];
    if (data?.times)
      for (let i = 0; i < data?.times?.length; i++) {
        const day =
          day_id ??
          getObjectByWeekday({
            data: data?.days,
          })?.id;
        const time = data?.times?.[i];
        const groups = collection?.groups?.filter(
          (group) =>
            group.lesson_time_id?.toString() === time?.id.toString() &&
            group.lesson_day_id == day
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
                  time={time}
                  day={day}
                  freePlaceSum={freePlaceSum}
                  record={record}
                  index={index}
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
              <div className="room">Room / Time</div>
            </Heading>
          </Cell>
        ),
        dataIndex: "name",
        render: (value, record, index) => {
          if (index == 0)
            return (
              <Cell>
                <Heading className="black">
                  <div className="brilliance">Free rooms</div>
                </Heading>
              </Cell>
            );
          return (
            <Cell>
              <Heading>
                <div className="room">{value}</div>
              </Heading>
            </Cell>
          );
        },
      },
      ...array,
    ];
  }, [data, collection, day_id]);
};

export default FreePlaceByScheduleColumns;
