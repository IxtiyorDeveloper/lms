import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const PixelCardWrap = styled.div`
  max-width: 354px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  border-radius: 12px;
  padding: 14px;
  background: ${bgColors.white};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 -2px 10px 0 rgba(0, 0, 0, 0.05);

  .card_title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h4 {
      font-size: ${fontSizes.f12};
      line-height: 24px;
    }
  }
`;
