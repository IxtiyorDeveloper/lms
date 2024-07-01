import React, { FC } from "react";
import { CardWrapper } from "./style";
import { SendSms, AutoSms, ManualSms } from "components";
import { ISMSToday } from "types/statistics/sms";

export interface ICard {
  total?: any;
  today?: any;
  color?: string;
  todayCount?: ISMSToday[];
}

const Card: FC<ICard> = (props) => {
  const svgS = {
    primary: <SendSms />,
    orange: <AutoSms />,
    deep: <ManualSms />,
  };

  return (
    <CardWrapper color={props.color}>
      <div className="img">{svgS[props.color as keyof typeof svgS]}</div>
      <h2 className="title">{props.today.label} sms</h2>
      <p className="count grotesk">
        {props.total.count}&nbsp;
        <sup className="grotesk">+{props.today.count}</sup>
      </p>
    </CardWrapper>
  );
};

export default Card;
