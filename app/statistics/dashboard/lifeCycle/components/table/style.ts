import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;

  .skeleton {
    width: 100%;
    padding: 0 30px;

    span {
      height: 200px;
      transform: scale(1, 0.9);
      width: 100%;
    }
  }

  .items {
    width: 100%;
    padding: 0 30px;

    .ant-steps-item-description {
      padding-bottom: 20px !important;
    }

    .ant-steps-item-tail {
      inset-inline-start: 16px !important;
      z-index: 1;
      width: 2px !important;

      &:after {
        background: ${bgColors.purpleCrystal} !important;
        width: 2px !important;
      }
    }

    .ant-steps-item-icon {
      background: ${bgColors.yourShadow} !important;
      width: 34px !important;
      height: 34px !important;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;

      .ant-steps-icon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .pagination {
      padding: 20px 0;

      .pagination-wrapper {
        background: ${bgColors.white};
        border-radius: 12px;
      }
    }
  }
`;
export const CardWrapper = styled.div`
  background: ${bgColors.white};
  padding: 16px 20px;
  border: 1px solid ${bgColors.whiteSmoke};
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  width: 100%;

  .mt18 {
    margin-top: 18px;
  }

  .note-wrapper {
    margin-top: 18px;

    .label {
      font-weight: 500;
      font-size: ${fontSizes.f12};
      line-height: 1.2;
      letter-spacing: -0.01em;
      color: ${textColors.yourShadow};
      margin-bottom: 8px;
    }

    .note {
      font-weight: 500;
      font-size: ${fontSizes.f12};
      line-height: 1.2;
      letter-spacing: -0.01em;
      color: ${textColors.blueGray};
      background: #f4f5f6;
      box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.08);
      border-radius: 6px;
      padding: 12px 14px;
      min-height: 60px;
    }
  }

  .audio {
    margin-top: 18px;

    audio {
      height: 40px;
    }
  }
`;
export const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .more-info {
    cursor: pointer;
    padding: 0 5px;
  }

  .p-info {
    display: flex;
    align-items: center;
    gap: 14px;

    .cr-by {
      display: flex;
      gap: 8px;

      p {
        font-weight: 500;
        font-size: ${fontSizes.f12};
        line-height: 1.2;
        letter-spacing: -0.01em;
        color: ${textColors.yourShadow};
      }
    }

    .box {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 4px 10px 4px 5px;
      gap: 8px;
      background: ${bgColors.whiteSmoke};
      box-shadow: inset 0 0 1px rgba(177, 181, 196, 0.5);
      border-radius: 40px;

      p {
        font-weight: 500;
        font-size: ${fontSizes.f12};
        line-height: 1.2;
        letter-spacing: -0.01em;
        color: ${textColors.blueGray};
      }
    }
  }

  .date {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.yourShadow};
  }

  .left {
    display: flex;
    gap: 17px;
    align-items: center;

    .label {
      display: flex;
      gap: 8px;

      p {
        font-weight: 500;
        font-size: ${fontSizes.f12};
        line-height: 1.2;
        letter-spacing: -0.01em;
        color: ${textColors.yourShadow};
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 4px;

      .type {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 4px 10px;
        background: ${bgColors.whiteSmoke};
        box-shadow: inset 0 0 1px #b1b5c4;
        border-radius: 20px;
        font-weight: 500;
        font-size: ${fontSizes.f12};
        line-height: 1.2;
        letter-spacing: -0.01em;
        color: ${textColors.blueGray};
      }

      .act {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 4px 10px;
        background: ${bgColors.bonnie};
        box-shadow: inset 0 0 1px #fdbf76;
        border-radius: 20px;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -0.01em;
        color: #b4400f;
      }
    }
  }
`;
