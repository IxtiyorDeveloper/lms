import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;

  ul {
    list-style: none;

    li.active {
      background-color: ${bgColors.pop};
      border-radius: 0 5px 5px 0;
      color: ${bgColors.white};
      border-bottom: 1px solid ${bgColors.transparent};
    }

    li {
      font-weight: 500;
      cursor: pointer;
      padding: 5px 5px 5px 15px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1px solid ${bgColors.purpleCrystal};

      &:hover {
        background-color: ${bgColors.pop};
        border-radius: 0 5px 5px 0;
        color: ${bgColors.white};
        border-bottom: 1px solid ${bgColors.transparent};
      }

      span.number {
        font-family: "Space Grotesk", sans-serif !important;
        font-size: ${fontSizes.f12};
        font-weight: 500;
      }
    }
  }

  .count {
    width: 50%;

    img {
      position: absolute;
      bottom: -80px;
      height: 240px;
      right: -75px;
    }

    .number-count {
      position: absolute;
      font-size: 25px;
      font-weight: 500;
      font-family: "Space Grotesk", sans-serif !important;
      color: ${textColors.white};
      bottom: 26px;
      right: 25px;
    }
  }
`;
