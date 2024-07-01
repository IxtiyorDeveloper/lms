import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div<{ isEnd: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 16px;
  background-color: ${({ isEnd }) =>
    isEnd ? bgColors.orangeJuice : bgColors.pinkTheory};
  color: ${({ isEnd }) => (isEnd ? bgColors.white : bgColors.orangeJuice)};
  .icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    padding: 4px;
    background-color: ${({ isEnd }) =>
      isEnd ? bgColors.white : bgColors.orangeJuice};
  }
  h4 {
    font-size: ${fontSizes.f14};
    font-weight: 500;
    margin-top: 2px;
    line-height: 16px;
  }
  p {
    font-size: ${fontSizes.f12};
    font-weight: 500;
    line-height: 16px;
  }
  .left_time {
    font-weight: 600;
  }
`;
