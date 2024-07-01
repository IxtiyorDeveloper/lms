import { Flex } from "antd";
import React from "react";
import StatustucCard from "../statisticCard/index.";
import { IExamStatistics } from "types/exam/exam";

const ExamStatusProgress = ({
  examProgress,
}: {
  examProgress: IExamStatistics | undefined;
}) => {
  const total = Number(examProgress?.all_count ?? 0);
  const main = Number(examProgress?.main_count ?? 0);
  const speaking = Number(examProgress?.speaking_count ?? 0);
  const finished = Number(examProgress?.full_finished_count ?? 0);
  return (
    <Flex
      gap={20}
      style={{
        marginTop: 20,
      }}>
      <StatustucCard title="Main part" passed={main} total={total} />
      <StatustucCard title="Speaking part" passed={speaking} total={total} />
      <StatustucCard
        title="Full finished exams"
        total={total}
        passed={finished}
      />
    </Flex>
  );
};

export default ExamStatusProgress;
