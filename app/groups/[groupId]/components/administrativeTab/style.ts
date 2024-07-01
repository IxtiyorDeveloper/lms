import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRED_STUDENT,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";
import { css } from "@emotion/react";
export const TableWrapper = styled.div<{ divideRowNumber?: number }>`
  .row-${NEW_STUDENT_NOT_ATTENDED} {
    background: ${bgColors.lemon};
  }

  .row-${NEW_STUDENT_ATTENDED} {
    background: ${bgColors.lemon};
  }

  .row-${STUDYING_STUDENT} {
    background: ${bgColors.transparent};
  }

  .row-${TRANSFERRING_STUDENT} {
    background: ${bgColors.transparent};
  }

  .row-${TRANSFERRED_STUDENT} {
    background: ${bgColors.transparent};
    opacity: 0.5;
  }

  .row-${STOPPING_STUDENT} {
    background: ${bgColors.pale};
  }

  .basic-table-container {
    ${({ divideRowNumber }) =>
      divideRowNumber &&
      css`
        tr:nth-of-type(${divideRowNumber}) {
          td {
            border-bottom: 40px solid ${bgColors.whiteSmoke} !important;
          }
        }
      `}
  }
`;

export const Cell = styled.div`
  .phone {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  .popover {
    max-width: 130px;
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1;
    letter-spacing: -0.01em;
    color: ${textColors.slate};
    padding: 10px;
  }
`;

export const PhoneWrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  border-bottom: 0.5px solid #f4f5f6;
  flex-direction: column;
  cursor: pointer;

  .text {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.5;
    letter-spacing: -0.01em;
    color: #777e91;
  }

  &:last-of-type {
    border-bottom: none;
  }

  padding: 0 12px 6px 12px;

  .phone {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;
export const Tick = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${bgColors.midori};
  border-radius: 50%;
`;

export const RowMark = styled.div<{ bgColor?: string }>`
  width: 5px;
  background: ${(props) => props.bgColor};
  border-radius: 0 5px 5px 0;
  height: 100%;
  min-height: 56px;
  display: flex;
  flex-shrink: 10;
  margin: 2px 0 2px -15px;
`;
export const Cards = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 10px;
  width: 100%;

  .flex {
    display: flex;
    width: 100%;

    .expand {
      width: 100%;
    }

    .arrow {
      width: 18px;
      height: 100%;
      background: ${bgColors.white};
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
export const ExpandDiv = styled.div`
  display: flex;
  gap: 14px;
  background-color: ${bgColors.white};
  box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  border: 0.5px solid ${bgColors.purpleCrystal};
  border-radius: 10px;
  max-width: 800px;
`;

export const ExpandDivSection = styled.div`
  background-color: ${bgColors.whiteSmoke};
  padding: 6px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const UserAction = styled.p`
  font-size: ${fontSizes.f10};
  font-weight: 500;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;

  .name {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f10};
    font-style: normal;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.1px;
  }

  .dates {
    display: flex;
    align-items: center;
    gap: 5px;

    .dm {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f10};
      font-style: normal;
      font-weight: 500;
      line-height: 1.2;
      letter-spacing: -0.1px;
    }

    .hm {
      color: ${textColors.yourShadow};
      font-size: ${fontSizes.f10};
      font-style: normal;
      font-weight: 500;
      line-height: 1.2;
      letter-spacing: -0.1px;
    }
  }
`;

export const GroupName = styled.p`
  font-size: ${fontSizes.f10};
  font-weight: 700;
  text-transform: uppercase;
`;

export const DateForGroup = styled.p`
  font-size: ${fontSizes.f10};
  color: ${textColors.sceptreBlue};
  font-weight: 500;
  text-transform: capitalize;
`;

export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 18px;
  font-weight: 500;
  text-transform: capitalize;

  .line {
    width: 7px;
    border-radius: 2px;
    background: ${bgColors.yourShadow};
    height: 1px;
  }
`;

export const Flex = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;
export const FlexBottom = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end !important;
  justify-content: space-between;
`;

export const FlexWithGap = styled.div`
  display: flex;
  position: relative;
  width: max-content;
  gap: 5px;

  .line {
    background-color: ${bgColors.purpleCrystal};
    width: 100%;
    margin-bottom: 6px;
    height: 0.5px;
  }
`;

export const TextForLessons = styled.p`
  font-size: ${fontSizes.f10};
  color: ${textColors.yourShadow};
  font-weight: 500;
`;
