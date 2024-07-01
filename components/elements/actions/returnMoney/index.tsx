import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { ReturnMoneySvg } from "components/index";

interface IProps extends TIcon {
  value?: boolean;
}
const ReturnMoney: FC<IProps> = ({ size, onClick }) => {
  const s = size === "small" ? "18" : size === "medium" ? "22" : "";
  return (
    <Wrapper
      onClick={() => {
        onClick?.();
      }}
      size={size}
      clicked={false}
    >
      <ReturnMoneySvg width={s} height={s} />
    </Wrapper>
  );
};

export default ReturnMoney;
