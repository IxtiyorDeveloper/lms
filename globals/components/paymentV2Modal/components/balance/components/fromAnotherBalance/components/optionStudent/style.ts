import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Left = styled.div`
  width: 70%;
  display: flex;
  gap: 11px;
`;

export const Right = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  .studying {
    font-weight: 600;
    font-size: ${fontSizes.f10};
    line-height: 12px;
    color: ${textColors.secondary};
    padding: 3px 8px;
    background-color: ${bgColors.transparentGreen};
    width: fit-content;
    border-radius: 10px;
  }
  .group {
    font-weight: 600;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    color: ${textColors.yourShadow};
    padding: 4px 8px;
    background-color: ${bgColors.whiteSmoke};
    border-radius: ${borders.b10};
    width: fit-content;
  }
`;

export const Content = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .name {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    color: ${textColors.blueGray};
  }
  .phone {
    font-weight: 400;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    color: ${textColors.yourShadow};
  }
`;
