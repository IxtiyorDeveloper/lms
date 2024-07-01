import { Empty, Select } from "antd";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { bgColors, fontSizes } from "styles/theme";

export const EmptyIcon = styled(Empty)`
  .ant-empty-image {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;

    svg {
      height: 50px !important;
    }
  }
  .ant-empty-description {
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    margin: 0 !important;
  }
`;

export const AntSelect: any = styled(Select)`
  .ant-select-selector {
    background: ${bgColors.yukon}!important;
    border: 1px solid ${bgColors.purpleCrystal}!important;
    box-shadow: 0 1px 1px ${bgColors.amnesia}!important;
    background-color: ${bgColors.yukon} !important;
    height: auto;
    &:hover {
      border-color: ${bgColors.primary}!important;
    }
  }
`;

export const Wrapper = styled.div<{ error: string; required: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100% !important;
  position: relative;

  .ant-select-single .ant-select-selector .ant-select-selection-item {
    line-height: unset;
    display: flex;
    padding-inline-end: 18px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .ant-select-selector {
    min-height: 36px !important;
    height: auto !important;
    ${({ error = "" }) =>
      error &&
      css`
        border-color: red !important;
      `}
  }

  &::after {
    ${({ required = false }) =>
      required &&
      css`
        position: absolute;
        content: "*";
        font-size: 20px;
        color: #ff4d4f;
        right: -10px;
        top: -10px;
      `}
  }

  .wrapper-icon {
    background-color: ${bgColors.yukon};
    border-radius: 6px;
    display: flex;
    border: 1px solid ${bgColors.purpleCrystal};

    &:focus {
      border: 1px solid ${bgColors.primary};
    }

    & .ant-select-selector {
      border: 1px solid ${bgColors.transparent} !important;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
`;
