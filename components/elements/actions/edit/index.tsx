import React, { FC, useEffect, useState } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { EditSvg } from "components/index";

const EditAction: FC<TIcon> = ({ size, setClicked, clicked, onClick }) => {
  const s = size === "small" ? " 14" : size === "medium" ? "20" : "14";
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
      <EditSvg width={s} height={s} />
    </Wrapper>
  );
};

export default EditAction;
