import React from "react";
import { AntFloatButton } from "./style";
import { FloatButtonProps } from "antd";

type Props = FloatButtonProps & {};

const FloatButton = ({ ...props }: Props) => {
  return (
    <AntFloatButton
      shape="circle"
      type="primary"
      style={{ width: 60, height: 60, right: 60, bottom: 25 }}
      {...props}
    />
  );
};

export default FloatButton;
