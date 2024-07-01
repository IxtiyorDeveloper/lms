import React from "react";
import { RedBadgeWrapper } from "./style";
import AntdBadge from "../antdBadge";

const RedBadgeTitle = ({
  title,
  count,
  color,
  className,
}: {
  title?: string;
  count?: number | string;
  color?: string;
  className?: string;
}) => {
  return (
    <RedBadgeWrapper className={className}>
      {!!title && <p className="title">{title}</p>}
      {(!!count || count == "0") && (
        <AntdBadge color={color} content={count} showZero />
      )}
    </RedBadgeWrapper>
  );
};

export default RedBadgeTitle;
