import { useMemo } from "react";
import Answer from "../answer";
import { InfoWrapper, ProgressPercent, TabContent } from "./style";
import { CollapseHeader } from "../../style";
import { bgColors } from "styles/theme";
import { IExamStudenPaperComponent } from "types/exam/index";
import { EExamAnswerStatus } from "constants/exam";
import { Collapse } from "components";
import { getPercentageParseValue, getPercentageValue } from "utils/number";
import { Empty, Flex, Progress } from "antd";

const ExamExercises = ({
  data,
}: {
  data: IExamStudenPaperComponent | undefined;
}) => {
  const tasks = useMemo(() => {
    return data?.groups
      ?.map((group) => {
        return group.tasks?.map((task) => {
          return task;
        });
      })
      .flat();
  }, [data?.groups]);

  const incorrectTasks = tasks?.filter((task) => {
    const fields = task?.fields?.filter((field) => {
      return field?.answers.some(
        (answer) => answer?.status !== EExamAnswerStatus.CORRECT,
      );
    });
    if (fields?.length) {
      return fields;
    }
  });

  const allIncorrectTasks = incorrectTasks
    ?.map((task) => {
      const fields = task?.fields?.filter((field) => {
        return field?.answers.some(
          (answer) => answer?.status !== EExamAnswerStatus.CORRECT,
        );
      });
      return fields;
    })
    .flat();

  const allTask = tasks?.map((task) => task?.fields).flat();
  const correct =
    allTask?.filter((task) =>
      task?.answers.some(
        (answer) => answer?.status === EExamAnswerStatus.CORRECT,
      ),
    ).length || 0;

  const totalTask =
    tasks?.reduce((acc, task) => acc + (task?.fields?.length ?? 0), 0) || 0;

  const score = data?.result_point || 0;
  const max = data?.point;

  const progress = getPercentageParseValue(score, max);

  return (
    <div>
      <ProgressPercent>
        <Progress
          status="active"
          strokeColor={bgColors.primary}
          showInfo={false}
          percent={progress}
        />
        {score}/{max}
      </ProgressPercent>

      {!!progress && progress < 100 && (
        <TabContent>
          <div className="incorrect_text">
            Incorrect answers: <span>{allIncorrectTasks?.length}</span>
          </div>
          <Collapse
            items={
              incorrectTasks?.map((field, index) => {
                const fields = field?.fields?.filter((field) => {
                  return field?.answers?.some(
                    (answer) => answer?.status !== EExamAnswerStatus.CORRECT,
                  );
                });

                return {
                  key: index,
                  label: (
                    <CollapseHeader>
                      Exercise {field?.order}
                      <div className="count">{fields?.length}</div>
                    </CollapseHeader>
                  ),
                  children: (
                    <>
                      <div
                        className="condition"
                        dangerouslySetInnerHTML={{ __html: field.condition }}
                      />
                      <Flex
                        vertical
                        gap={8}
                        style={{
                          margin: 12,
                        }}
                      >
                        {fields?.map((item) => {
                          return (
                            <Answer
                              key={item.id}
                              data={item}
                              type={field.type}
                            />
                          );
                        })}
                      </Flex>
                    </>
                  ),
                };
              }) || []
            }
          />
        </TabContent>
      )}

      {progress == 100 && (
        <InfoWrapper>
          <Empty
            image="/like.svg"
            description={"You answered all the questions correctly"}
          />
        </InfoWrapper>
      )}
    </div>
  );
};

export default ExamExercises;
