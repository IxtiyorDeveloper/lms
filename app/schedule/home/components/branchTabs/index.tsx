import React, { useMemo } from "react";
import { TBranch } from "types";
import { FilledLocationSvg } from "components";
import { Wrapper } from "./style";

const BranchTabs = ({
  branches,
  currentBranch,
}: {
  branches: TBranch[] | undefined;
  currentBranch: string | number;
}) => {
  return useMemo(() => {
    let array: {
      label: string | React.ReactNode;
      value: string;
    }[] = [];
    if (branches) {
      for (let i = 0; i < branches?.length; i++) {
        array = [
          ...array,
          {
            label: (
              <Wrapper>
                <FilledLocationSvg
                  className={
                    branches[i].id == currentBranch ? "visible" : "non-visible"
                  }
                />

                {branches[i]?.name}
              </Wrapper>
            ),
            value: branches[i].id?.toString(),
          },
        ];
      }
    }
    return array;
  }, [branches, currentBranch]);
};

export default BranchTabs;
