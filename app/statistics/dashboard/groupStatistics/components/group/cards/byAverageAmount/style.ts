import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  grid-column: 1/3;
  border-radius: 12px;
  padding: 20px;
  background: ${bgColors.brilliance};
  box-shadow: 0 0 12px 0 #f4f5f6 inset;
`;

export const Title = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 700;
  line-height: 20px;
`;

export const Card = styled.div`
  width: 100%;
  background: ${bgColors.white};
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export const CardsWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding-top: 20px;
`;

export const FormatWrapper = styled.div`
  font-size: ${fontSizes.f12};

  .mb-a {
    margin-bottom: 2px;
    font-size: ${fontSizes.f12};
    font-weight: 400;
    color: ${bgColors.yourShadow};
    line-height: 20px;
  }

  .nums {
    font-size: ${fontSizes.f14};
    font-weight: 500;
    font-family: "Space Grotesk", sans-serif !important;
    line-height: 20px;
  }
`;
