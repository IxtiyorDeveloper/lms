import React from "react";
import { Badge, BadgeProps } from "antd";

const AntdBadge = ({
  content,
  color,
  ...props
}: {
  content: React.ReactNode | string;
  color?: string;
} & BadgeProps) => {
  return (
    <Badge color={color} count={content} overflowCount={1000000} {...props} />
  );
};

export default AntdBadge;
