import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const StudentWrapper = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  .flex-container {
    display: flex;
    gap: 20px;
    height: 100%;

    & > div {
      width: 100%;
    }

    & > .ant-spin-nested-loading {
      width: 50%;
      min-width: 200px;
      height: 400px !important;

      .ant-spin-container {
        height: 100%;
      }
    }
    @media (max-width: 1200px) {
      flex-wrap: wrap;

      .ant-spin-nested-loading {
        width: 100%;
      }
    }
  }
`;

export const CustomTooltip = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 8px;
  gap: 6px;

  width: 140px;
  min-width: 100px;

  background: ${bgColors.black};
  border-radius: 8px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  color: ${textColors.white};

  .item {
    display: flex;
    flex-direction: column;

    .title {
      font-size: ${fontSizes.f12};
      font-weight: 400;
      line-height: 1.25;
      letter-spacing: -0.01em;
      white-space: nowrap;
    }

    .green {
      background-color: ${bgColors.midori}!important;
    }

    .color {
      width: 8px;
      height: 8px;
      background: ${bgColors.midori};
      border-radius: 50%;
      margin-top: 4px;
    }

    .count {
      font-family:
        Space Grotesk,
        sans-serif;
      font-size: ${fontSizes.f12};
      font-weight: 500;
      line-height: 1.25;
      letter-spacing: 0.02em;
    }
  }

  .child {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .flex {
    display: flex;
    align-items: flex-start;
  }
`;
