import React, { useMemo } from "react";
import { EGroupType, ISchedule } from "types";
import { Cell, Heading } from "./style";
import { ToHourMinute } from "utils/toHourMinute";
import GroupCell from "./components/groupCell";

interface Interface {
  data: ISchedule | undefined;
  initValue: number | string;
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

export interface ICreateGroup {
  type: EGroupType;
  room_id?: string;
  time_id?: string;
  branch_id?: string;
  isClosing?: boolean;
}

const ScheduleColumns: ({
  data,
  collection,
  initValue,
  day_id,
}: Interface) => MenuInterface[] = ({
  data,
  collection,
  initValue,
  day_id,
}) => {
  return useMemo(() => {
    let array: MenuInterface[] = [];
    if (data?.times)
      for (let i = 0; i < data?.times?.length; i++) {
        const time = data?.times?.[i];
        array = [
          ...array,
          {
            title: (
              <Cell>
                <Heading>
                  <div className="room">{ToHourMinute(time?.time)}</div>
                </Heading>
              </Cell>
            ),
            dataIndex: `time_${time?.id}`,
            render: (value, record, index) => {
              return (
                <GroupCell
                  collection={collection}
                  data={data}
                  day_id={day_id}
                  initValue={initValue}
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
              <div className="room">Room</div>
            </Heading>
          </Cell>
        ),
        dataIndex: "name",
        render: (value, record, index) => {
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

export default ScheduleColumns;
