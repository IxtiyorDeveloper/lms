import React, {CSSProperties, FC} from "react";
import { StyledMarkCell } from "./style";

interface IProps {
  color: string;
  style?:CSSProperties
}
const MarkCell: FC<IProps> = ({ color,style }) => {
  return (
    <div style={{ width: "3px",height:"100%" }}>
      <StyledMarkCell color={color}  style={style}/>
    </div>
  );
};

export default MarkCell;
