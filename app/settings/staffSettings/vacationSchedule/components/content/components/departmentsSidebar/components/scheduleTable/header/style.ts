import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background: ${bgColors.white};
  margin-bottom: 6px;
  box-shadow: 0 0 24px 0 #0000000d;
  overflow: hidden;
  border-radius: 10px;

  .borderTop {
    border-top: 1px solid ${bgColors.purpleCrystal};
  }

  .borderBottom {
    border-bottom: 1px solid ${bgColors.purpleCrystal};
  }
`;

export const HeadWrapper = styled.div`
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${bgColors.brilliance};
    padding: 8px 8px 8px 16px;
  }
`;

export const DepartmentInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const WarningWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${bgColors.pepper};
  border-radius: 8px;
  padding: 10px;
  margin: 6px 14px 10px 14px;

  .warning__text {
    color: ${textColors.white};
    font-size: ${fontSizes.f12};
    font-weight: 500;
  }
`;

export const SlotStatistic = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;
  justify-content: flex-end;
  min-width: 125px;

  .ant-progress-bg {
    height: 8px !important;
  }

  .ant-progress-line {
    margin-bottom: 0 !important;
    margin-inline-end: 0 !important;
  }

  .numbers {
    font-size: ${fontSizes.f12};
    color: ${textColors.yourShadow};
    font-weight: 500;
    font-family: "Space Grotesk", sans-serif;
  }
`;

export const DepartmentName = styled.div`
  display: flex;
  font-size: ${fontSizes.f12};
  font-weight: 600;
`;

export const CountAssignment = styled.span`
  color: ${textColors.yourShadow};
  margin: 0 8px;
`;

export const CurrentVacationHolders = styled.div`
  width: fit-content;
  padding: 0 8px;
  border-radius: 24px;
  background-color: ${bgColors.midoriVacation};
  font-size: ${fontSizes.f12};
  color: ${textColors.white};
`;

export const Staff = styled.div`
  position: relative;
  cursor: pointer;
  width: 200px;
  border-right: 1px solid ${bgColors.purpleCrystal};
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px 12px;

  .create-vacation-btn {
    position: absolute;
    right: 10px;
    opacity: 0.15;

    &:hover {
      opacity: 1;
    }
  }

  & button {
    min-height: 20px !important;
    min-width: 24px !important;
    padding: 3px !important;
  }
`;

export const UserWrap = styled.div`
  display: flex;
  width: 100%;
`;

export const VacationScheme = styled.div`
  display: flex;
  width: 100%;
  overflow-x: hidden !important;
  scroll-behavior: smooth !important;

  .example-test {
    position: absolute;
    height: 100%;
    width: 100%;
    background: transparent;
  }

  &:hover {
    background-color: ${bgColors.whiteSmoke};
  }

  &::-webkit-scrollbar {
    display: none;
  }

  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .month-vacation {
    position: relative;
    z-index: 8;
    width: 40px;
    min-width: 40px;
    border-left: 1px dashed ${bgColors.purpleCrystal}90;
    border-right: 1px dashed ${bgColors.purpleCrystal}90;
    border-bottom: 1px solid ${bgColors.purpleCrystal}90;
    border-top: 1px solid ${bgColors.purpleCrystal}90;
  }

  .month-select {
    height: 100%;
    width: 100%;
    background: #14141608;
    border-left: 0.5px dashed #b1b5c3;
    border-right: 0.5px dashed #b1b5c3;
  }

  .current-m {
    background: #ffcf000d;
    border-left: 0.5px dashed ${bgColors.primary};
    border-right: 0.5px dashed ${bgColors.primary};
  }

  .recommended {
    background: ${bgColors.white};
  }

  .not-recommended {
    background: ${bgColors.paleVacation};
  }

  .not-working {
    background: ${bgColors.whiteSmoke};
  }

  .unused {
    //background-color: #fff2f6;
    opacity: 1;
    background: #fff2f6
      repeating-linear-gradient(
        -50deg,
        #ffffff,
        #ffffff 4px,
        #fff2f6 3px,
        #fff2f6 10px
      );
  }

  .year-end {
    border-right: 1px solid ${bgColors.purpleCrystal};
  }

  .year-start {
    //border-left: none;
  }

  .slot {
    position: absolute;
    z-index: 9999 !important;
    top: 2px;
    left: 2px;
    height: 42px;
    width: 16px;
    border-radius: 2px;
    background: ${bgColors.midoriVacation};
    box-shadow:
      0 1px 1px 0 #ffffff3d inset,
      0 -1px 1px 0 #0000001f inset;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .vacation-past-200 {
    border: 1px solid ${bgColors.pop};
    box-shadow: 0 0 2px 0 #e92857cc;
    background: ${bgColors.paleGray};
  }

  .vacation-upcoming-200 {
    border: 1px solid ${bgColors.pop};
    box-shadow: 0 0 2px 0 #e92857cc;
  }

  .vacation-past-100 {
    background: ${bgColors.paleGray};
    box-shadow: none;
  }

  .vacation-upcoming-200 {
    background: ${bgColors.midoriVacation};
    box-shadow: none;
  }

  .part-1 {
    top: 2px;
    left: 2px;
  }

  .part-2 {
    top: 2px;
    left: 20px;
  }
`;

export const NameOfStaff = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  padding: 0;
  margin: 0;
  line-height: 16px;
  text-overflow: ellipsis;
  overflow-x: hidden !important;
  white-space: nowrap;
  width: 140px;
  cursor: context-menu;
`;

export const HiredDate = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  color: ${textColors.brotherBlue};
  padding: 0;
  margin: 0;
  line-height: 14px;
`;
