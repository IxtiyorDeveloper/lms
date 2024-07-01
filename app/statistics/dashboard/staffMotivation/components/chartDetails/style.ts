import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .details {
    min-width: 422px;
    //max-height: calc(100vh - 500px);
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
