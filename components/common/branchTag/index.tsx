import React from "react";
import { Branches, BranchRow, Wrapper } from "./style";
import { IBranchTag } from "./type";
import { usePageDataMemo } from "hooks";
import { Popover } from "antd";

const BranchTag = ({ branches }: IBranchTag) => {
  const l = branches?.length;
  const moreThanOne = l > 1;
  const selects = usePageDataMemo();
  const initialBranch = branches?.[0];

  const firstBranch = selects?.branch?.find((b) => b.value == initialBranch);

  if (moreThanOne) {
    return (
      <Popover
        content={
          <Branches>
            {branches?.map((item, index) => {
              const c = selects?.branch?.find((b) => b.value == item);
              return <BranchRow key={index}>{c?.label}</BranchRow>;
            })}
          </Branches>
        }
      >
        <Wrapper>
          {firstBranch?.label} | {l - 1}
        </Wrapper>
      </Popover>
    );
  } else {
    return <Wrapper>{firstBranch?.label}</Wrapper>;
  }
};

export default BranchTag;
