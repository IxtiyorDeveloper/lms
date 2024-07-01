import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div<{ background: string }>`
  height: 64px;
  background: ${bgColors.dark};
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding: 12px 14px;
  gap: 12px;

  .card {
    width: 100%;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.yourShadow};
  }

  .icon {
    width: 40px;
    height: 40px;
    background: ${(props) => props.background};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .title {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 20px;
    letter-spacing: -0.01em;
    color: ${bgColors.purpleCrystal};
  }

  .desc {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;
