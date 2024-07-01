import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div<{ isTabsVisible?: boolean }>`
  .segmented-content-container {
    background: ${bgColors.white};
    border-radius: 8px;
    margin-bottom: 3px !important;
    padding: 5px;
    visibility: ${(props) => (props?.isTabsVisible ? "unset" : "hidden")};
    .ant-segmented {
      padding: 0 !important;
    }
    .ant-segmented-item {
      background: ${bgColors.white};
      border-color: ${bgColors.white} !important;
      border-radius: 8px !important;
      overflow: hidden;
    }
    .ant-segmented-group {
      background: ${bgColors.white};
      visibility: ${(props) => (props?.isTabsVisible ? "unset" : "hidden")};
    }
    .ant-segmented-item-selected {
      background: ${bgColors.primary} !important;
    }
    .ant-segmented-thumb {
      background: ${bgColors.primary} !important;
      z-index: 2;
    }
  }
  .ant-badge .ant-badge-count {
    border-radius: 40px;
    background: ${bgColors.soulfulBlue} !important;
  }

  .ant-badge {
    border: 0 !important;
    outline: 0 !important;
  }
  #p-cell {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .basic-table-container {
    table td {
      border-bottom: 3px solid ${bgColors.whiteSmoke}!important;
      padding: 8px 0 !important;
    }
  }

  .percent {
    color: #090a0a;
    text-align: right;
    font-size: ${fontSizes.f12};
    font-weight: 500;
    line-height: 1.25;
    margin-right: 20px;
    display: flex;
  }

  .ml {
    position: relative;
    right: -16px;
  }

  .ant-progress-outer {
    width: 97% !important;

    .ant-progress-inner {
      width: 98% !important;
    }
  }

  .flex {
    display: flex;
    gap: 16px;
    align-items: center;
    padding: 6px 0;
    z-index: 11 !important;
  }

  .ant-table-cell {
    background: ${bgColors.white}!important;
    padding: 0 !important;
    .container {
      margin-top: 0 !important;
    }
  }
`;

export const Tool = styled.div`
  .item {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 4px;
    width: 200px;

    .percent {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      font-feature-settings:
        "clig" off,
        "liga" off;
      font-size: ${fontSizes.f12};
      font-weight: 400;
      line-height: 1.33;
      text-transform: capitalize;

      div {
        font-feature-settings:
          "clig" off,
          "liga" off;
        font-size: ${fontSizes.f12};
        font-weight: 700;
        line-height: 1.33;
      }
    }

    .color {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      background: #74c272;
    }

    .color.pop {
      background: ${bgColors.pop};
    }
    .color.primary {
      background: ${bgColors.primary};
    }
  }
`;

export const Arrow = styled.div<{ isOpen: boolean }>`
  transition: 0.3s;
  transform: rotate(${(props) => (props.isOpen ? "-180" : "-0")}deg);
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
`;
