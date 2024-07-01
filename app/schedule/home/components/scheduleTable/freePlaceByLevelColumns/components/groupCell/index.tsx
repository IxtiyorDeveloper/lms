import React from "react";
import { freePlaceGroupFilter } from "./components/freePlaceGroupFilter";
import { Cell, Heading, LevelCell, LevelCellWrapper } from "./style";
import Router from "next/router";
import { IGroupCell } from "./type";
import RenderedItem from "./components/renderedItem";
import { checkNoGroup } from "./components/checkNoGroup";

const GroupCell = ({
  collection,
  isAllDays,
  record,
  day,
  time,
  freePlaceSum,
  index,
}: IGroupCell) => {
  const groups = freePlaceGroupFilter({
    collection,
    isAllDays,
    record,
    day,
    time,
  });
  const noGroup = checkNoGroup({ groups });
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
      <LevelCellWrapper>
        {!!groups?.length && (
          <LevelCell noFreePlace={noGroup && Router.query?.freePlace !== "0"}>
            {groups?.map((item, index) => {
              return <RenderedItem item={item} index={index} />;
            })}
          </LevelCell>
        )}
      </LevelCellWrapper>
    );
};

export default GroupCell;
