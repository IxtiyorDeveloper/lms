import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin: 20px 40px;
  background-color: ${bgColors.white};
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 14px;

  .last {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 20px;
    justify-content: flex-end;

    .flex {
      display: flex;
      gap: 8px;
      align-items: center;
    }
  }

  .ten {
    width: 25%;
  }

  .ten:first-of-type {
    width: 5%;
  }

  .head {
    padding: 8px;
    border-bottom: 1px solid ${bgColors.purpleCrystal};

    .flex-cash {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .title-cash {
      font-size: ${fontSizes.f14};
      font-weight: 700;
      color: ${textColors.sceptreBlue};
    }

    .total {
      border-radius: 8px;
      border: 1px solid ${bgColors.whiteSmoke};
      background: ${bgColors.brilliance};
      display: flex;
      flex: 1;
      padding: 15px 20px;
      justify-content: space-between;

      color: ${textColors.blueGray};
      font-size: ${fontSizes.f14};
      font-weight: 500;
      letter-spacing: -0.14px;

      .value {
        color: ${textColors.blueGray};
        //font-family: Space Grotesk, serif;
        font-size: ${fontSizes.f16};
        font-weight: 700;
        letter-spacing: -0.16px;
      }
    }
  }

  .bottom {
    padding: 20px;
    position: relative !important;

    .expandable {
      z-index: 3 !important;
    }

    .expandable * {
      font-size: ${fontSizes.f10};
    }

    .flex-table-header {
      display: flex;
      position: sticky !important;
      top: 200px;
      z-index: 10;
      justify-content: flex-start;
      background-color: ${bgColors.whiteSmoke};
      border-radius: 6px;
      padding: 8px 0;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05);
      margin-top: -8px;

      .item {
        font-size: 12px !important;
        font-weight: 400 !important;
        line-height: 20px !important;
        letter-spacing: -0.01em !important;
      }

      .item-innner {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;

        align-self: center;
        margin-top: 3px;

        .label {
          font-size: 12px !important;
          font-weight: 400 !important;
          letter-spacing: -0.01em !important;
          color: ${textColors.black};
        }
      }

      .item:first-of-type {
        width: 11%;
        padding-left: 22px;
      }

      .item:nth-of-type(2) {
        width: 29.5%;
        padding-left: 32px;
      }

      .item:nth-of-type(3) {
        width: 19%;
      }

      .item:nth-of-type(4) {
        width: 19%;
      }

      .item:nth-of-type(5) {
        width: 20%;
      }
    }
  }
`;

const colors: any = {
  blue: {
    color: "deep",
    boxShadow: "inset 0 0 4px #87a5ff",
  },
  midori: {
    color: "midori",
    boxShadow: "inset 0 0 4px #44B26B",
  },
};

export const PercentWrapper = styled.span<{ color: string }>`
  font-size: ${fontSizes.f10};
  color: ${textColors.brilliance};
  font-weight: 600;
  background-color: ${({ color }) =>
    bgColors[colors[color].color as keyof typeof bgColors]};
  box-shadow: ${({ color }) =>
    colors[color === bgColors.sceptreBlue ? "midori" : "blue"]?.boxShadow};
  border-radius: 2px;
  padding: 2px 4px;
`;

export const CategoryName = styled.span<{ department?: boolean }>`
  font-size: ${fontSizes.f12};
  color: ${({ department }) =>
    department ? textColors.brilliance : textColors.blueGray};
  font-weight: 500;
  min-width: 100px;
  text-transform: ${({ department }) => (department ? "uppercase" : "unset")};
  white-space: nowrap;
  flex-wrap: nowrap;
`;
