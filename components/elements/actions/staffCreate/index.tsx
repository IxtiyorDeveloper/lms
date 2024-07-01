import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { StaffCreateSvg } from "@jasurbekyuldashov/lms-web-icons";
import { toast } from "react-toastify";

const StaffCreateAction: FC<TIcon> = ({ size, onClick, disabled }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "24" : "";

  return (
    <Wrapper
      size={size}
      clicked={false}
      onClick={() => {
        if (disabled) {
          toast.warning("You should fill all info.");
          return false;
        } else {
          onClick?.();
        }
      }}
    >
      <StaffCreateSvg width={s} height={s} />
    </Wrapper>
  );
};

export default StaffCreateAction;
