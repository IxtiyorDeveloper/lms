import styled, { CSSObject } from "@emotion/styled";
import { menuClasses } from "../utils/utilityClasses";

interface StyledMenuButtonProps {
  level: number;
  collapsed?: boolean;
  rtl?: boolean;
  disabled?: boolean;
  active?: boolean;
  rootStyles?: CSSObject;
}

//${({ rtl, level, collapsed }) =>
//     rtl
//       ? `padding-left: 20px;
//            padding-right: ${
//              level === 0 ? 20 : (collapsed ? level : level + 1) * 20
//            }px;
//           `
//       : `padding-right: 20px;
//            padding-left: ${
//              level === 0 ? 20 : (collapsed ? level : level + 1) * 20
//            }px;
//          `}
export const StyledMenuButton = styled.div<StyledMenuButtonProps>`
  display: flex;
  align-items: center;
  height: 40px;
  margin: 9px 20px 0 20px;
  text-decoration: none;
  color: inherit;
  box-sizing: border-box;
  cursor: pointer;
  padding: 0 10px;
  border-radius: 6px;
  max-width: 180px;

  &:hover {
    background-color: rgba(179, 179, 179, 0.1);
  }

  &:hover .${menuClasses.label} {
    font-weight: 600;
  }

  ${({ disabled }) =>
    disabled &&
    ` 
    pointer-events: none;
    cursor: default;
    color:#adadad;
      `}

  ${({ active }) => active && "background-color: rgba(179, 179, 179, 0.1);"}

  ${({ rootStyles }) => rootStyles};
`;
