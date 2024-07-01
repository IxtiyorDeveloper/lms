import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { LittleMailSvg } from "components/index";
import { bgColors } from "styles/theme";

const Call: FC<TIcon> = ({ size, clicked, onClick }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "24" : "";

  return (
    <Wrapper
      size={size}
      clicked={!!clicked}
      onClick={() => !!onClick && onClick()}
    >
      <LittleMailSvg width={s} height={s} color={bgColors.primary} />
    </Wrapper>
  );
};

export default Call;
