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
    display: flex;
    align-items: center;
    gap: 6px;
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
  }

  .p {
    padding: 20px;
  }

  .product {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 25px;

    .name {
      color: ${textColors.dark};
      font-family: SF Pro Display sans-serif;
      font-size: ${fontSizes.f14};
      font-weight: 500;
      line-height: 1.28; /* 128.571% */
    }
    .column {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .flex {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 !important;
      padding: 0;
      width: 100%;
      .type {
        color: ${textColors.sadet};
        font-size: ${fontSizes.f12};
        font-weight: 500;
        letter-spacing: -0.12px;
      }

      .ml {
        margin-left: auto !important;
        display: flex;
        //padding: 4px 8px;
        align-items: center;
        gap: 4px;
        border-radius: 6px;
        background: ${bgColors.sceptreBlue};
        color: ${textColors.sadet};
        font-size: ${fontSizes.f12};
        font-weight: 500;
        letter-spacing: -0.12px;
        height: 25px;
        justify-content: center;
        padding: 0 6px;
      }

      .count {
        color: ${textColors.white};
        font-size: ${fontSizes.f14};
        font-family: SF Pro Display sans-serif;
        font-weight: 500;
      }
    }

    .mt {
      margin-top: 6px !important;
    }

    .shop {
      color: ${textColors.soulfulBlue};
      font-family: SF Pro Display sans-serif;
      font-size: ${fontSizes.f12};
      font-weight: 400;
      margin-top: 6px;
    }

    .flex:nth-child(3) {
      margin-top: 9px;
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 20px;
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
