import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div<{ isAccepted: boolean }>`
  .country {
    display: flex;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.brotherBlue};
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 12px;
  }

  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: ${(props) =>
    props.isAccepted ? textColors.whiteSmoke : textColors.sceptreBlue};
  text-align: center;

  ${(props) =>
    props.isAccepted
      ? `
        div:nth-of-type(2) {
          margin-top: 12px;
        }
    `
      : `
        div:nth-of-type(2) {
          margin-top: 12px;
          font-family: 'Roboto Mono', monospace;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          letter-spacing: -0.01em;
          color: ${textColors.purpleCrystal};
        }
    `}
`;
