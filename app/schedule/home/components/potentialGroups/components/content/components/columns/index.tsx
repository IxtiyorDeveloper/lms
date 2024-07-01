import React, { useMemo } from "react";
import { EGroupType, ISchedule, ITimedPotentialGroups } from "types";
import {
  BottomLevel,
  Cell,
  Container,
  GroupCell,
  Heading,
  Left,
  Level,
  NumberCount,
} from "./style";
import { ToHourMinute } from "utils/toHourMinute";
import { funcCheckPermission } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { toggleModal } from "store";
import { getObjectByWeekday } from "../../../../../utils";
import { queryKeys } from "constants/queryKeys";
import { useDispatch } from "react-redux";
import { getCurrentGroup } from "./components/getCurrentGroup";

interface Interface {
  data: ISchedule | undefined;
  day_id?: string;
  related_groups: ITimedPotentialGroups[];
  groupType: any;
  level: any;
  initValue: string | number;
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
  level_id?: string;
  group_type_id?: string;
}

const PotentialColumns: ({
  data,
  day_id,
  related_groups,
  groupType,
  level,
  initValue,
}: Interface) => MenuInterface[] = ({
  data,
  day_id,
  related_groups,
  groupType,
  level,
  initValue,
}) => {
  const dispatch = useDispatch();

  const handleCreateGroup = ({
    type,
    time_id,
    level_id,
    group_type_id,
  }: ICreateGroup) => {
    const parent_level = level?.options?.find((f: { subLevel: any[] }) =>
      f.subLevel?.some((g) => g.value == level_id),
    );

    if (type === EGroupType.FULL) {
      dispatch(
        toggleModal({
          key: "group",
          data: {
            open: true,
            data: {
              initial: true,
              action: "create",
              course_id: "1",
              time_id: time_id,
              parent_level_id: parent_level?.value,
              level_id: level_id,
              sub: level_id,
              branch_id: initValue,
              group_type_id,
              day_id:
                day_id ??
                getObjectByWeekday({
                  data: data?.days,
                })?.id,
              queryKeys: [
                queryKeys.admin_group_schedule_data,
                queryKeys.admin_group_schedule_page,
              ],
            },
          },
        }),
      );
    }
  };

  return useMemo(() => {
    let array: MenuInterface[] = [];
    if (data?.times)
      for (let i = 0; i < data?.times?.length; i++) {
        const time = data?.times?.[i];
        array = [
          ...array,
          {
            title: (
              <Cell opacity={1}>
                <Heading>
                  <div className="room">{ToHourMinute(time?.time)}</div>
                </Heading>
              </Cell>
            ),
            dataIndex: `time_${time?.id}`,
            render: (value, record, index) => {
              const { group, grType } = getCurrentGroup({
                related_groups,
                time,
                groupType,
                record,
              });
              return (
                <GroupCell
                  onClick={() =>
                    funcCheckPermission([COMPONENTS_VIEWS.can_create_group]) &&
                    handleCreateGroup({
                      type: group ? EGroupType.FULL : EGroupType.NOGROUP,
                      time_id: time?.id.toString(),
                      level_id: group?.level_id,
                      group_type_id: grType?.value,
                    })
                  }
                >
                  <button
                    className={`${!!group ? "potential-cell" : "noGroup"}`}
                  >
                    <Container>
                      <Left>
                        <Level>{group?.level}</Level>
                        <BottomLevel>
                          {group?.sub_level} ({grType?.label})
                        </BottomLevel>
                      </Left>
                      <NumberCount>{group?.student_count}</NumberCount>
                    </Container>
                  </button>
                </GroupCell>
              );
            },
          },
        ];
      }
    return [
      {
        title: (
          <Cell opacity={0}>
            <Heading>
              <div className="room">Room</div>
            </Heading>
          </Cell>
        ),
        dataIndex: "name",
        render: (value, record, index) => {
          return (
            <Cell opacity={0}>
              <Heading>
                <div className="room">{value}</div>
              </Heading>
            </Cell>
          );
        },
      },
      ...array,
    ];
  }, [data, day_id, groupType, level]);
};

export default PotentialColumns;
