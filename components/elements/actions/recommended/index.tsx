import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { RecommendedSvg} from "components";

const DeleteCircle: FC<TIcon> = ({ size, onClick }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "24" : "";

  return (
    <Wrapper
      size={size}
      clicked={false}
      onClick={() => {
        onClick?.();
      }}
    >
      <RecommendedSvg width={s} height={s} />
    </Wrapper>
  );
};

export default DeleteCircle;
