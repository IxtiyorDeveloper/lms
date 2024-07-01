import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const RedBadgeWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  .title {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
  }

  .badge-count {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1px 8px;
    background: ${bgColors.pop};
    border-radius: 40px;
    font-weight: 700;
    font-size: ${fontSizes.f12};
    letter-spacing: -0.01em;
    color: ${textColors.white};
  }
`;
