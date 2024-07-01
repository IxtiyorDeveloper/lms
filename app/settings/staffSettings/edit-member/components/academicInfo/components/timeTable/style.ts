import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TableWrapper = styled.div`
  table {
    border-radius: 6px;
  }
  table td,
  table th {
    border-bottom: 1px solid #e5e9eb !important;
  }
`;
export const Header = styled.div`
  display: inline-flex;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 4px 0;

  .info {
    background: ${bgColors.whiteSmoke};
    padding: 8px 16px 8px 12px;
    width: 100%;
    text-align: left;
  }

  .today {
    background: linear-gradient(90deg, #ff5858 0%, #f09819 100%);
    width: 100%;
    height: 100%;
    padding: 8px 16px 8px 12px;
    color: ${textColors.brilliance};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 166.667% */
    letter-spacing: -0.12px;
    border-radius: 4px;
  }

  .not-today {
    width: 100%;
    padding: 8px 16px 8px 12px;
    background: ${bgColors.whiteSmoke};
    border-radius: 4px;
  }
`;

export const Cell = styled.div`
  padding: 10px 0 10px 14px;
  display: flex;
  align-items: center;

  .time {
    color: ${textColors.dark};
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 166.667% */
    letter-spacing: -0.12px;
    text-align: left;
  }
`;

export const BodyCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1px;
  .accepted {
    background: ${bgColors.midori};
    color: ${textColors.brilliance};
  }
  .waiting {
    background: ${bgColors.primary};
    color: ${textColors.dark};
    font-weight: 600;
  }
  .empty {
    &.after {
      background: ${bgColors.whiteSmoke};
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.02) inset;
    }
    &.before {
      background: ${bgColors.purpleCrystal};
      color: ${textColors.yourShadow};
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.02) inset;
    }
  }
  .disabled {
    background: ${bgColors.purpleCrystal};
  }
`;

export const AsButton = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  padding: 7px 19px;
  justify-content: center;
  align-items: center;
  color: ${textColors.dark};
  text-align: justify;
  font-feature-settings: "clig" off, "liga" off;
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 6px;
  background: ${bgColors.purpleCrystal};
  gap: 4px;
  user-select: none;
  .name {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const ExamWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 6px;
  display: flex;
  align-items: center;
  .content {
    &.after {
      width: 100%;
      border-radius: 6px;
      background: ${bgColors.adamantine};
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4.5px;
      gap: 4px;

      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
        background: ${bgColors.eye};
        border-radius: 4px;
      }

      .name {
        color: ${textColors.brilliance};
        text-align: justify;
        font-feature-settings: "clig" off, "liga" off;
        font-size: ${fontSizes.f12};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }

    &.before {
      background: ${bgColors.purpleCrystal};

      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
        background: ${bgColors.soulfulBlue};
        border-radius: 4px;
      }

      .name {
        color: ${bgColors.soulfulBlue};
        text-align: justify;
        font-feature-settings: "clig" off, "liga" off;
        font-size: ${fontSizes.f12};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  }
`;
