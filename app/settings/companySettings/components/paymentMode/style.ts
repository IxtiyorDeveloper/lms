import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin-top: 32px;
`;
export const Label = styled.div`
  font-size: ${fontSizes.f12};
  line-height: 15px;
  position: relative;
  margin-bottom: 10px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: #353945;
  font-family: "Inter", sans-serif;
`;
export const Items = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
`;
export const ItemWrapper = styled.div`
  cursor: pointer;

  p {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${textColors.dark};
    margin-top: 8px;
  }
`;
export const Item = styled.div`
  width: fit-content;
  position: relative;
  border-radius: ${borders.b6};

  &.inactiveWrapper {
    background-color: ${bgColors.whiteSmoke};
  }
  .check {
    position: absolute;
    width: 20px;
    height: 20px;
    top: -8px;
    right: -8px;
    background-color: ${bgColors.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
`;
export const ImageWrapper = styled.div`
  width: fit-content;
  overflow: hidden;
  border: 2px solid ${bgColors.whiteSmoke};
  border-radius: ${borders.b6};
  padding: 16px;

  &.active {
    border-color: ${bgColors.primary};
  }

  .bgImage {
    width: 100%;
    background-position: center;
    background-size: cover;

    &.white {
      background-color: ${bgColors.white};
    }

    &.dark {
      background-color: ${bgColors.dark};
    }
  }

  .top {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${textColors.dark};
  }

  .center {
    font-weight: 700;
    font-size: ${fontSizes.f16};
    line-height: 19px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${textColors.dark};
    margin-top: 30px;
    margin-bottom: 14px;
  }
`;
