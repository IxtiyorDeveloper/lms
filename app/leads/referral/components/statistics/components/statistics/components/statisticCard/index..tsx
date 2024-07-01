import React from "react";
import { Percent, Wrapper } from "./style";
import { Flex, Progress } from "antd";
import { getPercentageValue } from "utils/number";
import { bgColors } from "styles/theme";

const StatustucCard = ({
  passed,
  title,
  total,
}: {
  title: string;
  total: number;
  passed: number;
}) => {
  const percent = getPercentageValue(passed, total);
  return (
    <Wrapper>
      <Flex justify="space-between" align="center">
        <h4 className="title">{title}</h4>
        <h4>{percent}%</h4>
      </Flex>

      <div className="progress_bar">
        <Progress
          size={140}
          type="circle"
          strokeWidth={10}
          percent={percent}
          strokeColor={bgColors.midori}
          trailColor={bgColors.purpleCrystal}
          format={(value) => (
            <Percent>
              <p>Total</p>
              <h5>
                {passed}/{total}
              </h5>
            </Percent>
          )}
        />
      </div>
    </Wrapper>
  );
};

export default StatustucCard;
