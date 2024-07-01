import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { TransferSvg } from "components/index";

const Transfer: FC<TIcon> = ({ size, onClick }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "24" : "";
  return (
    <Wrapper size={size} onClick={onClick}>
      <TransferSvg width={s} height={s} />
    </Wrapper>
  );
};

export default Transfer;
