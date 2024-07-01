import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { ReturnStudentSvg } from "components";
import { bgColors } from "styles/theme";

const ReturnStudent: FC<TIcon> = ({ size, onClick }) => {
  const s = size === "small" ? "20" : size === "medium" ? "22" : "";
  return (
    <Wrapper size={size} onClick={onClick} >
      <ReturnStudentSvg width={s} height={s} color={bgColors.primary}/>
    </Wrapper>
  );
};

export default ReturnStudent;
