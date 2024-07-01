import React from "react";
import { DText, Text, Wrapper } from "./style";
import { EPaidGroupType } from "types";
import moment from "moment";

const Content = ({ type, date }: { type: EPaidGroupType; date: string }) => {
  const text =
    type == EPaidGroupType.LATE_OPENED ? "Late opening" : "Early closing";
  const formattedDate = moment(date).format("DD MMM YYYY");
  return (
    <Wrapper>
      <Text>{text}</Text>
      <DText>{formattedDate}</DText>
    </Wrapper>
  );
};

export default Content;
