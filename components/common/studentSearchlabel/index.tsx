import React, { FC } from "react";
import { Content, Left, Right, Wrapper } from "./style";
import { IContacts } from "types/contact";
import CircleImage from "../circleImage";
import { phoneEditor } from "utils/phoneNumberEditor";
import { colors } from "layout/header/style";
import { studentStatusIdentifier } from "utils/studentStatusIdentifier";
import formatPhoneNumber from "utils/phoneNumberFormatter";

const StudentSearchLabel: FC<{ props: IContacts }> = ({ props }) => {
  const full_name = props?.firstname + " " + props?.lastname;
  const phones = phoneEditor(props?.phones);
  const phoneNumber = phones?.find(
    (p: any) => p.is_confirmed === 1
  )?.phone_number;
  return (
    <Wrapper>
      <Left>
        <CircleImage src={{ full_url: props?.avatar_url }} />
        <Content>
          <p className="name">{full_name}</p>
          <p className="phone">{formatPhoneNumber(phoneNumber)}</p>
        </Content>
      </Left>
      <Right>
        <div
          className="studying"
          style={colors[studentStatusIdentifier(props) as keyof typeof colors]}
        >
          {studentStatusIdentifier(props)}
        </div>
        <div className="group">{props?.branch_name || "-"}</div>
      </Right>
    </Wrapper>
  );
};

export default StudentSearchLabel;
