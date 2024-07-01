import React, { FC } from "react";
import { Container } from "./style";
import CellGroups from "./components/cellGroups";
import { IPopover } from "./type";
import HoverDetails from "./components/details";

const PopoverComponent: FC<IPopover> = ({
  isLoading,
  isPreviousData,
  group,
  record,
  collection,
  day_id,
  data,
  initValue,
  time,
  l = 0,
  room_groups,
  handleCreateGroup,
  row,
  fromMultiple,
}) => {
  return (
    <Container>
      {l > 1 ? (
        <CellGroups
          collection={collection}
          data={data}
          initValue={initValue}
          record={record}
          time={time}
          room_groups={room_groups}
          day_id={day_id}
        />
      ) : (
        <HoverDetails
          isLoading={isLoading}
          isPreviousData={isPreviousData}
          group={group}
          handleCreateGroup={handleCreateGroup}
          row={row}
          room_groups={room_groups}
          fromMultiple={fromMultiple}
        />
      )}
    </Container>
  );
};

export default PopoverComponent;
