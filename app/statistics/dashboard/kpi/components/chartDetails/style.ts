import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .wrapper-chart {
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    display: flex;
    align-items: center;

    @media (max-width: 1150px) {
      flex-direction: column;
    }
  }

  .flex-center {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .details {
    width: 100%;
    max-height: 50vh;
    background-color: ${bgColors.brilliance};
    box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    padding: 20px;
    overflow-y: auto;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 13px 0;
      border-bottom: 1px solid ${bgColors.whiteSmoke};

      .flex {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .dot {
        height: 10px;
        width: 10px;
        border-radius: 50%;
      }

      .numbers {
        gap: 22px;
        justify-content: flex-end;
        width: 60%;
        font-family: "Space Grotesk", sans-serif !important;
        font-weight: 500;
        font-size: ${fontSizes.f14};

        .percent {
          background-color: ${bgColors.midori};
          font-size: ${fontSizes.f12};
          padding: 2px 4px;
          border-radius: 2px;
          color: ${textColors.white};
        }
      }
    }
  }
`;
