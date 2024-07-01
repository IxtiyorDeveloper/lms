import React, { FC } from "react";
import { IStudentProgress, IStudentProgressSubUnit } from "types/student";
import { Collapse, CollapseProps, Progress } from "antd";
import { ChevronDownSvg } from "components";
import { Arrow } from "../../style";
import { bgColors } from "styles/theme";
import { svgs } from "../../../radar/components/chart";

interface IProps {
  data?: IStudentProgress[];
}
const getPercent = (item: IStudentProgressSubUnit) => {
  const percent = (
    (100 * item.student_score.collected_points) /
    item.student_score.total_points
  ).toFixed(0);
  return percent != "NaN" ? percent : 0;
};

const Units: FC<IProps> = ({ data }) => {
  const items: CollapseProps["items"] = [];
  data?.map((item) => {
    return item.sub_units.map((e, index) => {
      const percent = getPercent(e);
      items.push({
        key: items.length,
        label: (
          <div className="unit">
            <div className="name">
              {item.name}.{e.order}
            </div>
            <Progress
              percent={+percent}
              trailColor={bgColors.whiteSmoke}
              strokeColor={bgColors.primary}
              showInfo={false}
              size="small"
            />
          </div>
        ),
        children: (
          <div>
            {e.student_score.scores.map((e) => {
              let percent: string | number = (
                (e.collected_points * 100) /
                e.collected_points
              ).toFixed(0);
              percent = percent != "NaN" ? +percent : 0;
              return (
                <div className="unit flex">
                  {svgs?.[e.activity.name as keyof typeof svgs]}
                  <div className="w-100">
                    <div className="name">
                      {e.activity.name}
                      <div className="percent">{percent}%</div>
                    </div>
                    <Progress
                      percent={percent}
                      trailColor={bgColors.whiteSmoke}
                      strokeColor={bgColors.primary}
                      showInfo={false}
                      size="small"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ),
        extra: <div className="percent">{percent}%</div>,
      });
    });
  });
  return (
    <div className="units">
      <p className="title">Units</p>
      <Collapse
        expandIconPosition="right"
        items={items}
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
