import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  min-width: 100px;
  display: flex;
  gap: 4px;
  cursor: pointer;

  p {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
  }
`;

export const TooltipWrapper = styled.div`
  padding: 10px;

  .title {
    font-size: ${fontSizes.f14};
    font-weight: 500;
    line-height: 1.2;
    text-align: left;
    padding: 8px 8px 6px;
    color: ${textColors.white};
  }

  .item {
    padding: 8px;
    min-width: 250px;
    border-bottom: 1px solid ${textColors.inDark};

    &:last-of-type {
      border-bottom: none;
    }

    .label {
      font-size: ${fontSizes.f12};
      font-weight: 400;
      line-height: 1.2;
      text-align: left;
      color: ${textColors.harrison};
    }

    .value {
      font-size: ${fontSizes.f12};
      line-height: 1.2;
      text-align: left;
      color: ${textColors.white};
      font-weight: 400;
    }

    .info {
      font-weight: 500;
      color: ${textColors.white};
    }
  }
`;
