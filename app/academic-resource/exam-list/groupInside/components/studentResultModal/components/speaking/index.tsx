import Image from "next/image";
import { IExamStudenPaper } from "types/exam/index";
import {
  AudioWrapper,
  CreteriaItem,
  FeedbackWrapper,
  ItemIcon,
  ProgressPercent,
  TabContent,
  Topic,
} from "./style";
import { Row, Col, Flex, Progress } from "antd";
import ExamPartMark from "../mark";
import { getPercentageValue } from "utils/number";
import { bgColors } from "styles/theme";
import { EExamParts } from "constants/exam";
import Audio from "../audio";
import { useMemo } from "react";
import { Collapse } from "components";

const Speaking = ({
  data,
  mock,
}: {
  data: IExamStudenPaper | undefined;
  mock: boolean;
}) => {
  const speaking = data?.components?.find(
    (item) => item.type == EExamParts.SPEAKING
  );

  const speakingData = speaking?.groups?.[0].tasks?.[0];

  const parts = useMemo(() => {
    const versions = [
      ...new Set(speakingData?.fields?.map((field) => field?.version)),
    ].filter((i) => i);

    return versions?.map((i) => {
      return {
        label: `Part ${i}`,
        fields: speakingData?.fields?.filter((field) => field?.version == i),
      };
    });
  }, [speakingData?.fields]);

  return (
    <div>
      <ProgressPercent>
        <Progress
          status="active"
          showInfo={false}
          strokeColor={bgColors.primary}
          percent={getPercentageValue(
            speakingData?.score?.point || 0,
            speakingData?.score?.max_point || 0
          )}
        />
        {speakingData?.score?.point}/{speakingData?.score?.max_point}
      </ProgressPercent>

      <TabContent>
        <div className="topic_section">
          <h4 className="label">Topic</h4>
          {!mock && (
            <Topic>
              <div
                dangerouslySetInnerHTML={{
                  __html: speakingData?.condition || "",
                }}
              />
              {parts?.map((part) => {
                return (
                  <div key={part.label}>
                    <p className="part">{part.label}</p>
                    {part?.fields?.map((field, index) => {
                      return (
                        <div
                          key={field?.id}
                          dangerouslySetInnerHTML={{
                            __html:
                              `${index + 1}. ${field?.body
                                ?.split("\n")
                                .join("<br/>")}` || "",
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </Topic>
          )}
        </div>

        {!mock && speakingData?.file_url && (
          <AudioWrapper>
            <h4 className="label">Your answer</h4>
            <Audio url={speakingData?.file_url} id={speakingData?.id} />
          </AudioWrapper>
        )}

        {mock && (
          <Flex vertical gap={16}>
            {speakingData?.fields?.map((field, index) => {
              const answer = field?.answers?.[0];
              return (
                <AudioWrapper key={field?.id}>
                  <h4 className="label">
                    {index + 1}. {field?.body}
                  </h4>
                  <Audio url={answer?.userAnswer!} id={field?.id} />

                  <FeedbackWrapper>
                    <Collapse
                      items={[
                        {
                          key: index,
                          label: <div>Feedback</div>,
                          children: (
                            <div
                              className="comment"
                              dangerouslySetInnerHTML={{
                                __html:
                                  answer?.feedback?.split("\n").join("<br/>") ||
                                  "",
                              }}
                            />
                          ),
                        },
                      ]}
                    />{" "}
                  </FeedbackWrapper>
                </AudioWrapper>
              );
            })}
          </Flex>
        )}

        <div>
          <h4 className="label">Feedback</h4>
          <div
            className="comment"
            dangerouslySetInnerHTML={{
              __html:
                speakingData?.score?.description?.split("\n").join("<br/>") ||
                "",
            }}
          />
        </div>

        <Row gutter={[12, 12]}>
          {speakingData?.criteria?.map((criteria, index) => (
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
          mark={speakingData?.score?.point}
          totalMark={speakingData?.score?.max_point}
        />
      </TabContent>
    </div>
  );
};

export default Speaking;
