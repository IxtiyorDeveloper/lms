import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .flex {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .student {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    height: 75px;
    gap: 8px;
  }

  .balance {
    padding: 6px 12px 6px 8px;
    border-radius: 6px;
    border: 1px;
    justify-content: space-between;
    border: 1px solid ${bgColors.purpleCrystal};
    background: ${bgColors.yukon};
    display: flex;
    align-items: center;
    font-size: ${fontSizes.f12};
    font-weight: 500;
    line-height: 1.25;
    letter-spacing: -0.01em;
    height: 100%;
  }

  .flex {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .amount {
    font-family: Space Grotesk sans-serif;
    font-size: ${fontSizes.f12};
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: 0.02em;
  }
`;

export const Title = styled.div`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.01em;
`;
