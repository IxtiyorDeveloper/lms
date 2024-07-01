import React from "react";
import { Wrapper } from "./style";
import { IExamComponent } from "types/exam/exam";
import { EExamParts } from "constants/exam";
import { Popover } from "antd";
import Writing from "./writing";
import { bgColors } from "styles/theme";

const PointCell = ({
  per,
  component,
  record,
}: {
  per: any;
  record: any;
  component: IExamComponent;
}) => {
  if (component.key == EExamParts.WRITING)
    return (
      <Popover content={Writing({ record })} color={bgColors.dark}>
        <Wrapper>
          {!!per?.point || per?.point?.toString() == "0"
            ? `${per?.point}`
            : "-"}
        </Wrapper>
      </Popover>
    );
  else
    return (
      <Wrapper>
        {!!per?.point || per?.point?.toString() == "0" ? `${per?.point}` : "-"}
      </Wrapper>
    );
};

export default PointCell;
