import React, { CSSProperties } from "react";
import { StyledCell } from "./style";

const Cell = ({
  children,
  display = "block",
  gap = "0",
  dots = false,
  id = "p-cell",
  className,
  onClick,
  ...args
}: {
  children: React.ReactNode;
  style?: CSSProperties;
  display?: CSSProperties["display"];
  gap?: CSSProperties["gap"];
  dots?: boolean;
  id?: string;
  className?: string;
  onClick?: any;
}) => {
  return (
    <StyledCell
      display={display}
      gap={gap}
      className={className}
      {...args}
      dots={dots}
      id={id}
      onClick={onClick}
    >
      {children}
    </StyledCell>
  );
};

export default Cell;
