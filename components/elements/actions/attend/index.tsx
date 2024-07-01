import React, { FC } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { AttendSvg, ColoredAttendSvg } from "components/index";

interface IProps extends TIcon {
  value?: boolean;
}
const CircleIcon: FC<IProps> = ({ size, onClick, value }) => {
  const s = size === "small" ? " 17.37" : size === "medium" ? "22" : "";
  return (
    <Wrapper
      onClick={() => {
        // setClicked(!clicked)
        onClick?.();
      }}
      clicked={!!value}
      size={size}
    >
      {!!value ? (
        <ColoredAttendSvg width={s} height={s} />
      ) : (
        <AttendSvg width={s} height={s} />
      )}
    </Wrapper>
  );
};

export default CircleIcon;
