import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const FilterWrapper = styled.div`
  background: ${bgColors.white};
  padding: 20px;
  margin: 20px 40px;
  border-radius: 10px;
`;

export const HeaderWrapper = styled.div`
  margin: 20px 40px;
  padding: 20px;
  background: ${bgColors.white};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 12px;

  .title {
    font-size: ${fontSizes.f14};
    font-weight: 700;
    line-height: 1.2;
  }
`;
