import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .border {
    border: 1px solid ${bgColors.purpleCrystal};
    border-radius: 12px;
    overflow: hidden;
    padding: 10px;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 350px;
  justify-content: flex-end;

  .cancel {
    padding: 10px 24px;
    color: ${textColors.yourShadow};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
  }

  .save {
    padding: 10px 24px;
    color: ${textColors.dark};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #ffe866;
  }
`;
export const InputNumberWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;

  .col {
    width: 90px;
    flex: 1;
  }
`;

export const CellWrapper = styled.div`
  font-size: ${fontSizes.f12};

  & > * {
    font-size: ${fontSizes.f12};
  }

  .supervisor {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .numbers {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;

    & span {
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
      min-width: 40px;
      text-align: center;
    }
  }

  .actions-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;
