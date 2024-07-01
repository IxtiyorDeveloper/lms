import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { ResumeShareSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";

const ShareFileSvg: FC<TIcon> = ({ size, onClick, isFilled }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "24" : "";

  return (
    <Wrapper
      size={size}
      clicked={false}
      isFilled={isFilled}
      onClick={() => {
        onClick?.();
      }}>
      <ResumeShareSvg
        width={s}
        height={s}
        color={isFilled ? bgColors.kenyan : bgColors.primary}
      />
    </Wrapper>
  );
};

export default ShareFileSvg;
