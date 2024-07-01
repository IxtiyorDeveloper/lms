import React from "react";
import { Wrapper } from "./style";
import ReactInputVerificationCode from "./smsInput";
import { Label } from "../input/style";

type a = {
  onCompleted: any;
  onChange?: any;
  length?: number;
  label?: string;
};

const SmsCheck = ({ onCompleted, onChange, length = 4, label }: a) => {
  return (
    <Wrapper>
      <Label children={label} />
      <ReactInputVerificationCode
        onChange={onChange}
        autoFocus
        length={length}
        placeholder="-"
        onCompleted={onCompleted}
      />
    </Wrapper>
  );
};

export default SmsCheck;
