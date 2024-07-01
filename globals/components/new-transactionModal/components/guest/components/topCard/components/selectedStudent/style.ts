import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Left = styled.div`
  width: 60%;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Right = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
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

  .phone {
    color: ${textColors.soulfulBlue};
    font-size: ${fontSizes.f12};
    font-weight: 600;
    line-height: 1.5; /* 150% */
    letter-spacing: -0.12px;
  }
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .name {
    font-size: ${fontSizes.f12};
    color: ${textColors.sceptreBlue};
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
    letter-spacing: -0.12px;
  }
  .phone {
    font-weight: 400;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    color: ${textColors.yourShadow};
  }
`;
