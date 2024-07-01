import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div<{ bool?: boolean }>`
  margin-top: 20px;
  display: ${(props) => (!props.bool ? "flex" : "block")};
  gap: 16px;

  .image {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    .type {
      width: 52px;
      height: 52px;
      position: absolute;
      bottom: 5px;
      margin-right: -82px;
      z-index: 10;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .name {
    color: #303940;
    font-size: ${fontSizes.f20};
    font-weight: 600;
    line-height: 1.2; /* 120% */
    letter-spacing: -0.12px;
    white-space: nowrap;
    text-align: center;
    margin-top: 12px;
  }

  .container {
    min-width: 20vw;
  }

  .p-20 {
    padding: 20px;
  }

  .p-24 {
    padding: 24px;
  }

  .divider {
    margin: 16px 0 !important;
  }

  .w-100 {
    width: 100%;
  }

  .info {
    display: flex;
    gap: 16px;
    justify-content: ${(props) => (!props.bool ? "space-between" : "center")};
    color: rgba(0, 0, 0, 0.64);
    font-size: ${fontSizes.f16};
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.096px;
    .bold {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
    }
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 12px;

    .card {
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.07);
      background: ${bgColors.white};
      display: inline-flex;
      padding: 25px 75px 20px 20px;
      align-items: flex-start;
      gap: 12px;

      .title {
        color: #818c99;
        font-feature-settings: "clig" off, "liga" off;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.38px;
      }

      .month {
        color: #8e969e;
        font-feature-settings: "clig" off, "liga" off;
        font-size: 9px;
        line-height: 1.33;
        letter-spacing: -0.32px;
      }

      .percent {
        color: ${textColors.black};
        font-feature-settings: "clig" off, "liga" off;
        font-size: ${fontSizes.f22};
        font-weight: 600;
        letter-spacing: 0.41px;
      }

      .icon {
        display: flex;
        height: 50px;
        padding: 12px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 8px;
        background: rgba(235, 75, 66, 0.1);
      }

      .icon.green {
        background: rgba(69, 178, 107, 0.1);
      }
      .icon.gray {
        background: #f6f8f9;
      }
    }
  }
`;
