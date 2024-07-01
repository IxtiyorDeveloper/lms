import React from "react";
import { PopoverContainer } from "./style";
import { ComeSvg, NotComeSvg } from "components";
import { EnumExamAbs } from "constants/exam";

const PopoverComponent = ({
  status,
  handleChange,
}: {
  status: EnumExamAbs;
  handleChange: (status: EnumExamAbs) => void;
}) => {
  if (status == EnumExamAbs.ATTENDED)
    return (
      <PopoverContainer>
        <div className="row" onClick={() => handleChange(EnumExamAbs.ABSENT)}>
          <NotComeSvg width={30} height={30} />
        </div>
      </PopoverContainer>
    );
  else {
    if (status == EnumExamAbs.ABSENT)
      return (
        <PopoverContainer>
          <div
            className="row"
            onClick={() => handleChange(EnumExamAbs.ATTENDED)}
          >
            <ComeSvg width={30} height={30} />
          </div>
        </PopoverContainer>
      );
    else
      return (
        <PopoverContainer>
          <div className="row">
            <ComeSvg
              width={30}
              height={30}
              onClick={() => handleChange(EnumExamAbs.ATTENDED)}
            />
            <NotComeSvg
              width={30}
              height={30}
              onClick={() => handleChange(EnumExamAbs.ABSENT)}
            />
          </div>
        </PopoverContainer>
      );
  }
};

export default PopoverComponent;
