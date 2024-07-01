import React, { FC } from "react";
import { SharpNotFilledSvg, SharpStarSvg, ThroughSvg } from "components";
import { bgColors } from "styles/theme";
import { Wrapper } from "./style";

interface IProps {
  notAttend?: string;
  attend?: string;
}

const NewStudentCard: FC<IProps> = ({ notAttend, attend }) => {
  return (
    <Wrapper>
      <div className="head-card">
        <p className="title-card">New Students</p>
        <ThroughSvg />
      </div>
      <div className="cards-wrapper">
        <div className="card">
          <p>
            <SharpNotFilledSvg height={40} width={40} />
          </p>
          {/* @ts-ignore */}
          <p className="grotesk number textFont">+{notAttend}</p>
          <p className="text">Not Attended</p>
        </div>
        <div className="card">
          <p>
            <SharpStarSvg height={40} width={40} color={bgColors.primary} />
          </p>
          <p className="grotesk number textFont">+{attend}</p>
          <p className="text">Attended</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default NewStudentCard;
