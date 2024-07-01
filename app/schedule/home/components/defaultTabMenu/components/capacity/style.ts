import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  border-radius: 8px;
  border: 0.5px solid ${bgColors.purpleCrystal};
  background: #fff;
  box-shadow: 0 32px 48px -8px rgba(0, 0, 0, 0.1),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    -6px 0 4px 0 rgba(0, 0, 0, 0.04);
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: flex-end;
  min-width: 250px;

  .top {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .left {
      color: ${textColors.soulfulBlue};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.12px;
    }

    .right {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.12px;
    }
  }

  .pr {
    width: 100%;
    margin-top: 8px;
  }

  .bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .left {
      color: ${textColors.pop};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.12px;
    }
    .right {
      color: ${textColors.soulfulBlue};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.12px;
    }
  }
`;
