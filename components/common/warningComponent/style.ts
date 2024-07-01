import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const WarningWrapper = styled.div`
  display: flex;
  border-radius: 10px;
  border: 1px solid var(--primary-300, #ffe866);
  background: var(--primary-100, #fff9cb);
  padding: 10px 16px;
  gap: 12px;
  width: 100%;
  .circle {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: ${bgColors.primary};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    color: ${textColors.vermin};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: 1.2;
    flex: 1;
    display: flex;
    align-items: center;
  }
`;
