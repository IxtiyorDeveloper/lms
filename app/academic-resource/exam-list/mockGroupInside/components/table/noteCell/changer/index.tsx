import React from "react";
import { Content, Left, Right, Top, Wrapper } from "./style";
import { IExamProcess } from "types/exam/exam";
import moment from "moment";
import { DATE_FORMAT_DD_MMM_HH_mm } from "constants/dates";

const Changer = ({ record }: { record: { process: IExamProcess } }) => {
  const fullName = record?.process?.changeComment?.responsible
    ? record?.process?.changeComment?.responsible?.userProfile?.firstname +
      " " +
      record?.process?.changeComment?.responsible?.userProfile?.lastname
    : "-";
  const note = record?.process?.changeComment?.description;

  const date = moment(record?.process?.changeComment?.created_at).format(
    DATE_FORMAT_DD_MMM_HH_mm,
  );

  return (
    <Wrapper>
      <Top>
        <Left>{fullName}</Left>
        <Right>{date}</Right>
      </Top>
      <Content>{note}</Content>
    </Wrapper>
  );
};

export default Changer;
