import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const InfoCardWrapper = styled.div`
  position: relative;
  overflow: hidden;
  min-width: 300px;
  border: 1px solid ${bgColors.purpleCrystal};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), inset 0 0 12px ${bgColors.white} !important;
  border-radius: 12px;
  background-color: ${bgColors.white};

  .first {
    padding: 16px 16px 0 16px;
  }

  .title {
    margin-bottom: 12px;
    color: ${textColors.sceptreBlue};
    font-weight: 600;
    font-size: ${fontSizes.f14};
  }

  .amount {
    margin-bottom: 6px;
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f18};
    font-weight: 700;
  }

  .green {
    color: ${textColors.midori};
  }
`;
