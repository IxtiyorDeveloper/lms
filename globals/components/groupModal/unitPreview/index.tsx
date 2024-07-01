import { Collapse, CollapseProps } from "antd";
import React from "react";
import { StyledHeader, Wrapper } from "./style";
import Units from "./units";
import { ChevronLeftSvg } from "components";
import { bgColors } from "styles/theme";
import { IRestructuredUnit } from "../type";

const UnitPreview = ({
  restructuredUnits,
}: {
  restructuredUnits: IRestructuredUnit[] | undefined;
}) => {
  const onChange = (key: string | string[]) => {};

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <StyledHeader>
          <p className="title">Preview schedule</p>{" "}
          <div className="arrow">
            <ChevronLeftSvg width={16} height={16} color={bgColors.blueGray} />
          </div>
        </StyledHeader>
      ),
      children: <Units restructuredUnits={restructuredUnits} />,
    },
  ];

  return (
    <Wrapper>
      <Collapse items={items} onChange={onChange} defaultActiveKey={["1"]} />
    </Wrapper>
  );
};

export default UnitPreview;
