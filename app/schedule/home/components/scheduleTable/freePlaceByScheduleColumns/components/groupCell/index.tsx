import React, { useCallback, useState } from "react";
import { useGroup } from "hooks";
import { expand } from "./expand";
import { EGroupType } from "types";
import debounce from "lodash/debounce";
import { Badge, Cell, Container, Content, Heading, Name } from "./style";
import { Popover } from "antd";
import { HandSvg, NewSvg, NextLink } from "components";
import { STATE_CLOSING, STATE_OPENING } from "constants/groupStatus";
import { IGroupCell } from "./type";
import { identifyTypeWithNextMonth } from "./components/identifyWithNextMonth";
import PopoverComponent from "../../../../popover";
import { calculateFreePlace } from "./components/calculateFreePlace";

const GroupCell = ({
  record,
  collection,
  time,
  day,
  index,
  freePlaceSum,
}: IGroupCell) => {
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

  const group = collection?.groups?.find(
    (group) =>
      group.room_id == row?.id &&
      group.lesson_time_id?.toString() === time?.id.toString() &&
      group.lesson_day_id == day,
  );

  const type = identifyTypeWithNextMonth({ group });

  const isActive = type === EGroupType.NOTFULL;
  const hasGroup =
    type === EGroupType.NOTFULL ||
    type === EGroupType.FULLPAID ||
    type === EGroupType.FULL;

  const handleMouseOpen = useCallback(
    debounce((id: any) => {
      if (hasGroup) {
        setId(id);
      }
    }, 400),
    [hasGroup],
  );

  const handleMouseClose = useCallback(() => {
    handleMouseOpen.cancel();
  }, []);
  const handleOpenChange = (newValue: boolean) => {
    if (hasGroup) {
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
      <Cell
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
          title=""
          mouseEnterDelay={0.4}
          open={visible}
          onOpenChange={handleOpenChange}
          trigger="hover"
          placement="bottomRight"
          overlayStyle={{
            width: "590px",
          }}
        >
          <button className={`${type} ${isActive ? "visible" : "black-type"}`}>
            <NextLink href={`groups/${group?.id}`} disabled={!hasGroup}>
              <Container>
                <Content>
                  <Name className="group_name"> {group?.name}</Name>
                  <Name className="subLevel">
                    <p className="parentLevel">{group?.level?.parent?.name}</p>
                    <p className="slash">/</p>
                    <p className="level">{group?.level?.name}</p>
                  </Name>
                </Content>
                {isActive && <Badge>{freePlace}</Badge>}
              </Container>
              {group?.state.toString() == STATE_OPENING.toString() && (
                <div className="new">
                  <NewSvg width={20} height={20} />
                </div>
              )}
              {group?.state.toString() == STATE_CLOSING.toString() && (
                <div className="hand">
                  <HandSvg width={16} height={16} />
                </div>
              )}
            </NextLink>
          </button>
        </Popover>
      </Cell>
    );
};

export default GroupCell;
