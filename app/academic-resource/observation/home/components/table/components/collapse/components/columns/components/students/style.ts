import styled from "@emotion/styled";
import { textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;

  p {
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
    cursor: pointer;
  }
`;
export const Opened = styled.div`
  transform: rotate(-90deg);
`;
export const Closed = styled.div`
  transform: rotate(180deg);
  transition: all 0.3s;
`;
