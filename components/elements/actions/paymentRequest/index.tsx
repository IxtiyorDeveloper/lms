import React, { FC } from "react";
import { TIcon } from "types";
import { Wrapper } from "./style";
import { PaymentRequestSvg } from "components";
import { bgColors } from "styles/theme";

const PaymentRequest: FC<TIcon> = ({ size, onClick }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "22" : "";
  return (
    <Wrapper size={size} onClick={onClick}>
      <PaymentRequestSvg width={s} height={s} color={bgColors.pop} />
    </Wrapper>
  );
};

export default PaymentRequest;
