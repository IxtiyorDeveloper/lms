import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { InputNumber } from "antd";

export const AsInput = styled(InputNumber)`
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 6px;
  font-size: ${fontSizes.f12};
  text-align: left;
  letter-spacing: -0.01em;
  color: ${textColors.dark};
  font-weight: 600;
  outline: none;

  .ant-input-number-handler-wrap {
    display: none !important;
  }

  ::placeholder {
    color: ${textColors.brotherBlue};
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: ${textColors.brotherBlue};
  }

  ::-ms-input-placeholder {
    color: ${textColors.brotherBlue};
  }

  &:focus {
    border-color: ${bgColors.primary}!important;
  }
  &:hover {
    border-color: ${bgColors.primary}!important;
  }
`;

export const Wrapper = styled.div<{
  required: boolean;
  error: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  .grotesk {
    &.er {
      border-color: ${bgColors.red};
    }
  }
  & input:disabled,
  & textarea:disabled {
    color: black;
  }
  .ant-input-number {
    width: 100% !important;
  }
  .ant-input-number-group-wrapper {
    border: none !important;
  }
  .ant-input-number-input {
    font-weight: 500 !important;
  }
  & input,
  .ant-input-password {
    height: fit-content !important;
    ${({ error }) =>
      !!error &&
      css`
        border-color: ${bgColors.red} !important;
      `}
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
