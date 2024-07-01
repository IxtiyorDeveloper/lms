import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
export const AbsList = styled.div`
  display: flex;
  gap: 6px;
  min-height: 16px;
  min-width: 200px;
  text-decoration: none !important;
  text-underline: none !important;

  .num {
    font-weight: 500;
    font-size: ${fontSizes.f9};
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: ${textColors.brilliance};
    padding: 2px 3px;
    border-radius: 50%;
    min-height: 16px;
    min-width: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none !important;
    text-underline: none !important;
  }
`;

export const DateAndUnitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 1px;
  flex: 1;
  height: 100%;
`;

export const DateY = styled.div<{ isLastLesson: boolean; isHoliday: boolean }>`
  display: flex;
  min-width: 57px;
  width: 100%;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: ${(props) =>
    props.isHoliday
      ? "linear-gradient(90deg, #ffc93e 14.9%, #ffde67 77.92%)"
      : props.isLastLesson
      ? "linear-gradient(90deg, #FF5858 0%, #F09819 100%);"
      : "linear-gradient(90deg, #434343 0%, #000000 100%);"};
  color: ${(props) =>
    props.isHoliday ? textColors.blueGray : textColors.white};
  font-size: ${fontSizes.f12};
  font-weight: 600;
  border-radius: 2px;
  height: 50%;
  border: ${(props) => (props.isHoliday ? "1px solid #f3c94b" : "none")};
`;

export const HeaderStudentWrapper = styled.div<{ padding?: boolean }>`
  display: flex;
  min-width: 300px;
  padding-left: ${(props) => (props.padding ? "14px" : 0)};
  justify-content: space-between;
  background-color: ${bgColors.white};
  border-bottom: 1px solid #f0f0f0;
  height: 100%;

  .student {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1;
    color: #6f767e;
    margin-left: 8px;
  }

  .left {
    display: flex;
    align-items: center;
    flex: 1;
  }
`;

export const ContentStudentWrapper = styled.div<{ padding?: boolean }>`
  min-width: 300px;
  padding-left: ${(props) => (props.padding ? "14px" : 0)};
  justify-content: space-between;
  background-color: ${bgColors.white};

  .disabled {
    div {
      cursor: not-allowed !important;
    }
  }

  .right {
    width: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    //border-left: 0.5px solid ${bgColors.purpleCrystal};

    .insideRight {
      padding-top: 3px;
    }
  }
`;

export const PodoHeaderWrapper = styled.div<{ padding?: boolean }>`
  display: flex;
  justify-content: space-between;
  background-color: ${bgColors.white};
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;

  .disabled {
    div {
      cursor: not-allowed !important;
    }
  }

  .right {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-left: 0.5px solid ${bgColors.purpleCrystal};

    .insideRight {
      padding-top: 3px;
    }
  }
`;
export const PodoContentWrapper = styled.div<{ padding?: boolean }>`
  display: flex;
  padding-left: ${(props) => (props.padding ? "14px" : 0)};
  justify-content: space-between;
  background-color: ${bgColors.white};
  min-width: 54px;

  .podoWrapper {
    width: 100%;
    display: flex;
    padding-top: 4px;
    flex-direction: column;
    height: 50px;
    align-items: center;
    justify-content: center;
  }

  .podoLabel {
    justify-content: center;
  }
`;

export const NameWr = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex: 1;
  padding-right: 4px;

  .nim {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 3px;

    p {
      width: 16px;
    }
  }

  .img {
    .ant-image .ant-image-mask {
      border-radius: 50%;
    }
  }

  a {
    text-decoration: none !important;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;

    &:hover .full_name {
      text-decoration: underline;
    }

    .full_name {
    }
  }

  .img {
    border-radius: 50%;
  }

  a:hover {
    color: ${textColors.sceptreBlue} !important;
  }
`;

export const UnitY = styled.div`
  display: flex;
  width: 100%;
  min-width: 57px;
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: linear-gradient(90deg, #d3d3d3 0%, #d3d3d3 1%, #e0e0e0 26%);
  color: ${textColors.sceptreBlue};
  font-size: ${fontSizes.f12};
  font-weight: 600;
  border-radius: 2px;
  gap: 20px;
  p {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-inline: 5px;
    span {
      margin-left: 20px;
      &:first-of-type {
        margin-left: 0;
      }
    }
  }
`;
