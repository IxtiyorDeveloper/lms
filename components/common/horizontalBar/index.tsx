import React from "react";
import { Col, Label, Part, Top, Wrapper } from "./style";
import { IHorizontalBar } from "./type";
import { Tooltip } from "antd";

const HorizontalBar = ({ data }: IHorizontalBar) => {
  return (
    <Wrapper>
      {data?.map((item, index) => {
        return (
          <Col key={index} percentage={item?.percentage}>
            {item?.percentage > 10 && (
              <Top percentage={item?.percentage}>
                <Label className="grotesk">{item?.label}</Label>
              </Top>
            )}
            <Tooltip title={item?.label}>
              <Part color={item?.color} />
            </Tooltip>
          </Col>
        );
      })}
    </Wrapper>
  );
};

export default HorizontalBar;
