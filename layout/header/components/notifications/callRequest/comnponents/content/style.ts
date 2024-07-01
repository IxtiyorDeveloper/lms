import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 16px;
  min-width: 400px;
  max-height: 400px;
  overflow-y: auto;
`;
export const Top = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1.5px solid ${bgColors.whiteSmoke};
  padding-bottom: 12px;
  .close {
    cursor: pointer;
    display: flex;
    height: 20px;
    padding: 2px 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 40px;
    background: ${bgColors.purpleCrystal};
    color: ${textColors.soulfulBlue};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.33; /* 133.333% */
    letter-spacing: 0.1px;
  }
  .read-all {
    cursor: pointer;
    display: flex;
    height: 20px;
    padding: 2px 8px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 40px;
    background: ${bgColors.primary};
    color: ${textColors.blueGray};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    letter-spacing: 0.1px;
  }
`;

export const Row = styled.div`
  .col {
    padding: 12px 0;
    border-bottom: 1px solid ${bgColors.whiteSmoke};
  }
  .load-more {
    padding-top: 6px;
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    cursor: pointer;
  }
`;
export const Right = styled.div`
  display: flex;
  gap: 8px;
`;
