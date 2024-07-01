import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 2px;
  display: flex;
  gap: 12px;

  .iconWr {
    display: flex;
    width: 32px;
    height: 32px;
    padding: 6px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    border-radius: 24px;
    background: ${bgColors.royal};
  }

  .right {
    .title {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f14};
      font-style: normal;
      font-weight: 700;
      line-height: 18px; /* 128.571% */
      letter-spacing: 0.1px;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    .description {
      color: ${textColors.brotherBlue};
      font-size: ${fontSizes.f12};
      font-style: normal;
      font-weight: 400;
      line-height: 1.2; /* 133.333% */
      letter-spacing: 0.1px;
      margin-top: 4px;

      a {
        color: ${textColors.blueGray};
        font-size: ${fontSizes.f12};
        font-style: normal;
        font-weight: 400;
        line-height: 1.2;
        letter-spacing: 0.1px;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
