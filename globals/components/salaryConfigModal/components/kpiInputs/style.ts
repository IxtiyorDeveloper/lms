import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;

  .teaching {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    font-family: "Space Grotesk", sans-serif !important;
    margin-top: 12px;
  }

  .teaching:first-of-type {
    margin-top: 0 !important;
  }

  .column {
    flex-direction: column;
    width: 100%;
  }

  .suffix {
    font-family: "Space Grotesk", sans-serif !important;
    font-weight: 400;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${textColors.brotherBlue};
  }

  .center {
    display: flex;
    align-items: center;
    justify-self: center;
  }
`;
