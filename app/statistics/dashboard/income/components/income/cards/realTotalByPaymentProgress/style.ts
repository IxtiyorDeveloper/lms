import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  grid-column: 1/3;

  & > .full {
    padding-bottom: 0 !important;
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ProgressTooltip = styled.div`
  background: ${bgColors.dark};
  color: ${textColors.white};
  border-radius: 10px;
  padding: 8px;
  width: 250px;

  .flex {
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;

    .overall-progress-proportion {
      font-size: ${fontSizes.f10};
    }

    .daily-progress-proportion {
      color: ${textColors.midori};
      font-weight: 600;
      font-size: ${fontSizes.f10};
    }

    .overall-progress {
      letter-spacing: -0.5px;
      font-size: ${fontSizes.f12};
    }

    .daily-progress {
      letter-spacing: -0.5px;
      color: ${textColors.midori};
      font-weight: 600;
      font-size: ${fontSizes.f12};
    }
  }

  .border {
    padding-bottom: 4px;
    margin-bottom: 4px;
    border-bottom: 1px solid ${bgColors.blueGray};
  }
`;

export const BarWrapper = styled.div`
  & .recharts-layer.recharts-bar {
    width: 10px;
  }
`;

export const Overall = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: ${bgColors.whiteSmoke};
  padding: 10px;
  border-radius: 8px;

  .sum-curr {
    color: ${textColors.midori};
    font-size: ${fontSizes.f14};
  }

  .payed-text {
    color: ${textColors.yourShadow};
    font-size: ${fontSizes.f12};
  }
`;
