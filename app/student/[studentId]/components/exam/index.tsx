import React, { FC } from "react";
import { Wrapper } from "./style";
import Card from "./components/card";
import { useRouter } from "next/router";
import { useStudentExam } from "hooks";
import { Spin } from "antd";
import { AntdTable } from "components";

interface IProps {
  level?: string;
  subLevel: string;
  studentId?: number | string;
}

const Exam: FC<IProps> = (props) => {
  const router = useRouter();
  const { isLoading, data } = useStudentExam({
    query_params: {
      student_id: router.query.studentId,
    },
  });

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        {data && data?.length > 0 ? (
          data?.map((e) => {
            return <Card {...props} data={e} />;
          })
        ) : (
          <AntdTable columns={[]} dataSource={[]} />
        )}
      </Wrapper>
    </Spin>
  );
};

export default Exam;
