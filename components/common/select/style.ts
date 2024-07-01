import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Select } from "antd";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const AntSelect: any = styled(Select)<{ bgcolor?: string }>`
  .ant-select-selector {
    font-size: ${fontSizes.f12};
    background: ${bgColors.yukon} !important;
    border: 1px solid ${bgColors.purpleCrystal} !important;
    box-shadow: 0 1px 1px ${bgColors.amnesia} !important;
    background-color: ${({ bgcolor }) =>
      bgcolor ? bgcolor : bgColors.yukon} !important;
    font-weight: 500 !important;
    &:hover {
      border-color: ${bgColors.primary} !important;
    }
  }
`;
export const Wrapper = styled.div<{ error: string; required: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100% !important;
  position: relative;
  .ant-select-single .ant-select-selector .ant-select-selection-item {
    position: relative;
    user-select: none;
    color: ${textColors.blueGray};
    font-weight: 500;
    font-size: ${fontSizes.f12};
  }
  .ant-select-selector {
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
export const Label = styled.label<{ required: boolean }>`
  font-size: ${fontSizes.f12};
  line-height: 15px;
  position: relative;
  margin-bottom: 10px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px 0 7px;
`;
