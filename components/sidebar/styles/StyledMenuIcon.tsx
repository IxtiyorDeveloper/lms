import styled, { CSSObject } from "@emotion/styled";

interface StyledMenuIconProps {
  rtl?: boolean;
  rootStyles?: CSSObject;
}

export const StyledMenuIcon = styled.span<StyledMenuIconProps>`
  width: 20px;
  //min-width: 35px;
  height: 20px;
  //line-height: 35px;
  text-align: center;
  display: inline-block;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;

  // ${({ rtl }) => (rtl ? "margin-left: 10px;" : "margin-right: 10px;")}

  ${({ rootStyles }) => rootStyles};
`;
