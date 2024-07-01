import React, { FC } from "react";
import { ThroughSvg } from "components";
import { bgColors, textColors } from "styles/theme";

interface IProps {
  freshmanToday?: string;
  freshmanMonth?: string;
  lostToday?: string;
  lostMonth?: string;
}
const FreshmanCard: FC<IProps> = ({
  freshmanToday,
  freshmanMonth,
  lostToday,
  lostMonth,
}) => {
  const res = +(freshmanMonth || 0) - +(lostMonth || 0);
  return (
    <>
      <div className="head-card" style={{ color: textColors.sceptreBlue }}>
        <p className="title-card text-dark">Freshman & Lost</p>
        <ThroughSvg color={bgColors.sceptreBlue} />
      </div>
      <div className="foot-card waiting bars">
        <div className="bar">
          <div className="bar-percent">
            <p className="grotesk number">
              +{freshmanMonth} <sup>+{freshmanToday}</sup>
            </p>
          </div>
        </div>
        <div className="bar">
          <div className="bar-percent">
            <p className="grotesk number">
              +{lostMonth} <sup>+{lostToday}</sup>
            </p>
          </div>
        </div>
      </div>
      <div className="bottom-wrapper">
        <div className="bottom-side">
          <div className="tooltip">
            <div className="dot midori"></div>
            <span>Freshman</span>
          </div>
          <div className="tooltip">
            <div className="dot pop"></div>
            <span>Lost</span>
          </div>
        </div>
        <div className="difference-count">
          <span className="difference-text">Difference: </span>
          <span className="difference-number">
            {res > 0 ? `+${res}` : `-${Math.abs(res)}`}
          </span>
        </div>
      </div>
    </>
  );
};

export default FreshmanCard;
