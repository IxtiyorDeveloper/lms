import React, { FC } from "react";
import { Wrapper } from "./style";
import Filter from "./components/filter";
import LineCharts from "./components/chart";
import { useStudentSkill } from "hooks";
import { useRouter } from "next/router";
import { Spin } from "antd";
import Units from "./components/units";

interface IProps {
  level_id?: number | string | null;
}
const Radar: FC<IProps> = ({ level_id }) => {
  const router = useRouter();
  const { isLoading, data } = useStudentSkill({
    query_params: {
      student_id: router.query.studentId,
      level_id: router.query.level_id || level_id,
    },
  });

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <Filter levelId={level_id} />
        <LineCharts data={data} />
        <Units data={data} />
      </Wrapper>
    </Spin>
  );
};

export default Radar;
