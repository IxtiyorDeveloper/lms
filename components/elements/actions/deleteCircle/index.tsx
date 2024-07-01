import React, { FC, useEffect, useState } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { DeleteSvg } from "components/index";

const DeleteCircle: FC<TIcon> = ({ size, setClicked, clicked, onClick }) => {
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
      <DeleteSvg width={s} height={s} />
    </Wrapper>
  );
};

export default DeleteCircle;
