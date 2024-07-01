import React, { FC, useEffect, useState } from "react";
import { TIcon } from "types";
import { Wrapper } from "./style";
import { TransferSvg } from "@jasurbekyuldashov/lms-web-icons";

const ApproveRewardAction: FC<TIcon> = ({
  size,
  setClicked,
  clicked,
  onClick,
}) => {
  const s = size === "small" ? "30" : size === "medium" ? "20" : "20";
  const [isPressed, setIsPressed] = useState(false);

  useEffect(
    () => setClicked?.({ ...clicked, deleteCircle: isPressed }),
    [isPressed]
  );

  return (
    <Wrapper
      size={size}
      clicked={false}
      onClick={() => {
        setIsPressed(!isPressed);
        onClick?.();
      }}
    >
      <TransferSvg width={18} height={18} />
    </Wrapper>
  );
};

export default ApproveRewardAction;
