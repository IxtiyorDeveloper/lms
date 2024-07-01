import React from "react";
import { WarningWrapper } from "./style";
import { PodoSvg } from "../../elements";
import { bgColors } from "styles/theme";

const WarningComponent = ({ text }: { text: string }) => {
  return (
    <WarningWrapper>
      <div className="circle">
        <PodoSvg color={bgColors.white} />
      </div>
      <p className="text">{text}</p>
    </WarningWrapper>
  );
};

export default WarningComponent;
