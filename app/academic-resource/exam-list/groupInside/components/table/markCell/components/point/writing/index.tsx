import React from "react";
import { Label, Name, Wrapper } from "./style";
import { IExamProcess } from "types/exam/exam";

const Writing = ({ record }: { record: { process: IExamProcess } }) => {
  const fullName = record?.process?.needCheckEssay?.responsible?.userProfile
    ? record?.process?.needCheckEssay?.responsible?.userProfile?.firstname +
      " " +
      record?.process?.needCheckEssay?.responsible?.userProfile?.lastname
    : "-";
  return (
    <Wrapper>
      <Label>Checking teacher</Label>
      <Name>{fullName}</Name>
    </Wrapper>
  );
};

export default Writing;
