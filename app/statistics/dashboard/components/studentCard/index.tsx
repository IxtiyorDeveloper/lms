import React, { FC } from "react";
import { ArrowRightTopSvg, StudentCheckedSvg, ThroughSvg } from "components";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { WrapperDifferenceNumber } from "./style";

interface IProps {
  todayPodoMinus?: string;
  todayPodoPlus?: string;
  todayCount?: string;
  podoStudents?: string | number;
}

const StudentCard: FC<IProps> = ({
  todayPodoMinus,
  todayCount,
  todayPodoPlus,
  podoStudents,
}) => {
  return (
    <>
      <div className="head-card">
        <p className="title-card">Students</p>
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
          <span style={{ color: textColors.white }}>PODO Students</span>
          &nbsp;
          <span className="grotesk" style={{ color: textColors.white }}>
            {podoStudents}
          </span>
        </p>
      </div>
      <div className="icon">
        <StudentCheckedSvg color={bgColors.white} height={80} width={80} />
      </div>
    </>
  );
};

export default StudentCard;
