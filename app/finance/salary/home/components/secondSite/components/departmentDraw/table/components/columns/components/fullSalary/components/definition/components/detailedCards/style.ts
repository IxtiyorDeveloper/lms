import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { ESalaryRange } from "types/finance/salary";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 8px;
  margin-top: 8px;
  .ord {
    background: ${bgColors.blueGray};
  }
  .unclear {
    background: ${bgColors.purpleCrystal};
    .white {
      color: ${textColors.yourShadow}!important;
    }
    svg {
      g {
        fill: ${textColors.yourShadow}!important;
      }
    }
  }

  .range-${ESalaryRange.LOW} {
    background: ${textColors.pop};
    color: ${textColors.white};
  }

  .range-${ESalaryRange.HIGH} {
    color: ${textColors.white};
    background: ${bgColors.deep};
  }

  .range-${ESalaryRange.NORMAL} {
    color: ${textColors.white};
    background: ${bgColors.secondary};
  }
`;
export const Box = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 8px;

  .white {
    color: ${textColors.white};
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.12px;
  }
  .mt8 {
    margin-top: 8px;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.12px;
  }

  .t${ESalaryRange.UNCLEAR}-text {
    color: ${textColors.yourShadow} !important;
  }

  .t${ESalaryRange.LOW}-text {
    color: ${textColors.pop};
  }

  .t${ESalaryRange.HIGH}-text {
    color: ${textColors.secondary};
  }

  .t${ESalaryRange.NORMAL}-text {
    color: ${bgColors.secondary};
  }
`;

export const Top = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  .o-text {
    color: ${textColors.sadet};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.12px;
  }
  .pop {
    color: ${textColors.pale};
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.12px;
  }
`;
