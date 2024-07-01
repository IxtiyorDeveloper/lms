import React, { FC } from "react";
import { Wrapper } from "./style";
import { IErrorLabelProps } from "./type";
import { Tooltip } from "antd";

const ErrorLabel: FC<IErrorLabelProps> = ({ error, hasThreeDots = true }) => {
  if (!error) return null;
  return (
    <Wrapper hasThreeDots={hasThreeDots}>
      <Tooltip
        destroyTooltipOnHide
        title={error}
        trigger="click"
        placement="bottom"
      >
        <p className="error-text">{error}</p>
      </Tooltip>
    </Wrapper>
  );
};

export default ErrorLabel;
