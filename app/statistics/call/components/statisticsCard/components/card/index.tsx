import React, { FC } from "react";
import { CardWrapper } from "./style";

export interface ICard {
  today_count?: number;
  svg?: any;
  color?: string;
  label?: string;
  total_count?: number;
}

const Card: FC<ICard> = (props) => {
  return (
    <CardWrapper color={props.color}>
      <div className="img">{props.svg}</div>
      <h2 className="title">{props.label}</h2>
      <p className="count grotesk">
        {props.total_count}
        <sup className="grotesk">+{props.today_count}</sup>
      </p>
    </CardWrapper>
  );
};

export default Card;
