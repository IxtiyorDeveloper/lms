import React from "react";
import { SubLevel, Title, Wrapper, Row, Line } from "./style";
import { IGroup } from "types";
import { ToHourMinute } from "../../../../../../../../../../../../../../../../../../../../../utils/toHourMinute";

const LevelInfo = ({
  level,
  sub_level,
  item,
  selects,
}: {
  level?: string;
  sub_level?: string;
  item: IGroup;
  selects: any;
}) => {
  const time = item?.time;

  const day = selects?.day?.find(
    (f: { value: string }) => f.value == item.lesson_day_id,
  )?.label;

  return (
    <Wrapper>
      <Row>
        <Title>{level}</Title>
        <SubLevel>{sub_level}</SubLevel>
      </Row>
      <Line />
      <Row>
        <Title>{ToHourMinute(time)}</Title>
        <SubLevel>{day}</SubLevel>
      </Row>
    </Wrapper>
  );
};

export default LevelInfo;
