import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  grid-column: 1/3;
`;

export const CustomTooltip = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 8px;
  gap: 6px;

  width: 128px;
  min-width: 100px;
  height: 96px;

  background: ${bgColors.black};
  border-radius: 8px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  color: ${textColors.white};

  .item {
    display: flex;
    flex-direction: column;

    .title {
      font-size: ${fontSizes.f12};
      font-weight: 400;
      line-height: 1.25;
      letter-spacing: -0.01em;
      white-space: nowrap;
    }

    .green {
      background-color: ${bgColors.midori} !important;
    }

    .color {
      width: 8px;
      height: 8px;
      background: #fece00;
      border-radius: 50%;
      margin-top: 4px;
    }

    .count {
      font-family:
        Space Grotesk,
        sans-serif;
      font-size: ${fontSizes.f12};
      font-weight: 500;
      line-height: 1.25;
      letter-spacing: 0.02em;
    }
  }

  .child {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .flex {
    display: flex;
    align-items: flex-start;
  }
`;
