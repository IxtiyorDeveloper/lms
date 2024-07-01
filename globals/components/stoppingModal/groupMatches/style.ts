import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 16px;

  .item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    gap: 8px;
    background: ${bgColors.primary};
    border-radius: 16px;
  }
`;

export const Item = styled.div<{
  color: string;
  opacity: number;
  textColor?: string;
}>`
  background-color: ${(p) => p.color}!important;
  opacity: ${(p) => p.opacity}!important;
  color: ${(p) => p.textColor || bgColors.black}!important;

  .info-box {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .index {
    font-weight: 700;
    font-size: ${fontSizes.f24};
    line-height: 1.2;
  }

  .info {
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 1.42;
    color: ${textColors.vermin};
  }

  .midori {
    color: ${textColors.spring}!important;
  }
`;
