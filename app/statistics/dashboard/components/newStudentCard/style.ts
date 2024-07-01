import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .cards-wrapper {
    display: flex;
    gap: 10px;
    margin: 0 16px;

    .card {
      padding: 10px;
      width: 100%;
      text-align: center;
      background: rgba(180, 166, 241, 0.1);
      box-shadow: 0 0 10px #6f56df;
      border-radius: 4px;

      .number {
        color: ${textColors.white};
        font-weight: 600;
        font-size: ${fontSizes.f16};
      }

      .text {
        color: #cdc3fe;
      }
    }
  }

  .textFont {
    font-family: "Space Grotesk", sans-serif !important;
  }
`;
