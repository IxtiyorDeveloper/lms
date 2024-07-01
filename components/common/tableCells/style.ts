import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";
import { CSSProperties } from "react";
import { css } from "@emotion/react";

export const StyledCell = styled.div<{
  display: CSSProperties["display"];
  gap: CSSProperties["gap"];
  dots: boolean;
}>`
  width: 100%;
  display: ${(props) => props.display};
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.dark};
  gap: ${(props) => props.gap};

  ${({ dots }) =>
    dots &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
`;
export const PhoneCellWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  .name {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    /* margin-left: 7px; */
    align-self: center;
    white-space: nowrap;
  }
`;
export const PhoneContainer = styled.div`
  padding: 12px 0;
`;
export const NotePopover = styled.div`
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.slate};
  padding: 10px;
  width: fit-content;
`;
export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  width: 100%;

  .cancel {
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    border-radius: 8px;
    height: 40px;
    font-weight: 700;
    background-color: ${bgColors.wildSand};
    width: 100% !important;
  }

  .save {
    box-shadow: inset 0 4px 6px ${bgColors.friedEgg};
    border-radius: 8px;
    font-weight: 700;
    height: 40px;
    width: 100% !important;
  }
`;
export const Note = styled.div`
  max-width: 120px;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.slate};
  overflow: hidden;
  cursor: pointer;
  text-align: left;
  min-width: 120px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Unavailable = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${bgColors.whiteSmoke};
  min-height: 59px;
  .inner {
    width: 100%;
    height: 100%;
  }
`;
export const StyledMarkCell = styled.div<{ color: string }>`
  min-height: 56px;
  width: 3px;
  background: ${(props) => props.color || "transparent"};
  border-radius: 0 5px 5px 0;
  margin: 2px 0;
  margin-left: -16px;
  margin-right: 16px;
`;
export const IconWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  min-height: 50px;
  .label {
    display: flex;
    justify-content: center;
    gap: 24px;
  }

  .action {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
`;
export const Content = styled.div`
  position: relative;
  width: 100%;
  .child {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 19px;
    height: 19px;
    background: ${bgColors.pepper};
    border-radius: 50%;
    border: 1px solid ${bgColors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${textColors.white};
  }
  .balance {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }

  .debt {
    font-weight: 600;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }
`;
export const PopoverContent = styled.div`
  position: relative;
  width: 100%;
  .balance {
    font-weight: 600;
    font-size: ${fontSizes.f10};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }

  .debt {
    font-weight: 600;
    font-size: ${fontSizes.f8};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }
`;
export const TransferParent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .child {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 19px;
    height: 19px;
    background: ${bgColors.pepper};
    border-radius: 50%;
    border: 1px solid ${bgColors.white};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .arrow {
    position: absolute;
    top: -15px;
    right: -15px;
    padding: 2px;
    background: ${bgColors.deep};
    border-radius: 50%;
    border: 1px solid ${bgColors.white};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const StudentStatus = styled.div`
  font-weight: 700;
  font-size: ${fontSizes.f8};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.brotherBlue};
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: ${borders.b4};
  padding: 4px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;
export const CurrentStatus = styled.div`
  background: ${bgColors.spring};
  border-radius: ${borders.b12};
  font-weight: 500;
  font-size: ${fontSizes.f8};
  line-height: 1.2;
  color: ${textColors.lucky};
  padding: 4px 12px;
`;

export const CellGroupInfo = styled.div`
  background: ${bgColors.lemon};
  border-radius: ${borders.b4};
  padding: 6px 10px;
  min-width: 151px;
  width: 100%;

  .row {
    display: flex;
    justify-content: space-between;

    &.alignCenter {
      align-items: center;
      .left {
        p {
          overflow-x: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 100px;
        }
      }
    }
  }

  .left {
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    margin-top: 2px;
  }

  .right {
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    flex: none;
    order: 1;
    flex-grow: 0;
    margin-top: 2px;
  }

  .group {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }

  .type {
    font-weight: 600;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    flex: none;
    order: 0;
    flex-grow: 0;
    background: ${bgColors.primary};
    padding: 2px 4px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;
  }
`;
export const Flex = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  .abs {
    position: absolute;
    left: -12px;
    top: -10px;
  }
  a {
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;
export const PaymentWrapper = styled.div`
  width: fit-content;
  .res {
    width: fit-content !important;
  }
  .paymentCell {
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
    font-weight: 600;
    padding: 3px 7.5px !important;
    min-width: 100px;
    width: fit-content;
    min-height: 0;
  }
  .nextMonth {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 6px 8px;
    background: ${bgColors.deep};
    border-radius: ${borders.b6};
    min-width: 100px;
    .child {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 19px;
      height: 19px;
      background: ${bgColors.pepper};
      border-radius: 50%;
      border: 1px solid ${bgColors.white};
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${textColors.white};
    }
  }
  .nextMonthIn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3px 4px;
    background: ${bgColors.deep};
    border-radius: ${borders.b6};
    min-width: 100px;
  }
`;
export const StartDateContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  .title {
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.brilliance};
  }
  .titleIn {
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.whiteSmoke};
  }
  .date {
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.brilliance};
  }
  .dateIn {
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.brilliance};
  }
`;

export const Label = styled.h3`
  margin-bottom: 10px;
  color: ${textColors.sceptreBlue};
`;
