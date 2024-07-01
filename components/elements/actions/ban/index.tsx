import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { BanUserSvg } from "components/index";
import { bgColors } from "styles/theme";

const Ban: FC<TIcon> = ({ size, onClick }) => {
  const s = size === "small" ? " 16" : size === "medium" ? "22" : "";
  return (
    <Wrapper onClick={onClick} size={size}>
      <div className="svg-wrapper">
        <BanUserSvg color={bgColors.brilliance} width={s} height={s} />
      </div>
    </Wrapper>
  );
};

export default Ban;
