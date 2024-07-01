import React, { FC } from "react";
import { TIcon } from "types";
import { EyeFillSvg } from "components";
import { bgColors } from "styles/theme";
import { Wrapper } from "./style";

const View: FC<TIcon> = ({ size, clicked, onClick }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "24" : "";

  return (
    <Wrapper
      size={size}
      clicked={!!clicked}
      onClick={() => !!onClick && onClick()}
    >
      <EyeFillSvg width={s} height={s} color={bgColors.sceptreBlue} />
    </Wrapper>
  );
};

export default View;
