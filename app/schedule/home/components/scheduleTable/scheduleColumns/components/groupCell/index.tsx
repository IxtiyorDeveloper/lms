import React, { useCallback, useState } from "react";
import { useGroup } from "hooks";
import { expand } from "./expand";
import { EGroupType } from "types";
import debounce from "lodash/debounce";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { Popover } from "antd";
import { HandSvg, NewSvg, NextLink } from "components";
import { Cell, Container } from "./style";
import { STATE_CLOSING, STATE_OPENING } from "constants/groupStatus";
import { useDispatch } from "react-redux";
import { toggleModal } from "store";
import { queryKeys } from "constants/queryKeys";
import { IGroupCell, ICreateGroup } from "./type";
import PopoverComponent from "../../../../popover";
import { getObjectByWeekday } from "../../../../utils";
import { identifyGroup } from "./components/identifyGroup";
import { identifyTypeWithNextMonth } from "./components/identifyWithNextMonth";

const GroupCell = ({
  record,
  collection,
  day_id,
  data,
  initValue,
  time,
  fromMultiple,
}: IGroupCell) => {
  const dispatch = useDispatch();
  const handleCreateGroup = ({
    type,
    room_id,
    time_id,
    isClosing,
  }: ICreateGroup) => {
    if (type === EGroupType.NOGROUP || isClosing) {
      setVisible(false);
      dispatch(
        toggleModal({
          key: "group",
          data: {
            open: true,
            data: {
              initial: true,
              action: "create",
              course_id: "1",
              room_id: room_id,
              time_id: time_id,
              day_id:
                day_id ??
                getObjectByWeekday({
                  data: data?.days,
                })?.id,
              branch_id: initValue,
              queryKeys: [
                queryKeys.admin_group_schedule_data,
                queryKeys.admin_group_schedule_page,
              ],
            },
          },
        })
      );
    }
  };
  const [id, setId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  const {
    data: popoverGroup,
    isLoading,
    isPreviousData,
  } = useGroup({
    id,
    expand,
  });

  const row = record;
  const day =
    day_id ??
    getObjectByWeekday({
      data: data?.days,
    })?.id;

  const room_groups = collection?.groups?.filter(
    (group) =>
      group.room_id == row?.id &&
      group.lesson_time_id?.toString() === time?.id.toString() &&
      group.lesson_day_id == day
  );

  const length = room_groups?.length || 0;

  const {
    main_group: group,
    shadow_group,
    l,
  } = identifyGroup({
    groups: room_groups,
  });

  const type = identifyTypeWithNextMonth({ group });
  const bgType = identifyTypeWithNextMonth({ group: shadow_group });

  const isActive =
    type === EGroupType.FULLPAID ||
    type === EGroupType.NOTFULL ||
    type === EGroupType.FULL;

  const handleMouseOpen = useCallback(
    debounce((id: any) => {
      if (isActive) {
        setId(id);
      }
    }, 400),
    [isActive]
  );

  const handleMouseClose = useCallback(() => {
    handleMouseOpen.cancel();
  }, []);

  const handleOpenChange = (newValue: boolean) => {
    if (isActive) {
      setVisible(newValue);
    }
  };

  return (
    <Cell
      onMouseMove={() => handleMouseOpen(group?.id)}
      onMouseLeave={handleMouseClose}
      onClick={() =>
        funcCheckPermission([COMPONENTS_VIEWS.can_create_group]) &&
        handleCreateGroup({
          type: type,
          room_id: row?.id.toString(),
          time_id: time?.id.toString(),
          branch_id: group?.room?.branch?.id,
        })
      }
    >
      <Popover
        destroyTooltipOnHide
        content={PopoverComponent({
          isLoading,
          isPreviousData,
          group: popoverGroup,
          record,
          collection,
          day_id,
          data,
          initValue,
          time,
          room_groups,
          handleCreateGroup,
          l,
          row,
          fromMultiple,
        })}
        mouseEnterDelay={0.4}
        onOpenChange={handleOpenChange}
        title=""
        open={visible}
        trigger="hover"
        placement="bottomRight"
        overlayStyle={{
          width: l > 1 ? "fit-content" : "590px",
        }}
      >
        {length > 1 && <div className={`bg ${bgType}`}></div>}
        <button className={`${type}`}>
          <NextLink href={`groups/${group?.id}`} disabled={!group}>
            <Container>
              <p>{group?.name}</p>
            </Container>
            {group?.state.toString() == STATE_OPENING.toString() && (
              <div className="new">
                <NewSvg width={25} height={25} />
              </div>
            )}
            {group?.state.toString() == STATE_CLOSING.toString() && (
              <div className="hand">
                <HandSvg />
              </div>
            )}
          </NextLink>
        </button>
      </Popover>
    </Cell>
  );
};

export default GroupCell;
