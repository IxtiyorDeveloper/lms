import React from "react";
import { Container } from "./style";
import { Flex } from "antd";
import { ExerciseTDO, GetExerciseField } from "types/exercise";
import { FalseIcon, TrueIcon } from "components";
import { EExercises } from "constants/exercises";
import { EExamAnswerStatus } from "constants/exam";

const Answer = ({ data, type }: { data: GetExerciseField; type: number }) => {
  const { answers, order, body } = data;

  const substrings = body.split(/{%answer%}/);
  const newString = ({ state }: { state: string }) => {
    return substrings
      .map((substring: any, index: number) => {
        const answer = answers?.find((answer) => answer?.order == index + 1);
        const is_correct =
          answer?.status == EExamAnswerStatus.CORRECT ? "correct" : "incorrect";
        const state_correct = state === "correct";

        const is_not_answer =
          type == EExercises.CONSTRUCT_SENTENCE
            ? !answers?.every((i) => i.userOptions?.length)
            : !answers?.every((i) => i.userAnswer?.length);

        if (is_not_answer) {
          return;
        }

        return (
          <span key={index}>
            <span
              dangerouslySetInnerHTML={{
                __html: substring.split("\n").join("<br/>"),
              }}
            />{" "}
            {index + 1 !== substrings.length && (
              <span
                className={`answer ${state_correct ? "correct" : is_correct}`}
              >
                {state_correct
                  ? type == EExercises.CONSTRUCT_SENTENCE
                    ? [...(answer?.options || [])]
                        ?.sort?.((a, b) => a.order - b.order)
                        ?.map((op) => `${op.value} `)
                    : answer?.answer
                  : type == EExercises.CONSTRUCT_SENTENCE
                    ? answer?.userOptions?.map((op) => `${op.value} `)
                    : answer?.userAnswer ?? "(Not answered)"}
              </span>
            )}
          </span>
        );
      })
      .filter((i) => i);
  };

  return (
    <Container>
      <Flex justify="space-between" align="center">
        <div className="question_order">Question {order}</div>

        {!newString({ state: "incorrect" }).length &&
          !newString({ state: "correct" }).length && (
            <p className="not_answered">Not answered</p>
          )}
      </Flex>

      {!!newString({ state: "incorrect" }).length && (
        <Flex gap={16} justify="space-between">
          <div className="answer">{newString({ state: "incorrect" })}</div>
          <FalseIcon />
        </Flex>
      )}

      {!!newString({ state: "correct" }).length && (
        <Flex gap={16} justify="space-between">
          <div className="answer">{newString({ state: "correct" })}</div>
          <TrueIcon />
        </Flex>
      )}
    </Container>
  );
};

export default Answer;
