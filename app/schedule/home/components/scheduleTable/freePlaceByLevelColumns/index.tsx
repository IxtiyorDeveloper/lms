import React, { useMemo } from "react";
import { ISchedule } from "types";
import { Heading, Cell, LevelFirstCell } from "./style";
import { ToHourMinute } from "utils/toHourMinute";
import Router, { useRouter } from "next/router";
import { EDayConstants } from "../../../../constants";
import { getObjectByWeekday } from "../../utils";
import GroupCell from "./components/groupCell";
import { freePlaceSumCalc } from "./components/freePlaceSum";

interface Interface {
  data: ISchedule | undefined;
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

const FreePlaceByLevelColumns: ({
  data,
  collection,
}: Interface) => MenuInterface[] = ({ data, collection }) => {
  const router = useRouter();
  const day_id = router.query?.day_id;

  const day =
    day_id ??
    getObjectByWeekday({
      data: data?.days,
    })?.id;

  const isAllDays = day_id == EDayConstants.ALL;

  return useMemo(() => {
    let array: MenuInterface[] = [];
    if (data?.times)
      for (let i = 0; i < data?.times?.length; i++) {
        const time = data?.times?.[i];
        const groups = collection?.groups?.filter((group) => {
          if (isAllDays) {
            return group.lesson_time_id?.toString() === time?.id.toString();
          } else {
            return (
              group.lesson_time_id?.toString() === time?.id.toString() &&
              group.lesson_day_id == day
            );
          }
        });

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
                  isAllDays={isAllDays}
                  record={record}
                  collection={collection}
                  time={time}
                  day={day}
                  freePlaceSum={freePlaceSum}
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
              <div className="room">Level</div>
            </Heading>
          </Cell>
        ),
        dataIndex: "name",
        render: (value, record, index) => {
          const groups = collection?.groups?.filter((group) => {
            if (isAllDays) {
              return (
                group.level?.parent?.id?.toString() == record?.id?.toString()
              );
            } else {
              return (
                group.level?.parent?.id?.toString() == record?.id?.toString() &&
                group.lesson_day_id == day
              );
            }
          });

          const freePlaceSum = freePlaceSumCalc({ groups });

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
              <LevelFirstCell>
                <div className="group-name">{record?.name}</div>
                {!!freePlaceSum && (
                  <div className="abs-sum">{freePlaceSum}</div>
                )}
              </LevelFirstCell>
            </Cell>
          );
        },
      },
      ...array,
    ];
  }, [data, collection, day_id, Router.query?.freePlace]);
};

export default FreePlaceByLevelColumns;
