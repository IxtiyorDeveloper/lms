import { Bottom, Top, Wrapper } from "./style";
import { Popover } from "antd";
import PopoverContent from "./components/popoveContent";
import { textColors } from "styles/theme";
import React from "react";
import { IType } from "./type";

const Content = ({ branches, group, colored }: IType) => {
  const top = branches?.[0];
  const groupBranch = group?.room?.branch;
  const topFit = groupBranch?.id?.toString() == top?.branch?.id?.toString();

  if (branches?.length > 1) {
    const others = branches?.slice(1);
    const second = others?.[0];
    const secondFit =
      groupBranch?.id?.toString() == second?.branch?.id?.toString();

    if (branches?.length == 2) {
      return (
        <Wrapper>
          <Top className={colored ? (topFit ? "fit" : "unfit") : ""}>
            {top?.branch?.name}
          </Top>
          <Bottom className={colored ? (secondFit ? "fit" : "unfit") : ""}>
            {second?.branch?.name}
          </Bottom>
        </Wrapper>
      );
    } else {
      const plus = branches?.length - 2;
      return (
        <Popover
          content={() => PopoverContent({ branches, group, colored })}
          color={textColors.dark}
        >
          <Wrapper>
            <Top className={colored ? (topFit ? "fit" : "unfit") : ""}>
              {top?.branch?.name}
            </Top>
            <Bottom className={colored ? (secondFit ? "fit" : "unfit") : ""}>
              {second?.branch?.name}, +{plus}
            </Bottom>
          </Wrapper>
        </Popover>
      );
    }
  } else {
    if (top?.branch?.name) {
      return (
        <Wrapper>
          <Top className={colored ? (topFit ? "fit" : "unfit") : ""}>
            {top?.branch?.name}
          </Top>
        </Wrapper>
      );
    }
    return null;
  }
};

export default Content;
