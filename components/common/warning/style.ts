import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors, borders } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: auto;
  //background: ${bgColors.white};
  //box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  //border-radius: ${borders.b6};
  //padding: 10px;
`;

export const Info = styled.div`
  padding: 10px;
  display: flex;
  background-color: ${bgColors.orange};
  border-radius: 8px;
  align-items: center;
  .text {
    color: ${textColors.white};
    font-size: ${fontSizes.f12};
    padding: 1px 4px;

    .next {
      background: ${bgColors.midori};
      padding: 3px;
      border-radius: 3px;
      margin-inline: 3px;
    }
    .current {
      background: ${bgColors.pop};
      padding: 3px;
      border-radius: 3px;
      margin-inline: 3px;
    }
  }
`;
