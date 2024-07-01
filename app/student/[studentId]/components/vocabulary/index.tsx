import React, { FC } from "react";
import { Wrapper } from "./style";
import Filter from "./components/filter";
import LineCharts from "./components/chart";
import { useStudentSearchOne, useStudentWordsCount } from "hooks";
import { useRouter } from "next/router";
import { Spin } from "antd";
import Units from "./components/units";

interface IProps {
  level_id?: number | string | null;
}
const Vocabulary: FC<IProps> = ({ level_id }) => {
  const router = useRouter();
  const { isLoading, data } = useStudentSearchOne({
    query_params: {
      user_id: router.query.studentId,
      level_id: router.query.level_id,
      expand: "added_words_count,passed_words_count,failed_words_count",
    },
  });
  const { isLoading: isLoadingWords, data: words } = useStudentWordsCount({
    query_params: {
      student_id: router.query.studentId,
      level_id: router.query.level_id,
    },
  });

  return (
    <Spin spinning={isLoading || isLoadingWords}>
      <Wrapper>
        <Filter levelId={level_id} />
        <LineCharts data={data} />
        <Units data={words} />
      </Wrapper>
    </Spin>
  );
};

export default Vocabulary;
