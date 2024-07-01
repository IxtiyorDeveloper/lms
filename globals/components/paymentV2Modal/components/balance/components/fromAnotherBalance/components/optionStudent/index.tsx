import React, { FC } from "react";
import { Content, Left, Right, Wrapper } from "./style";
import { colors } from "layout/header/style";
import {
  getStudentStatus,
  studentStatusIdentifier,
} from "utils/studentStatusIdentifier";
import formatPhoneNumber from "utils/phoneNumberFormatter";
import { CircleImage } from "components";
import { OneStudent } from "types/student";
import { studentColors } from "../../../../../../../../../constants/studentStatuses";

const StudentSearchLabelForOther: FC<{ props: OneStudent }> = ({ props }) => {
  const full_name =
    props?.user?.userProfile?.firstname +
    " " +
    props?.user?.userProfile?.lastname;
  const phones = props?.user?.userPhones;
  const phoneNumber =
    phones?.find((p: any) => p.is_confirmed === 1)?.phone_number || "";
  const status =
    studentColors[
      getStudentStatus({
        user: props,
      }) as keyof typeof studentColors
    ];
  return (
    <Wrapper>
      <Left>
        <CircleImage src={props?.user?.userProfile?.avatar} />
        <Content>
          <p className="name">{full_name}</p>
          <p className="phone">{formatPhoneNumber(phoneNumber)}</p>
        </Content>
      </Left>
      <Right>
        <div
          className="studying"
          style={
            status
              ? {
                  backgroundColor: status.backgroundColor,
                  color: status.color,
                }
              : {}
          }
        >
          {status?.content}
        </div>
        <div className="group">{props?.branch?.name || "-"}</div>
      </Right>
    </Wrapper>
  );
};

export default StudentSearchLabelForOther;
