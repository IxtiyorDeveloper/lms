import { TIcon } from "types";
import { bgColors } from "styles/theme";
import React, { useEffect, useState } from "react";
import { Wrapper } from "./style";
import { RepositionSvg } from "@jasurbekyuldashov/lms-web-icons";

const RepositionAction = ({ size, setClicked, clicked, onClick }: TIcon) => {
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
      <RepositionSvg color={bgColors.deep} width={s} height={s} />
    </Wrapper>
  );
};

export default RepositionAction;
