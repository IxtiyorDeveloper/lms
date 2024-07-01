import React, { FC } from "react";
import { InputWithIconWrapper } from "./style";
import { Input } from "../index";
import { TInputWithIcon } from "./type";
import { InputProps } from "antd";

const InputWithIcon: FC<TInputWithIcon & InputProps> = (props) => {
  const { wrapperStyle, icon, ...args } = props;
  const Icon = props.icon;
  return (
    <InputWithIconWrapper
      style={{
        ...wrapperStyle,
      }}
    >
      <Input {...args} prefix={<Icon />} />
    </InputWithIconWrapper>
  );
};

export default InputWithIcon;
