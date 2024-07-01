import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const RoundedTabWrapper = styled.div`
  .tabs {
    background-color: ${bgColors.wildSand};
    border-radius: 12px 12px 0 0;
    /* overflow: auto !important; */
  }
  .tabs .tab {
    background: ${bgColors.wildSand} !important;
    padding: 0 !important;
  }
  .tabs .active .tab:after,
  .tabs .active .tab:before,
  .tabs .tab .button,
  .tabs .tab {
    background-color: ${bgColors.wildSand} !important;
  }
  .button {
    height: 100%;
    min-width: 200px;
  }
  .tabs .active .tab .button {
    border-radius: 12px 12px 0 0 !important;
    background-color: ${bgColors.primary} !important;
  }
  .tabs .tab .button {
    padding: 6px !important;
  }
`;
export const Label = styled.div`
  text-align: center;
  h4 {
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
  }
  p {
    font-size: ${fontSizes.f10};
    font-weight: 500;
  }
`;
