import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const DiffereceWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  .card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .increase {
    background: ${bgColors.whiteSmoke};
    border-radius: 4px;
    transform: matrix(1, 0, 0, -1, 0, 0);
  }

  .main {
    background: rgba(244, 245, 246, 0.24);
    border-radius: 4px;
    transform: matrix(1, 0, 0, -1, 0, 0);
  }
`;

export const TooltipInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  .flex {
    display: flex;
    gap: 6px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 8px;
    gap: 6px;
  }
  .divider {
    background: ${bgColors.sceptreBlue};
    height: 1px;
    width: 135px;
  }

  .info-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: ${fontSizes.f12};
    line-height: 1.25;

    .text-1 {
      font-weight: 500;
      letter-spacing: -0.01em;
      color: ${textColors.brotherBlue};
    }

    .text-2 {
      font-family: "Space Grotesk";
      font-weight: 700;

      letter-spacing: -0.01em;
      color: ${textColors.pop};
      display: flex;
      gap: 0px;
    }

    .green {
      color: ${textColors.midori};
    }
  }

  .icon {
    width: 15px;
    height: 15px;
    transform: matrix(1, 0, 0, -1, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card {
    background: ${bgColors.blueGray};
    border-radius: 6px;
  }
`;
