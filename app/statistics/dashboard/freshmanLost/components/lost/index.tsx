import React, { FC } from "react";
import { LostWrapper } from "./style";
import { IFreshmanLost } from "types";
import {
  ByAgeCard,
  ByBranchCard,
  ByCategoriesCard,
  ByGroupTypeCard,
  ByLessonDay,
  ByLevelCard,
  ByTeacherRegularLostCard,
  ByTimeCard,
} from "../../lost/cards";

interface IProps {
  data?: IFreshmanLost;
}

const Lost: FC<IProps> = ({ data }) => {
  return (
    <div>
      <LostWrapper>
        <ByBranchCard />
        <ByLevelCard />
        <ByTeacherRegularLostCard />
        <ByCategoriesCard />
        <ByAgeCard />
        <ByGroupTypeCard />
        <ByLessonDay />
        <ByTimeCard />
      </LostWrapper>
    </div>
  );
};

export default Lost;
