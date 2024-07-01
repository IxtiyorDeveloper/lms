import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.form`
  border-radius: 10px;
  background: ${bgColors.wildSand};
  //display: inline-flex;
  //padding: 41px 154px 14px 14px;
  align-items: center;
  width: 25%;
  min-width: 300px;

  .flex {
    display: flex;
    gap: 0 !important;
  }

  .divider {
    height: 1px;
    background: ${bgColors.purpleCrystal};
  }

  .info {
      color: ${textColors.onyx};
      font-size: ${fontSizes.f12};
    font-weight: 700;
    letter-spacing: -0.12px;
    padding: 14px;
  }

  .switcher {
    margin-top: 14px;
    padding: 14px;

    .switch-wrap {
      display: flex;
      height: 36px;
      padding: 8px 10px;
      justify-content: center;
      align-items: center;
      gap: 18px;
      border-radius: 6px;
      border: 1px solid ${bgColors.purpleCrystal};
      background: ${bgColors.white};
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
      color: ${textColors.soulfulBlue};
      font-size: ${fontSizes.f12};
      font-weight: 600;
      line-height: 1.66; /* 166.667% */
      letter-spacing: -0.12px;

      .switch-wrapper {
        width: 100%;
      }
    }
  }

  .buttons {
    padding: 17px 14px 14px 14px;
  }
`;
