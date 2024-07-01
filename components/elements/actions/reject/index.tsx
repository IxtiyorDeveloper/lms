import { TIcon } from "types";
import { bgColors } from "styles/theme";
import { CanNotAddSvg } from "components";
import React, { useEffect, useState } from "react";
import { Wrapper } from "./style";

const RejectAction = ({ size, setClicked, clicked, onClick }: TIcon) => {
  const s = size === "small" ? " 14" : size === "medium" ? "30" : "14";
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
      <CanNotAddSvg color={bgColors.pop} width={s} height={s} />
    </Wrapper>
  );
};

export default RejectAction;
