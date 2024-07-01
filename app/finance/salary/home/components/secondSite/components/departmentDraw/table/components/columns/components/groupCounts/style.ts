import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const FullNameWrapper = styled.div`
  p {
    color: ${textColors.blueGray};
    font-weight: 600;
    font-size: ${fontSizes.f12};
  }

  .btr {
    display: flex;
    gap: 4px;
    margin-top: 3px;

    .count {
      display: flex;
      padding: 2px 6px;
      justify-content: center;
      align-items: center;
      border-radius: 40px;
      background: ${bgColors.blueGray};
      gap: 4px;
      width: fit-content;

      p {
        color: ${textColors.brilliance};
        text-align: center;
        font-size: ${fontSizes.f10};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.08px;
      }
    }
  }
`;
