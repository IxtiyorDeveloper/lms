import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { UnBlockSvg } from "components/index";

const Block: FC<TIcon> = ({ size, onClick }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "22" : "";
  return (
    <Wrapper size={size} onClick={onClick}>
      <UnBlockSvg width={s} height={s} />
    </Wrapper>
  );
};

export default Block;
