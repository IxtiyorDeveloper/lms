import React, { useMemo } from "react";
import { FilledLocationSvg } from "components";
import { Wrapper } from "./style";
import { IOption } from "components/common/select/type";
import { ObservationBranch } from "../../type";

const BranchMenu = ({
  branches,
  currentBranch,
}: {
  branches: IOption[] | undefined;
  currentBranch?: string | number;
}) => {
  return useMemo(() => {
    let array: {
      label: string | React.ReactNode;
      value?: string;
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
                    branches[i].value == currentBranch
                      ? "visible"
                      : "non-visible"
                  }
                />

                {branches[i]?.label}
              </Wrapper>
            ),
            value: branches[i].value?.toString(),
          },
        ];
      }
    }
    return [
      {
        label: (
          <Wrapper>
            <FilledLocationSvg
              className={
                currentBranch == ObservationBranch.all
                  ? "visible"
                  : "non-visible"
              }
            />
            All branches
          </Wrapper>
        ),
        value: ObservationBranch.all,
      },
      ...array,
    ];
  }, [branches, currentBranch]);
};

export default BranchMenu;
