import React, { FC } from "react";
import { ThroughSvg } from "components";
import { bgColors, textColors } from "styles/theme";

interface IProps {
  today?: string;
  lastMonth?: string;
}

const TeacherCard: FC<IProps> = ({ today, lastMonth }) => {
  return (
    <>
      <div
        className="head-card"
        style={{
          paddingBottom: "9px",
          borderBottom: "1px solid #FCD9D390",
          backgroundColor: bgColors.pepper,
          borderRadius: "8px 8px 0 0",
        }}
      >
        <p className="title-card">Teacher lost</p>
        <ThroughSvg />
      </div>
      <div className="foot-card">
        <div className="nums">
          <p className="grotesk">+{today}</p>
        </div>
        <p className="monthly">
          <span style={{ color: textColors.white, fontWeight: 400 }}>
            Monthly:{" "}
          </span>
          <span
            className="grotesk"
            style={{ color: textColors.white, fontWeight: 400 }}
          >
            -{lastMonth}
          </span>
        </p>
      </div>
      <div className="icon">
        <img
          style={{ margin: "0 10px 10px 0" }}
          src="/statistics/teacherLost.svg"
          alt="teacher lost"
        />
      </div>
    </>
  );
};

export default TeacherCard;
