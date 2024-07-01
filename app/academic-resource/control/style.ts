import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 20px 40px;

  .segment-item {
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .tab-side {
    border-radius: 10px;
    padding: 5px;
    background: ${bgColors.white};
  }

  .segmented-content-wrapper {
    width: 100% !important;

    .ant-segmented {
      background: ${bgColors.white};
    }
  }

  .segmented-content-container {
    width: 100% !important;
  }

  .ant-segmented-group {
    width: 100% !important;

    label {
      width: 100% !important;

      .ant-segmented-item-label {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }
    }
  }

  .filter {
    border-radius: 8px;
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.05);
    padding: 20px;
    background: ${bgColors.white};
    margin-top: 10px;
  }

  .table-wrap {
    background: ${bgColors.white};
    margin-top: 10px;
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin: 20px 0;
  }

  .groups {
    display: flex;
    gap: 14px;
    padding: 15px 30px 15px 5%;
    overflow-x: auto;

    .item {
      border-radius: 8px;
      background: ${bgColors.daisy};
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1) inset;

      .group-name {
        display: flex;
        justify-content: space-between;
        gap: 38px;
        padding: 13px 10px;

        .title {
          color: ${textColors.dark};
          font-size: ${fontSizes.f12};
          font-weight: 700;
          letter-spacing: -0.12px;
          text-decoration-line: underline;
          white-space: nowrap;
        }

        .count {
          color: ${textColors.white};
          font-size: ${fontSizes.f12};
          font-weight: 700;
          letter-spacing: -0.12px;
          background: ${bgColors.pop};
          height: 20px;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 30px;
          background: ${bgColors.midori};
          white-space: nowrap;
          padding: 0 5px;
        }

        .count.red {
          background: ${bgColors.pop};
        }
      }

      .divider {
        background: ${bgColors.sunny};
        height: 1px;
      }

      .level-wrap {
        padding: 10px;
        .parent-level {
          color: ${textColors.blueGray};
          font-size: ${fontSizes.f12};
          font-weight: 600;
          letter-spacing: -0.12px;
        }

        .level {
          padding: 2px 8px;
          justify-content: center;
          align-items: center;
          gap: 10px;
          border-radius: 10px;
          background: ${bgColors.soulfulBlue};
          color: ${textColors.brilliance};
          font-size: ${fontSizes.f12};
          font-weight: 500;
          letter-spacing: -0.12px;
          width: 55%;
          display: flex;
          margin-top: 6px;
        }
      }

      .event-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 8px;
        color: ${textColors.soulfulBlue};
        font-size: 12px;
        font-weight: 500;
        letter-spacing: -0.12px;
        margin-top: 8px;
      }
    }

    .item-green {
      border-radius: 8px;
      background: ${bgColors.brilliance};
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);

      .divider {
        background: ${bgColors.purpleCrystal};
      }
    }
  }

  .table-count {
    border-radius: 60px;
    border: 1px solid ${bgColors.purpleCrystal};
    background: ${bgColors.whiteSmoke};
    gap: 10px;
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f14};
    font-weight: 700;
    line-height: 12px;
    letter-spacing: -0.14px;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .table-progress.red {
    border: 1px solid ${bgColors.pop};
    background: ${bgColors.pop};
  }
  .table-progress {
    border-radius: 60px;
    border: 1px solid ${bgColors.serengeti};
    background: ${bgColors.serengeti};
    gap: 10px;
    color: ${textColors.white};
    font-size: ${fontSizes.f12};
    font-weight: 700;
    line-height: 12px;
    letter-spacing: -0.14px;
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 20px;
  }
`;

export const WaitingListFilterWrapper = styled.div<{ mt?: string }>`
  background: ${bgColors.brilliance};
  /* Shadow */

  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin: 0 40px 0 40px;
  padding: 20px;
  ${(props) => {
    return props.mt ? "margin-top:" + props.mt : "";
  }};

  .header-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 0 0 20px 0;
    border-bottom: 1px solid ${bgColors.whiteSmoke};
    align-items: flex-start;

    .input {
      width: 40px !important;
    }

    .tab {
      display: flex;
      gap: 4px;
      align-items: center;
      justify-content: space-between;
    }

    .title {
      font-size: 16px !important;
      padding-bottom: 22px;
    }

    .input-wrapper {
      display: flex;
      justify-content: space-between;
      gap: 5px;
      align-items: center;
      margin-bottom: 4px;
    }
  }
`;
