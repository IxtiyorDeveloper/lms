import { useMemo } from "react";
import ExamPartMark from "../mark";
import { getPercentageValue } from "utils/number";
import { IExamStudenPaperComponent } from "types/exam/index";
import { ProgressPercent, TabContent } from "./style";
import { Col, Flex, Progress } from "antd";
import { bgColors } from "styles/theme";
import { Row } from "antd/lib";
import Image from "next/image";
import { CreteriaItem, ItemIcon } from "../speaking/style";

const Writing = ({ data }: { data: IExamStudenPaperComponent | undefined }) => {
  const tasks = useMemo(() => {
    return data?.groups
      ?.map((group) => {
        return group.tasks?.map((task) => {
          return task;
        });
      })
      .flat();
  }, [data?.groups]);

  const score = tasks?.[0]?.score;

  return (
    <div>
      <ProgressPercent>
        <Progress
          status="active"
          showInfo={false}
          strokeColor={bgColors.primary}
          percent={getPercentageValue(score?.point || 0, score?.max_point || 0)}
        />
        {score?.point}/{score?.max_point}
      </ProgressPercent>
      <TabContent>
        {tasks?.map((task, index) => {
          return (
            <div className="writing_body" key={index}>
              <h4>Topic</h4>
              <div className="topic_description">
                <div dangerouslySetInnerHTML={{ __html: task.condition }} />
              </div>
              <h4>Essay</h4>
              <div
                className="essay"
                dangerouslySetInnerHTML={{
                  __html: task?.userAnswer?.split("\n").join("<br/>") || "",
                }}
              />
              <h4>Comment</h4>
              <div
                className="essay_score_comment"
                dangerouslySetInnerHTML={{
                  __html:
                    task?.score?.description?.split("\n").join("<br/>") || "",
                }}
              />

              <Row
                gutter={[12, 12]}
                style={{
                  marginBottom: 24,
                }}>
                {task?.criteria?.map((criteria, index) => (
                  <Col key={index} span={24}>
                    <CreteriaItem>
                      <Flex align="center" gap={6}>
                        <ItemIcon>
                          <Image
                            alt="icon"
                            width={20}
                            height={16}
                            src={criteria.criteria.icon_url}
                          />
                        </ItemIcon>
                        <p className="name">{criteria.criteria.name}</p>
                      </Flex>
                      <p>{criteria.point_result}</p>
                    </CreteriaItem>
                  </Col>
                ))}
              </Row>

              <ExamPartMark
                mark={task.score?.point}
                totalMark={task?.score?.max_point}
              />
            </div>
          );
        })}
      </TabContent>
    </div>
  );
};

export default Writing;
