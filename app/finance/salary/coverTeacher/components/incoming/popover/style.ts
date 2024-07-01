import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 6px 14px;
`;
export const Row = styled.div<{ hasBorder: boolean }>`
  border-bottom: ${(props) =>
    props?.hasBorder ? `1px solid ${bgColors.whiteSmoke}` : "none"};
  display: flex;
  padding: 13px 0;
  align-items: center;
  .group-name {
    color: ${textColors.yourShadow};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 600;
    line-height: 1.5; /* 166.667% */
    letter-spacing: -0.12px;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100px;
  }
  .time {
    color: ${textColors.yourShadow};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: 1.5; /* 166.667% */
    letter-spacing: -0.12px;
    margin-left: 30px;
  }

  .amount {
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.12px;
    color: ${textColors.pop};
    font-size: ${fontSizes.f12};
    margin-left: 27px;

    &.covered {
      color: ${textColors.midori};
    }
    &.zero {
      color: ${textColors.yourShadow};
    }
  }
  .image-wr {
    margin-left: 20px;
  }
`;
