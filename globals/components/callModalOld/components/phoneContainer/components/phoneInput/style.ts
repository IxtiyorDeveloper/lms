import styled from "@emotion/styled";
import { textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;

  input,
  .PhoneInputInput {
    background-color: transparent !important;
    border: 0 !important;
    outline: 0 !important;
    font-family: "Space Grotesk", serif !important;
    font-style: normal !important;
    font-weight: 700 !important;
    font-size: 24px !important;
    line-height: 30px !important;
    letter-spacing: -0.01em !important;
    color: ${textColors.purpleCrystal}!important;
    width: 100%;
  }

  input:hover,
  input:active {
    border: 0;
    outline: 0;
  }

  .svg {
    margin-top: 8px;
    cursor: pointer;
  }
`;
