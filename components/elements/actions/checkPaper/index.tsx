import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { CheckPaperSvg } from "components/index";

const CheckPaperAction: FC<TIcon> = ({ size, clicked, onClick }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "24" : "";

  return (
    <Wrapper
      size={size}
      clicked={!!clicked}
      onClick={() => {
        onClick?.();
      }}
    >
      <CheckPaperSvg width={s} height={s} />
    </Wrapper>
  );
};

export default CheckPaperAction;
