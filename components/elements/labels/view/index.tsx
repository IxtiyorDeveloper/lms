import React, { FC } from "react";
import { Wrapper, Container } from "./style";
import { TIcon } from "types";
import { EyeViewSvg } from "components";

const ComingCircle: FC<TIcon> = ({ size, defaultValue, isOpen, onClick }) => {
  const s = size === "small" ? "22" : "30.01";

  return (
    <Container>
      <Wrapper
        onClick={() => onClick && onClick()}
        clicked={isOpen}
        size={size}
      >
        <EyeViewSvg width={s} height={s} />
      </Wrapper>
    </Container>
  );
};

export default ComingCircle;
ComingCircle.defaultProps = {
  size: "small",
};
