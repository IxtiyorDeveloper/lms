import React from "react";
import { Flex } from "antd";
import { getPercentageParseValue } from "utils/number";
import { IExamStudenPaperComponent } from "types/exam";
import { BackgrounWrapper, OveralProgressWrapper } from "./style";

const Overal = ({
  components,
}: {
  components: IExamStudenPaperComponent[] | undefined;
}) => {
  return (
    <OveralProgressWrapper>
      <Flex gap={46} justify="center" className="parts">
        {components?.map((comp) => {
          return (
            <div key={comp.id}>
              <div className="box">
                <p>{comp.label}</p>
                <BackgrounWrapper
                  percent={getPercentageParseValue(
                    comp.result_point,
                    comp?.point
                  )}
                />
              </div>
              <div className="count">
                {comp.result_point}/{comp?.point}
              </div>
            </div>
          );
        })}
      </Flex>
    </OveralProgressWrapper>
  );
};

export default Overal;
