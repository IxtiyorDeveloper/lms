import { Bottom, Top, Wrapper } from "./style";
import { Popover } from "antd";
import PopoverContent from "./components/popoveContent";
import { textColors } from "styles/theme";
import React from "react";
import { IType } from "./type";

const Content = ({ branches }: IType) => {
  const top = branches?.[0];

  if (branches?.length > 1) {
    const others = branches?.slice(1);
    const second = others?.[0];

    if (branches?.length == 2) {
      return (
        <Wrapper>
          <Top>{top?.branch?.name}</Top>
          <Bottom>{second?.branch?.name}</Bottom>
        </Wrapper>
      );
    } else {
      const plus = branches?.length - 2;
      return (
        <Popover
          content={() => PopoverContent({ branches })}
          color={textColors.dark}
        >
          <Wrapper>
            <Top>{top?.branch?.name}</Top>
            <Bottom>
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
          <Top>{top?.branch?.name}</Top>
        </Wrapper>
      );
    }
    return null;
  }
};

export default Content;
