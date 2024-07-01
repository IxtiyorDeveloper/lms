import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  //padding-inline: 10px;
`;
export const TaskFlex = styled.div`
  display: flex;
  gap: 4px;
`;
export const TaskLink = styled.div`
  display: flex;
  color: ${textColors.black};
  font-size: ${fontSizes.f10};
  font-weight: 500;
  line-height: 2; /* 200% */
  letter-spacing: -0.1px;
  gap: 2px;
  align-items: center;
  justify-content: center;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const Dots = styled.div`
  display: flex;
  color: ${textColors.royal};
  font-size: 12px;
  font-weight: 500;
  line-height: 2; /* 200% */
  letter-spacing: -0.1px;
  gap: 2px;
  align-items: center;
  justify-content: center;
  padding-left: 4px;
  cursor: pointer;
`;
