import React from "react";
import { Info, Left, Name, Right, State, Wrapper } from "./style";
import { CircleImage, BranchTag } from "components";
import { IMainObservation } from "types/observation";
import { ranking_classes_names } from "constants/ranking";
import { EStaffType } from "types/statistics/podoRequest";

const SearchLabel = ({ item }: { item: IMainObservation }) => {
  const current_class =
    ranking_classes_names[item.class as keyof typeof ranking_classes_names];
  const isTeacher = item.type == EStaffType.TEACHER;
  return (
    <Wrapper>
      <Left>
        <CircleImage
          src={item?.user?.userProfile?.avatar}
          alt="a"
          height={40}
          width={40}
          className="image"
        />
        <Info>
          <Name>{item?.user?.userProfile?.fullName}</Name>
          {isTeacher && <State>{current_class}</State>}
        </Info>
      </Left>
      <Right>
        <BranchTag branches={item.branch_id} />
      </Right>
    </Wrapper>
  );
};

export default SearchLabel;
