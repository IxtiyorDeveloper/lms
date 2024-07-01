import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { StaffSmsSvg } from "@jasurbekyuldashov/lms-web-icons";

const StaffSmsSend: FC<TIcon> = ({ size, clicked, onClick }) => {
  const s = size === "small" ? " 19.37" : size === "medium" ? "24" : "";

  return (
    <Wrapper
      size={size}
      clicked={!!clicked}
      onClick={() => !!onClick && onClick()}
    >
      <StaffSmsSvg width={s} height={s} />
    </Wrapper>
  );
};

export default StaffSmsSend;
