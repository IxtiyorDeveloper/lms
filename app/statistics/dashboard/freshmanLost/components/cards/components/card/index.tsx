import React, { FC } from "react";
import { CardWrapper } from "./style";
import {
  CircleDollarSvg,
  StudentCheckedSvg,
  StudentMinusSvg,
  ThroughSvg,
} from "components";
import { bgColors } from "styles/theme";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { IColor } from "./type";

const Card: FC<{
  color: IColor;
  balance: string;
  href: string;
  count: string;
  onClick?: () => void;
}> = ({ color, balance = "0", count = "0", onClick, href }) => {
  const icon = {
    midori: <StudentCheckedSvg />,
    pop: <StudentMinusSvg />,
    dark: <CircleDollarSvg height={80} width={80} color={bgColors.white} />,
  };

  const titles = {
    midori: "Freshman",
    pop: "Lost",
    dark: "Difference",
  };

  return (
    <CardWrapper href={href} color={color} onClick={() => onClick?.()}>
      <div className="main-part">
        <h2 className="card-title">{titles[color]}</h2>
        <div className="main-num">
          <p className="main-number grotesk"> {count}</p>
          {color !== "dark" ? (
            <ThroughSvg color={bgColors.transparentGreen} />
          ) : (
            ""
          )}
        </div>
        <div className="footer">
          <p className="text">Group balance</p>
          <p className="footer-number grotesk">{toCurrencyFormat(+balance)}</p>
        </div>
      </div>
      <div className="icon-part">{icon[color]}</div>
    </CardWrapper>
  );
};

export default Card;
