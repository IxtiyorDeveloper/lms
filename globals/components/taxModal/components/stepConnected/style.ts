import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  .main {
    padding: 21px;
    align-items: center;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: ${textColors.blueGray};
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5; /* 150% */
    letter-spacing: -0.16px;
  }

  .action {
    display: flex;
    justify-content: flex-end;
    gap: 8px;

    .ant-btn {
      display: flex !important;
      padding: 10px 24px !important;
      justify-content: center !important;
      align-items: center !important;
      gap: 10px !important;
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      line-height: 1.66; /* 166.667% */
      letter-spacing: -0.12px;
      border-radius: 10px;
      color: ${textColors.pop};
      background: ${bgColors.pale};
    }

    .green {
      color: ${textColors.white};
      background: ${bgColors.midori};
      border: 0 !important;

      &:hover {
        color: ${textColors.white};
      }
    }
  }
`;
