import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { TransferBackSvg } from "components/index";

const Stop: FC<TIcon> = ({ size, onClick }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "22" : "";
  return (
    <Wrapper size={size} onClick={onClick}>
      <TransferBackSvg width={s} height={s} />
    </Wrapper>
  );
};

export default Stop;
