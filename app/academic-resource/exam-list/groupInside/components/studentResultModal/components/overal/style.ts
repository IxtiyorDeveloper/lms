import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const OveralProgressWrapper = styled.div`
  padding: 16px;
  border-radius: 16px;
  background-color: ${bgColors.whiteSmoke};
  margin: 16px 0;
  .parts {
    margin-top: 12px;
  }
  .box {
    width: 50px;
    height: 150px;
    border-radius: 4px;
    background-color: ${bgColors.white};
    position: relative;
    p {
      transform: rotate(-90deg);
      white-space: nowrap;
      position: relative;
      top: 104px;
      z-index: 10;
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      text-align: left;
    }
  }
  .count {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    text-align: center;
  }
`;
export const BackgrounWrapper = styled.div<{ percent: number }>`
  width: 50px;
  height: ${({ percent }) => percent}%;
  background-color: ${bgColors.primary};
  position: absolute;
  bottom: 0;
  z-index: 1;
  border-radius: 4px;
`;
