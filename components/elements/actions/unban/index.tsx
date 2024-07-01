import React, { FC } from "react";
import { TIcon } from "types";
import { Wrapper } from "./style";
import { UnbanSvg } from "components";

const Unban: FC<TIcon> = ({ size, onClick }) => {
  return (
    <Wrapper size={size} onClick={onClick}>
      <UnbanSvg width={12} height={18} />
    </Wrapper>
  );
};

export default Unban;
