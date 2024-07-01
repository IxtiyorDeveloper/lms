import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background-color: ${bgColors.brilliance};
  width: 100%;
  box-shadow: inset 0 0 12px #f4f5f6;
  border-radius: 8px;
  padding: 20px;
  margin-top: 10px;

  .custom-legend {
    list-style: none !important;
    display: flex;
    gap: 14px;
    justify-content: flex-end;
    margin-bottom: 30px;
    font-size: ${fontSizes.f12};
    font-weight: 400;
    color: ${textColors.sceptreBlue};
  }

  .custom-tooltip {
    background: ${bgColors.dark};
    padding: 8px;
    border-radius: 6px;
    font-weight: 500;
    font-size: ${fontSizes.f14};

    .blue {
      color: ${textColors.deep};
    }

    .red {
      color: ${textColors.pop};
    }
  }
`;
