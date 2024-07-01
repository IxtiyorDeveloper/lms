import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background-color: ${bgColors.white};
`;

export const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 18px 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};

  .amount {
    font-size: ${fontSizes.f12};
    font-weight: 700;
  }
`;

export const ColWrapper = styled.div`
  padding: 10px 0;

  p {
    font-size: ${fontSizes.f12};
    font-weight: 600;
  }

  .lifeCycle {
    margin-left: -40px;
  }

  .group-info {
    width: 200px;
  }

  .amount {
    background-color: ${bgColors.midori};
    color: ${textColors.white};
    font-size: ${fontSizes.f12};
    font-weight: 600;
    width: fit-content;
    border-radius: 4px;
    padding: 2px 6px;
  }

  .flex {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .index {
    margin-left: 10px;
    font-size: ${fontSizes.f12};
    font-weight: 600;
  }
`;
