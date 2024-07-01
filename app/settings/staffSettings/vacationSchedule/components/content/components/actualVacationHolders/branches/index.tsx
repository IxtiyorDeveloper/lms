import React, { FC } from 'react';
import { IRbacAssignmentBranch } from "types/staffSettings";
import { Wrapper } from "./style";

interface IProps {
  data?: IRbacAssignmentBranch[];
}

const Branches: FC<IProps> = (props) => {
  const {data} = props;
  const count = data ? data.length - 1 : 0;

  return (
    <Wrapper>
      <span>{data && data[0].branch.name}</span>
      {count !== 0 ? <span>{`+${count}`}</span> : null}
    </Wrapper>
  );
};

export default Branches;
