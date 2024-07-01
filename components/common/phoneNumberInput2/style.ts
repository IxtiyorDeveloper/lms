import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import PhoneInput2 from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { css } from "@emotion/react";

export const StyledPhoneInput = styled(PhoneInput2)<{ error?: string }>`
  .special-label {
    visibility: hidden;
  }

  .flag-dropdown {
    visibility: hidden;
  }

  input {
    background: ${bgColors.yukon}!important;
    background: ${bgColors.yukon}!important;
    border: 1px solid ${bgColors.purpleCrystal}!important;
    box-shadow: 0 1px 1px ${bgColors.amnesia}!important;
    border-radius: 6px !important;
    font-size: ${fontSizes.f12}!important;
    line-height: 1.2 !important;
    text-align: left !important;
    letter-spacing: -0.01em !important;
    padding-left: 10px !important;
    font-weight: 500 !important;
    outline: none !important;
    box-shadow: 0 1px 1px ${bgColors.amnesia} !important;
    color: ${textColors.dark} !important;
    height: 100% !important;
    min-height: 36px !important;
    width: 100% !important;

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
      border-color: ${(props) =>
        !!props.error ? bgColors.red : bgColors.primary};
    }

    &:hover {
      border-color: ${(props) =>
        !!props.error ? bgColors.red : bgColors.primary};
    }

    ${({ error }) =>
      !!error &&
      css`
        border-color: ${bgColors.red} !important;
      `}
  }
`;

export const Wrapper = styled.div<{ required: boolean; error?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;

  .phoneInput {
    background: ${bgColors.yukon};
    border: 1px solid ${bgColors.purpleCrystal};
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    padding: 10px;
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

    ${({ error }) =>
      !!error &&
      css`
        border-color: ${bgColors.red} !important;
      `}
  }
`;
