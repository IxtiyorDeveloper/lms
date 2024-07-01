import React, { FC, useEffect, useState } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { BackToWaitingSvg } from "components/index";

const EditAction: FC<TIcon> = ({ size, setClicked, clicked, onClick }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "24" : "";
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
      <BackToWaitingSvg width={s} height={s} />
    </Wrapper>
  );
};

export default EditAction;
