import React from "react";
import { Wrapper, Box } from "./style";
import { IGroupCell } from "./type";
import { generateCollection } from "./components/generateCollection";
import GroupCell from "../../../scheduleTable/scheduleColumns/components/groupCell";

const CellGroups = ({
  record,
  collection,
  day_id,
  data,
  initValue,
  time,
  room_groups,
}: IGroupCell) => {
  return (
    <Wrapper>
      {room_groups?.map((item, index) => {
        const myc = generateCollection({ item, collection, room_groups });
        return (
          <Box>
            <GroupCell
              collection={myc}
              data={data}
              initValue={initValue}
              record={record}
              time={time}
              day_id={day_id}
              fromMultiple
            />
          </Box>
        );
      })}
    </Wrapper>
  );
};

export default CellGroups;
