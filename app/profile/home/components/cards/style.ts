import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-top: 43px;
`;

export const Card = styled.div<{ color: string }>`
  border-radius: 20px;
  background: ${(props) => props.color};
  padding: 20px;
  cursor: pointer;

  .circle {
    border-radius: 30px;
    background: ${bgColors.white};
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bottom {
    margin-top: 20px;

    .label {
      color: ${bgColors.white};
      font-feature-settings: "clig" off, "liga" off;
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 400;
      line-height: 1.5; /* 157.143% */
    }

    .result {
      color: ${bgColors.white};
      font-size: ${fontSizes.f18};
      font-style: normal;
      font-weight: 700;
      line-height: 1.3; /* 133.333% */
    }
  }
`;
