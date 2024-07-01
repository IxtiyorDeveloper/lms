import React, { FC } from "react";
import { Content, Left, Right, Wrapper } from "./style";
import { IContacts } from "types/contact";
import { phoneEditor } from "utils/phoneNumberEditor";
import { colors } from "layout/header/style";
import {
  getStudentStatus,
  studentStatusIdentifier,
} from "utils/studentStatusIdentifier";
import formatPhoneNumber from "utils/phoneNumberFormatter";
import { OneStudent } from "../../../../../../../../../types/student";
import {
  studentColors,
  studentMarkColors,
} from "../../../../../../../../../constants/studentStatuses";

const StudentSearchLabel: FC<{ props: IContacts }> = ({ props }) => {
  const full_name = props?.firstname + " " + props?.lastname;
  const phones = phoneEditor(props?.phones);
  const phoneNumber = phones?.find(
    (p: any) => p.is_confirmed === 1,
  )?.phone_number;
  return (
    <Wrapper>
      <Left>
        <Content>
          <p className="name">{full_name}</p>
        </Content>
      </Left>
      <Right>
        <p className="phone">{formatPhoneNumber(phoneNumber)}</p>
        <div
          className="studying"
          style={colors[studentStatusIdentifier(props) as keyof typeof colors]}
        >
          {studentStatusIdentifier(props)}
        </div>
        {/*<div className="group">{props?.branch_name || "-"}</div>*/}
      </Right>
    </Wrapper>
  );
};

export const StudentSearchLabelForOther: FC<{ props: OneStudent }> = ({
  props,
}) => {
  const full_name =
    props?.user?.userProfile?.firstname +
    " " +
    props?.user?.userProfile?.lastname;
  const phones = props.user?.userPhones;
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
        <Content>
          <p className="name">{full_name}</p>
        </Content>
      </Left>
      <Right>
        <p className="phone">{formatPhoneNumber(phoneNumber)}</p>
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
        {/*<div className="group">{props?.branch_name || "-"}</div>*/}
      </Right>
    </Wrapper>
  );
};

export default StudentSearchLabel;
