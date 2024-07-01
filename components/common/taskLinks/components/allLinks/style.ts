import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 12px;
`;
export const TaskFlex = styled.div`
  display: flex;
`;
export const TaskLink = styled.div`
  display: flex;
  color: ${textColors.white};
  font-size: ${fontSizes.f10};
  font-weight: 500;
  line-height: 2; /* 200% */
  letter-spacing: -0.1px;
  gap: 2px;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
