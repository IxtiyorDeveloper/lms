import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TopSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 10px 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};

  .btn-info {
    background-color: ${bgColors.deep};
    color: ${textColors.white};
    box-shadow: 0 3px 4px 0 #87a5ff inset;
  }
`;

export const Title = styled.h1`
  font-size: ${fontSizes.f14};
  font-weight: 700;
`;
