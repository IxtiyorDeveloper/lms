import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .start {
    display: flex;
    align-items: flex-start !important;
  }

  .cards-wrapper {
    display: flex;
    gap: 10px;
    margin: 0 16px;
    justify-content: space-between;

    .number {
      color: ${textColors.white};
      font-weight: 600;
      font-size: ${fontSizes.f20};
    }
  }
`;
