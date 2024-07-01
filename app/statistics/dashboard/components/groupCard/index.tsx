import React, { FC } from "react";
import { ArrowRightTopSvg, ThroughSvg } from "components";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { Wrapper, WrapperDifferenceNumber } from "./style";
import { GroupStatSvg } from "@jasurbekyuldashov/lms-web-icons";

interface IProps {
  todayPodoMinus?: string;
  todayPodoPlus?: string;
  todayCount?: string;
  podoStudents?: string | number;
}

const GroupCard: FC<IProps> = ({
  todayPodoMinus,
  todayCount,
  todayPodoPlus,
  podoStudents,
}) => {
  return (
    <Wrapper>
      <div className="head-card">
        <p className="title-card">Groups</p>
        <ThroughSvg />
      </div>
      <div className="foot-card">
        <div className="nums">
          <WrapperDifferenceNumber>
            <ArrowRightTopSvg
              height={8}
              width={8}
              color={bgColors.fond}
              style={{ transform: "rotate(135deg)" }}
            />
            <p
              className="grotesk"
              style={{
                fontSize: fontSizes.f12,
                color: textColors.fond,
              }}
            >
              -{todayPodoMinus || 0}
            </p>
          </WrapperDifferenceNumber>
          <p
            className="grotesk"
            style={{
              fontSize: "28px",
              fontFamily: `"Space Grotesk", sans-serif`,
            }}
          >
            {todayCount}
          </p>
          <WrapperDifferenceNumber>
            <ArrowRightTopSvg
              style={{ transform: "rotate(315deg)" }}
              height={8}
              width={8}
              color={bgColors.spring}
            />
            <p
              className="grotesk"
              style={{
                fontSize: fontSizes.f12,
                color: textColors.spring,
              }}
            >
              +{todayPodoPlus || 0}
            </p>
          </WrapperDifferenceNumber>
        </div>
        <p className="monthly">
          <span style={{ color: textColors.white }}>Closed groups</span>
          &nbsp;
          <span className="grotesk" style={{ color: textColors.white }}>
            {podoStudents}
          </span>
        </p>
      </div>
      <div className="icon scale">
        <GroupStatSvg color={bgColors.white} height={90} width={90} />
      </div>
    </Wrapper>
  );
};

export default GroupCard;
