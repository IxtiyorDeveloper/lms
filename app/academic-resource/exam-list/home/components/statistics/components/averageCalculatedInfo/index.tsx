import { Flex, Tooltip } from "antd";
import { Content, Title } from "./style";
import { bgColors } from "styles/theme";
import { CircleQuestionMarkSvg } from "@jasurbekyuldashov/lms-web-icons";

const AverageScoreCalculatedInfo = () => {
  return (
    <Tooltip
      trigger="click"
      overlayInnerStyle={{
        background: bgColors.dark,
      }}
      title={
        <Content>
          The average score is calculated by adding the average results per exam
          component (Grammar, Vocabulary, Reading, Writing, Listening).
        </Content>
      }>
      <Flex gap={8} align="center">
        <CircleQuestionMarkSvg />
        <Title>How is this calculated?</Title>
      </Flex>
    </Tooltip>
  );
};

export default AverageScoreCalculatedInfo;
