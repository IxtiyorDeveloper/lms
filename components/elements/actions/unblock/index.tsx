import React, { FC } from "react";
import { TIcon } from "types";
import { BlockSvg } from "components/index";
import { Wrapper } from "./style";

const UnBlock: FC<TIcon> = ({ size, onClick }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "22" : "";
  return (
    <Wrapper size={size} onClick={onClick}>
      <BlockSvg width={s} height={s} />
    </Wrapper>
  );
};

export default UnBlock;
