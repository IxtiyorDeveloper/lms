import React, { FC } from "react";
import { Wrapper, Container } from "./style";
import { TIcon } from "types";
import { ChangeTeacherSvg } from "components/index";

const TeacherChange: FC<TIcon> = ({
  size = "small",
  isOpen,
  onClick,
  defaultValue,
}) => {
  const s = size === "small" ? "22" : "30.01";

  return (
    <Container>
      <Wrapper
        onClick={() => onClick && onClick()}
        clicked={isOpen}
        size={size}
      >
        <ChangeTeacherSvg width={s} height={s} />
      </Wrapper>
    </Container>
  );
};

export default TeacherChange;
