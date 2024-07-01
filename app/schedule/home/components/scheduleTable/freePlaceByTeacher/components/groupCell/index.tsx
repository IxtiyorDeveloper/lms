import React, { useCallback, useState } from "react";
import { useGroup } from "hooks";
import { expand } from "./expand";
import { GROUP_MENTOR_100 } from "constants/groupMentors";
import { EGroupType } from "types";
import debounce from "lodash/debounce";
import { Cell, Heading, Name, TeacherCell, TeacherContainer } from "./style";
import { Popover } from "antd";
import { HandSvg, NewSvg, NextLink } from "components";
import { STATE_CLOSING, STATE_OPENING } from "constants/groupStatus";
import { IGroupCell } from "./type";
import PopoverComponent from "../../../../popover";
import { identifyTypeWithNextMonth } from "./components/identifyWithNextMonth";
import { calculateFreePlace } from "./components/calculateFreePlace";

const GroupCell = ({
  collection,
  time,
  day,
  freePlaceSum,
  record,
  index,
}: IGroupCell) => {
  const [id, setId] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const {
    data: popoverGroup,
    isLoading,
    isPreviousData,
  } = useGroup({
    id: id,
    expand,
  });
  const row = record;
  const group = collection?.groups?.find(
    (group) =>
      group.groupMentors
        ?.find(
          (mentor) => mentor.type.toString() == GROUP_MENTOR_100.toString(),
        )
        ?.user_id.toString() == row?.user_id &&
      group.lesson_time_id?.toString() === time?.id.toString() &&
      group.lesson_day_id == day,
  );

  const type = identifyTypeWithNextMonth({ group });

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
    [isActive],
  );

  const handleMouseClose = useCallback(() => {
    handleMouseOpen.cancel();
  }, []);
  const handleOpenChange = (newValue: boolean) => {
    if (isActive) {
      setVisible(newValue);
    }
  };
  const { freePlace } = calculateFreePlace({ group });
  if (index == 0)
    return (
      <Cell>
        <Heading className="primary">
          <div className="room">{freePlaceSum}</div>
        </Heading>
      </Cell>
    );
  else
    return (
      <TeacherCell
        onMouseMove={() => handleMouseOpen(group?.id)}
        onMouseLeave={handleMouseClose}
      >
        <Popover
          destroyTooltipOnHide
          content={PopoverComponent({
            isLoading,
            isPreviousData,
            group: popoverGroup,
          })}
          mouseEnterDelay={0.4}
          onOpenChange={handleOpenChange}
          title=""
          open={visible}
          trigger="hover"
          placement="bottomRight"
          overlayStyle={{
            width: "590px",
          }}
        >
          <button className={`${type}`}>
            <NextLink href={`groups/${group?.id}`} disabled={!isActive}>
              <TeacherContainer free_place={!!freePlace}>
                {!!freePlace && <div className="abs">{freePlace}</div>}
                <Name>{group?.name}</Name>
                <Name>{`${group?.level?.parent.name} / ${group?.level?.name}`}</Name>
                {group?.state.toString() == STATE_OPENING.toString() && (
                  <div className="new">
                    <NewSvg width={24} height={24} />
                  </div>
                )}
                {group?.state.toString() == STATE_CLOSING.toString() && (
                  <div className="hand">
                    <HandSvg width={16} height={16} />
                  </div>
                )}
              </TeacherContainer>
            </NextLink>
          </button>
        </Popover>
      </TeacherCell>
    );
};

export default GroupCell;
