import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .kpi {
    font-size: ${fontSizes.f24};
    font-weight: 500;
    margin: 0 20px 9px 20px;
    color: ${textColors.white} !important;

    .green {
      color: ${textColors.pearl};
    }
  }

  .textFont {
    font-family: "Space Grotesk", sans-serif !important;
  }
`;
