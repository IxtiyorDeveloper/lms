import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { css } from "@emotion/react";
import { Select } from "antd";

export const Wrapper = styled.div<{
  error: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  position: relative;

  & input:disabled,
  & textarea:disabled {
    color: black;
  }

  & input,
  .ant-input,
  .ant-input-password {
    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 50px #f7f7f7 inset !important; /* Change the color to your own background color */
      -webkit-text-fill-color: ${textColors.dark};
    }

    &:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 50px #f7f7f7 inset !important; /*your box-shadow*/
      -webkit-text-fill-color: ${textColors.dark};
      -webkit-text-emphasis-style: none !important;
    }
    font-family: Inter, sans-serif !important;
    font-weight: 500;
    color: ${textColors.dark} !important;

    ${({ error }) =>
      !!error &&
      css`
        border-color: ${bgColors.red} !important;
      `}
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;
export const AntSelect: any = styled(Select)<{ bgcolor?: string }>`
  .ant-select-selector {
    font-size: ${fontSizes.f12};
    border: 1px solid ${bgColors.purpleCrystal} !important;
    box-shadow: 0 1px 1px ${bgColors.amnesia} !important;
    font-weight: 500 !important;
    &:hover {
      border-color: ${bgColors.primary} !important;
    }
  }
`;
export const Label = styled.label<{ required?: boolean }>`
  font-size: ${fontSizes.f12};
  line-height: 15px;
  position: relative;
  margin-bottom: 10px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
`;
