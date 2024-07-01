import React, { FC, useEffect, useState } from "react";
import { TIcon } from "types";
import { CircleSuccessSvg } from "components/index";
import { Wrapper } from "./style";

const ApproveAction: FC<TIcon> = ({ size, setClicked, clicked, onClick }) => {
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
      }}>
      <CircleSuccessSvg width={s} height={s} />
    </Wrapper>
  );
};

export default ApproveAction;
