import React, { FC, ReactNode, useMemo } from "react";
import { IStudentTopic } from "types/student";
import { Progress } from "antd";
import { bgColors } from "styles/theme";
import { CircleImage } from "components";
import { sum, sumBy } from "lodash";

interface IProps {
  data?: IStudentTopic[];
}

const getPercent = (item: IStudentTopic) => {
  const a = sum(
    item.sub_topics?.map(
      (item) => (100 * item.student_info.passed_topic_words) / item.words_count
    )
  );
  const percent = Math.round(
    Number.isNaN(a) ? 0 : a / item.sub_topics?.length
  ).toFixed(0);
  return +percent > 100 ? 100 : percent;
};

const Units: FC<IProps> = ({ data }) => {
  const items: ReactNode[] = useMemo(() => {
    const result: ReactNode[] = [];
    data?.map((item) => {
      const percent = getPercent(item);
      result.push(
        <div className="unit flex">
          <CircleImage src={item.coverage.original} />
          <div className="w-100">
            <div className="name">
              {item.name}
              <div>
                {sumBy(item.sub_topics, "student_info.passed_topic_words")} /{" "}
                {sumBy(item.sub_topics, "words_count")}
              </div>
            </div>
            <Progress
              percent={+percent}
              trailColor={bgColors.whiteSmoke}
              strokeColor={bgColors.primary}
              showInfo={false}
              size="small"
            />
          </div>
        </div>
      );
    });
    return result;
  }, [data]);
  return (
    <div className="units">
      <p className="title">Units</p>
      {items?.map((item, index) => {
        return item;
      })}
    </div>
  );
};

export default Units;
