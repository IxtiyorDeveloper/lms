import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 16px;
  width: 100%;
  background: ${bgColors.brilliance};
  box-shadow: inset 0 0 12px ${bgColors.whiteSmoke};
  border-radius: 8px;

  .flex {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .filter-container {
    display: flex;
    gap: 12px;
  }

  .select-container {
    width: 184px;
  }
`;

export const CustomTooltip = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 8px;
  gap: 6px;

  width: 180px;
  min-width: 100px;

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
    width: 100%;
    .title {
      font-size: ${fontSizes.f10};
      line-height: 1.25;
      white-space: nowrap;
      margin-left: 6px;
      font-weight: 500;
      text-align: center;
      letter-spacing: 0.02em;
      color: ${textColors.whiteSmoke};
    }

    .green {
      background-color: ${bgColors.midori}!important;
    }

    .color {
      width: 8px;
      height: 8px;
      background: ${bgColors.midori};
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
    gap: 4px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .flex {
    display: flex;
    padding: 8px;
    background: #23262f;
    border-radius: 4px;
  }

  .mt {
    margin-top: 4px;
  }

  .Departure {
    background-color: #e92857 !important;
  }
  .Transfer {
    background-color: #4663db !important;
  }
`;
