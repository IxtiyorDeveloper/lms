import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background-color: ${bgColors.white};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  .flex {
    display: flex;
    gap: 8px;
  }
`;

export const HeadSide = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 4px solid ${bgColors.whiteSmoke};

  .title {
    font-size: ${fontSizes.f14};
    font-weight: 700;

    .badge {
      background-color: ${bgColors.pop};
      color: ${textColors.white};
      font-size: ${fontSizes.f12};
      border-radius: 20px;
      padding: 1px 4px;
    }
  }
`;

export const CellWrapper = styled.div`
  font-weight: 500;

  .supervisor {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .total {
    font-weight: 700;
  }

  .numbers {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;

    & span {
      font-size: ${fontSizes.f12};
      padding: 2px 5px;
      border-radius: 5px;
      font-weight: 500;
      cursor: pointer;
    }

    .pass,
    .PASS {
      background-color: ${bgColors.midori};
      color: ${textColors.white};
    }

    .fail,
    .FAIL {
      background-color: ${bgColors.pop};
      color: ${textColors.white};
    }

    .cond,
    .CONDITIONAL {
      background-color: #f6c344;
      color: ${textColors.sceptreBlue};
    }

    .abse,
    .ABS {
      background-color: #202325;
      color: ${textColors.white};
    }

    .max {
      min-width: 100px;
      text-align: center;
    }
  }

  .actions-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

export const SpanWrapper = styled.span`
  width: 150px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;

  .ball {
    font-size: ${fontSizes.f14};
    font-weight: 600;
  }

  .number_phone {
    font-size: ${fontSizes.f12};
    color: ${textColors.yourShadow};
    font-weight: 500;
    font-family: "Space Grotesk", sans-serif !important;
  }
`;

export const CenterParagraph = styled.p`
  text-align: center;
`;
export const Padding20 = styled.span`
  padding: 20px;
`;

export const GroupWrapper = styled.span`
  width: 100px;
  display: block;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
  margin: 0 auto;

  & .status {
    padding: 3px 8px;
    border-radius: 10px;
    font-weight: 600;
    font-size: ${fontSizes.f10};
  }
`;
