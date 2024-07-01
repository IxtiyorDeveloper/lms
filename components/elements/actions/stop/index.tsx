import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { StopSvg } from "components/index";

const Stop: FC<TIcon> = ({ size, onClick }) => {
  const s = size === "small" ? " 16" : size === "medium" ? "22" : "";
  return (
    <Wrapper onClick={onClick} size={size}>
      <div className="svg-wrapper">
        <StopSvg width={s} height={s} />
      </div>
    </Wrapper>
  );
};

export default Stop;
