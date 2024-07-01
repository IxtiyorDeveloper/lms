import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TabItem = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;

  .active {
    path {
      fill: ${bgColors.primary};
    }
  }

  .inactive {
    path {
      fill: ${bgColors.yourShadow};
    }
  }

  .text {
    text-shadow: none !important;
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 700 !important;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
    flex: none;
    order: 1;
  }
  .fr-text {
    display: flex;
    gap: 12px;
    text-shadow: none !important;
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 700 !important;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
    flex: none;
    order: 1;
  }
`;
export const ActionsWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;

  .filters {
    display: flex;
    gap: 12px;

    .select {
      min-width: 100px;
    }
    .level-select {
      min-width: 200px;
      .ant-select-selection-item {
        max-width: 100px !important;
      }
      .ant-select-multiple .ant-select-selection-item-remove {
        width: 20px !important;
      }
    }

    .filter {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 40px;
      background: ${bgColors.primary};
      border-radius: 8px;
      cursor: pointer;

      .insideFilter {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .ant-segmented {
    fill: ${bgColors.deep} !important;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: ${textColors.yourShadow};
    flex: none;
    order: 1;
    flex-grow: 0;

    path {
      fill: ${bgColors.yourShadow} !important;
    }
  }

  .ant-segmented-item-selected {
    path {
      fill: ${bgColors.blueGray} !important;
    }
  }
`;
