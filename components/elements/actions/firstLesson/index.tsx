import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { FirstLessonSvg } from "components";

const FirstLessonAction: FC<TIcon> = ({ size, clicked, onClick }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "24" : "";

  return (
    <Wrapper
      size={size}
      clicked={!!clicked}
      onClick={() => {
        onClick?.();
      }}
    >
      <FirstLessonSvg width={s} height={s} />
    </Wrapper>
  );
};

export default FirstLessonAction;
