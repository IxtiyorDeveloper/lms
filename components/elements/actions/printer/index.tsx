import React, { FC } from "react";
import { Wrapper } from "./style";
import { PrintSvg } from "components/index";
import { TIcon } from "types";

const Print: FC<TIcon> = ({ size, onClick, borderColor }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "22" : "";
  return (
    <Wrapper borderColor={borderColor!} onClick={onClick} size={size}>
      <PrintSvg width={s} height={s} />
    </Wrapper>
  );
};

export default Print;
