import { TIcon } from "types";
import { bgColors } from "styles/theme";
import React, { useEffect, useState } from "react";
import { Wrapper } from "./style";
import { SquareXSvg } from "@jasurbekyuldashov/lms-web-icons";

const DismissAction = ({ size, setClicked, clicked, onClick }: TIcon) => {
  const s = size === "small" ? " 20" : size === "medium" ? "30" : "14";
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
      <SquareXSvg color={bgColors.pop} width={s} height={s} />
    </Wrapper>
  );
};

export default DismissAction;
