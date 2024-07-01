import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  overflow: hidden;
  border-radius: 16px;

  .title {
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f14};
    font-weight: 700;
    letter-spacing: -0.14px;
  }

  .i-wrapper {
    margin-top: 24px;
  }

  .label {
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f12};
    font-weight: 500;
    letter-spacing: -0.12px;
    margin-top: 20px;
  }

  .flex {
    display: flex;
    gap: 16px;
    margin-top: 20px;

    div {
      width: 100% !important;
      overflow: hidden;
    }
  }

  .p {
    padding: 20px;
  }

  .buttons {
    background: ${bgColors.brilliance};
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 16px 20px 20px 20px;
    align-items: center;

    .btns {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      align-items: center;
    }
  }
`;
