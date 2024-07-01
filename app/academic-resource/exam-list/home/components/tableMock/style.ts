import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const CellWrapper = styled.div`
  font-weight: 600;

  .line {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .index {
    padding: 0 10px;
    text-align: center;
  }

  .supervisor {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .one-line {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }

  .numbers {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 36px;
    height: 48px !important;
    text-align: center;
    & span {
      padding: 2px 5px;
      border-radius: 5px;
      font-weight: 500;
      cursor: pointer;
    }

    & span:first-of-type {
      width: 60px;
    }

    .pass {
      background-color: ${bgColors.midori};
      color: ${textColors.white};
    }

    .fail {
      background-color: ${bgColors.pop};
      color: ${textColors.white};
    }

    .progress {
      background-color: ${bgColors.deep};
      color: ${textColors.white};
    }

    .not-started {
      background-color: ${bgColors.sceptreBlue};
      color: ${textColors.white};
    }

    .cond {
      background-color: #f6c344;
      color: ${textColors.sceptreBlue};
    }

    .abse {
      background-color: ${bgColors.cedat};
      color: ${textColors.white};
    }
  }

  .circle1 {
    height: 1.3rem;
    width: 1.3rem;
    color: ${bgColors.white};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .teacher {
    //background-color: ${bgColors.pop};
  }

  .support {
    //background-color: ${bgColors.orange};
  }

  .name {
    display: flex;
    margin-bottom: 5px;
    gap: 5px;
  }
`;

export const Wrapper = styled.div`
  box-shadow: 0 -1px 12px rgba(0, 0, 0, 0.16);
  background-color: ${bgColors.white};
`;
