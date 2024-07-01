import React, { FC } from "react";
import { Container, MarksWrapper } from "./style";
import { bgColors } from "styles/theme";
import { IArsTeacher, IProgress } from "types/ars/teacher";

interface IScore {
  score: IProgress[];
  unit: IArsTeacher | undefined;
}

const IndividualMarkCell: FC<IScore> = ({ score, unit }) => {
  const inner = ({ borderColor }: any) => {
    return (
      <Container borderColor={score ? borderColor : bgColors.transparent}>
        {score?.map((sc, index) => {
          const color = sc?.passed ? bgColors.midori : bgColors.pop;
          return (
            <MarksWrapper key={index} bgColor={color}>
              {sc.progress}%
            </MarksWrapper>
          );
        })}
      </Container>
    );
  };
  if (!unit?.opened) {
    return <div></div>;
  } else return inner({ borderColor: bgColors.transparent });
};

export default IndividualMarkCell;
