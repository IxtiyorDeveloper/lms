import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const SelectWrapper = styled.div`
  width: fit-content !important;
  position: relative;
  .ant-select-dropdown {
    min-width: 200px !important;
  }
  .ant-select-single {
    height: 24px;
    font-size: ${fontSizes.f12};
  }
  .wrapper-icon,
  .ant-select-selector {
    border-radius: 20px;
    background: ${bgColors.fluorescent} !important;
  }
  .ant-select-selector {
    padding: 0 !important;
  }
  .ant-select:hover .ant-select-clear {
    background: ${bgColors.fluorescent} !important;
  }
  .ant-select-selector input,
  .ant-select-selector .ant-select-selection-search-input,
  .ant-select-selection-placeholder,
  .ant-select .ant-select-arrow,
  .ant-select .ant-select-clear {
    color: ${textColors.blueGray} !important;
  }
  .ant-select-single.ant-select-show-arrow .ant-select-selection-item,
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    padding-inline-end: 24px;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-search {
    inset-inline-start: 0;
    inset-inline-end: 0;
  }
`;
