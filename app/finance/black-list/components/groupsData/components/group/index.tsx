import React, { FC } from "react";
import { GroupWrapper } from "./style";
import { CalendarESvg, CircleImage, ClockSvg, RoomSvg } from "components";
import { bgColors } from "styles/theme";

const Group: FC<{ group?: any }> = ({ group }) => {
  return (
    <GroupWrapper>
      <p className="title">{group.name}</p>
      <ul className="details">
        <li>
          <RoomSvg color={bgColors.yourShadow} /> {group.room}
        </li>
        <li>
          <ClockSvg color={bgColors.yourShadow} /> {group.time.slice(0, 5)}
        </li>
        <li>
          <CalendarESvg color={bgColors.yourShadow} /> {group.day}
        </li>
      </ul>
      <ul className="students">
        {group?.contacts?.map((student: any, index: number) => {
          return (
            <li key={student.user_id}>
              <span className="index">{index + 1}</span>
              <CircleImage src={student?.avatar} />
              <span className="student-name">{student.full_name}</span>
            </li>
          );
        })}
      </ul>
    </GroupWrapper>
  );
};

export default Group;
