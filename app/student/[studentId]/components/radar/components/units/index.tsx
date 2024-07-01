import React, { FC } from "react";
import { IStudentProgress, IStudentSkill } from "types/student";
import { Collapse, CollapseProps, Progress } from "antd";
import { sum } from "lodash";
import { ChevronDownSvg } from "components";
import { Arrow } from "../../style";
import { bgColors } from "styles/theme";

interface IProps {
  data?: IStudentSkill[];
}
const Units: FC<IProps> = ({ data }) => {
  return (
    <div className="units">
      <p className="title">Skills</p>
      <Collapse
        expandIconPosition="right"
        items={[]}
        expandIcon={({ isActive }) => (
          <Arrow isOpen={isActive} className="arrow">
            <ChevronDownSvg width={20} height={20} />
          </Arrow>
        )}
      />
    </div>
  );
};

export default Units;
