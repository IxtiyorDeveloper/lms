import React from "react";
import {
  Wrapper,
  Top,
  Title,
  Rows,
  Row,
  Left,
  Details,
  Name,
  GroupName,
  Right,
} from "./style";
import { AntdBadge, CircleImage } from "components";
import { Type } from "./type";

const TimeTableContent = ({ record }: Type) => {
  const l = record?.details?.students?.length;
  const students = record?.details?.students;

  return (
    <Wrapper>
      <Top>
        <Title>Students on this timetable</Title>
        <AntdBadge content={l} showZero />
      </Top>
      <Rows>
        {students?.map((item, index) => {
          const fullName = item?.student?.userProfile?.fullName;
          const groupName = item?.group_name;
          const teacherName = item?.teacher_name;
          const avatar = item?.student?.userProfile?.avatar;
          return (
            <Row key={index}>
              <Left>
                <CircleImage src={avatar} />
                <Details>
                  <Name>{fullName}</Name>
                  <GroupName>{groupName}</GroupName>
                </Details>
              </Left>
              <Right>
                <p>{teacherName}</p>
              </Right>
            </Row>
          );
        })}
      </Rows>
    </Wrapper>
  );
};

export default TimeTableContent;
