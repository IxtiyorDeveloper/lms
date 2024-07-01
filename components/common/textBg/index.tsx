import React, { CSSProperties, FC } from "react";
import { Wrapper } from "./style";

interface ITextBg {
  text: string | number;
  style?: CSSProperties;
}

const TextBg: FC<ITextBg> = ({ text, style }) => {
  return <Wrapper style={style}>{text}</Wrapper>;
};

export default TextBg;
