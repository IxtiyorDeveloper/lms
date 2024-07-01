import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .kpi {
    font-size: ${fontSizes.f24};
    font-weight: 500;
    margin: 0 20px 9px 20px;
    color: ${textColors.white} !important;

    .green {
      color: ${textColors.white};
    }
  }

  .textFont {
    font-family: "Space Grotesk", sans-serif !important;
  }

  .img {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 22px 40px 0;
  }
`;
