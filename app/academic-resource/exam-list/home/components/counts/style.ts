import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background-color: ${bgColors.white};
  border-radius: 12px;
  padding: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  margin-bottom: 20px;

  .sector {
    position: relative;
    text-align: center;
    transition: 0.3s;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      transition: 0.3s;
      background-color: ${bgColors.whiteSmoke};
    }

    .count {
      font-size: ${fontSizes.f24};
      font-weight: 600;
      line-height: 1.3;
    }
    .count:nth-child(2) {
      font-size: ${fontSizes.f14};
      font-weight: 500;
    }

    .title {
      font-size: ${fontSizes.f16};
      font-weight: 400;
      color: ${textColors.yourLighter};
      line-height: 1.7;
    }

    .hr {
      position: absolute;
      top: 10%;
      left: 1px;
      width: 1px;
      height: 80%;
      background-color: ${bgColors.purpleCrystal};
    }
  }
`;
