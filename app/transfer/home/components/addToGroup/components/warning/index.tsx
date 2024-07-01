import React from "react";
import { Wrapper } from "./style";
import { useExamUser, usePageDataMemo } from "hooks";
import { getMonthAndYear } from "utils/getFormattedDate";
import { OneStudent } from "types/student";
import { getLevel } from "./components/getLevel";
import { PodoSvg } from "components/elements";
import { bgColors } from "styles/theme";
import { Spin } from "antd";

const Warning = ({ student }: { student: OneStudent | undefined }) => {
  const selects = usePageDataMemo();

  const dates = getMonthAndYear();

  const restudyConfigConstant = selects?.restudyConfigConstant;

  const { data, isLoading } = useExamUser({
    query_params: {
      ...dates,
      user_id: student?.user_id,
      expand: "process",
    },
  });

  const point = data?.process?.point ?? 0;

  const { level, isWarned } = getLevel({ data, restudyConfigConstant });

  if (isWarned)
    return (
      <Spin spinning={isLoading}>
        <Wrapper>
          <div className="icon">
            <PodoSvg color={bgColors.white} width={20} height={20} />
          </div>
          <p>
            Warning!!! This student scored <span>{point}</span> on the final
            exam, so you should add him to the <span>{level}</span> month of
            failed level.
          </p>
        </Wrapper>
      </Spin>
    );
  else return null;
};

export default Warning;
