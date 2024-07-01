import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { Input } from "antd";

const { TextArea }: { TextArea: any } = Input;
export const AsInput = styled(Input)<{ shadow?: any }>`
  border: 1px solid ${bgColors.purpleCrystal};
  box-shadow: 0 1px 1px ${bgColors.amnesia};
  border-radius: 6px;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  text-align: left;
  letter-spacing: -0.01em;
  color: ${textColors.dark};
  outline: none;
  ${({ shadow }) =>
    !!shadow
      ? css`
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
        `
      : css`
          border-color: unset !important;
        `}
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
    border-color: ${bgColors.primary};
    box-shadow: unset !important;
  }

  &:hover {
    border-color: ${bgColors.primary} !important;
  }
`;

export const AsPassword = styled(Input.Password)`
  border: 1px solid ${bgColors.purpleCrystal};
  box-shadow: 0 1px 1px ${bgColors.amnesia};
  border-radius: 6px;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  text-align: left;
  letter-spacing: -0.01em;
  color: ${textColors.dark};
  outline: none;
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
    border-color: ${bgColors.primary};
    box-shadow: unset !important;
  }

  &:hover {
    border-color: ${bgColors.primary} !important;
  }
`;

export const AsTextarea = styled(TextArea)`
  background: ${bgColors.yukon};
  border: 1px solid ${bgColors.purpleCrystal};
  box-shadow: 0 1px 1px ${bgColors.amnesia};
  border-radius: 6px;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  text-align: left;
  letter-spacing: -0.01em;
  color: ${textColors.dark};
  font-weight: 500;
  outline: none;
  font-family: Inter, sans-serif !important;
  resize: vertical;

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
    border-color: ${bgColors.primary};
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

  & input:disabled,
  & textarea:disabled {
    color: black;
  }

  & input,
  .ant-input,
  .ant-input-password {
    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 50px ${bgColors.yukon} inset !important; /* Change the color to your own background color */
      -webkit-text-fill-color: ${textColors.dark};
    }

    &:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0 50px ${bgColors.yukon} inset !important; /*your box-shadow*/
      -webkit-text-fill-color: ${textColors.dark};
      -webkit-text-emphasis-style: none !important;
    }

    font-family: Inter, sans-serif !important;
    font-weight: 500;
    color: ${textColors.dark} !important;
    line-height: 1.2 !important;

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

export const Label = styled.label<{ required?: boolean }>`
  font-size: ${fontSizes.f12};
  line-height: 15px;
  position: relative;
  margin-bottom: 10px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
`;
