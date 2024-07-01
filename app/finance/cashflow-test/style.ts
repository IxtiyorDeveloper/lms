import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin: 20px 40px;
  background-color: ${bgColors.white};
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 14px;

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
      & div:first-of-type {
        width: 11%;
        padding-left: 2%;
      }

      & div:nth-of-type(2) {
        width: 30.5%;
      }

      & div:nth-of-type(3) {
        width: 20%;
      }

      & div:nth-of-type(4) {
        width: 20%;
      }

      & div:nth-of-type(5) {
        width: 19%;
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

export const TableWrapper = styled.div`
  margin: 0 40px 20px 40px;
  padding: 0 21px 0 21px;
  table {
    border-collapse: collapse;
  }
`;
