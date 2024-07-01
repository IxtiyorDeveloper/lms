import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
  margin-top: -12px;
  padding: 0 20px !important;

  .btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 8px;
    gap: 6px;
    min-width: 36px !important;
    min-height: 36px !important;
    background: ${bgColors.midori};
    box-shadow: inset 0px 0px 4px 1px rgba(255, 255, 255, 0.2);
    border-radius: 6px;
  }

  .voice {
    background-color: ${bgColors.sceptreBlue};
    box-shadow: unset;
  }

  .PhoneInputInput {
    background-color: ${bgColors.blueGray} !important;
    border: 1px solid ${bgColors.sceptreBlue} !important;
    font-family: "Space Grotesk" !important;
    font-weight: 500 !important;
    font-size: 18px !important;
    line-height: 30px !important;
    letter-spacing: -0.01em !important;
    color: ${textColors.purpleCrystal} !important;
    width: 216px !important;
  }
`;
