import React, { FC } from "react";
import { Data, ItemWrapper, Name } from "./style";

interface IProps {
  text: string;
  data?: string | number | null | React.ReactElement;
  styles?: React.CSSProperties;
}

const Item: FC<IProps> = (props) => {
  const { text, data, styles } = props;

  return (
    <ItemWrapper style={styles}>
      <Name>{text}</Name>
      <Data>{data || "-"}</Data>
    </ItemWrapper>
  );
};

export default Item;
