import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  //gap: 10px;

  .ReactInputVerificationCode-container {
    display: flex;
    gap: 0.5rem;
  }

  .ReactInputVerificationCode-item {
    width: 37px;
    height: 37px;
    padding: 0;
    color: ${textColors.sceptreBlue};
    outline: 0;
    transition: box-shadow 0.2s ease-out;
    border: 1px solid ${bgColors.purpleCrystal};
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    text-align: center;
    letter-spacing: -0.01em;
  }

  .ReactInputVerificationCode-item:focus {
    border: 1px solid ${bgColors.primary};
  }
`;
