import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .ant-collapse-item {
    border: none !important;

    .arrow {
      transform: rotate(90deg) !important;
      transition: all 0.4s;
    }

    &.ant-collapse-item-active {
      .arrow {
        transform: rotate(270deg) !important;
      }
    }
  }

  .ant-collapse {
    border: none !important;
    background: transparent !important;
  }

  .ant-collapse-header {
    .ant-collapse-expand-icon {
      display: none !important;
    }
  }

  .ant-collapse-content {
    border-top: unset !important;
  }

  .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

export const UnitsWrapper = styled.div`
  padding: 20px 16px;
  border-radius: 16px;
  border: 1px solid ${textColors.purpleCrystal};
  background: ${bgColors.cascading};
  display: flex;
  flex-direction: column;
  gap: 16px;

  .row {
    .title {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f14};
      font-style: normal;
      font-weight: 600;
      line-height: 1; /* 85.714% */
      letter-spacing: -0.14px;
    }

    .grids {
      margin-top: 10px;
      padding: 10px 14px;
      border-radius: 10px;
      background: ${bgColors.brilliance};
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);

      .inside-row {
        display: flex;
        overflow: auto;
        width: 100%;
        gap: 4px;
      }
    }
  }
`;

export const StyledCol = styled.div<{ length: boolean }>`
  min-width: ${(props) => (props.length ? "100px" : "70px")};

  .bottom {
    margin-top: 4px;
    border-radius: 2px;
    background: ${bgColors.purpleCrystal};
    display: flex;
    gap: 20px;
    justify-content: center;

    .unit {
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f10};
      font-style: normal;
      font-weight: 500;
      line-height: 1.2; /* 120% */
      letter-spacing: -0.1px;
      padding: 5px 0;
    }
  }
`;
export const TopCell = styled.div<{ isHoliday: boolean }>`
  border-radius: 2px;
  background: ${bgColors.blueGray};
  background: ${(props) =>
    props.isHoliday
      ? "linear-gradient(90deg, #ffc93e 14.9%, #ffde67 77.92%)"
      : bgColors.blueGray};
  //color: ${textColors.sadet};
  color: ${(props) =>
    props.isHoliday ? textColors.blueGray : textColors.white};
  font-size: ${fontSizes.f10};
  font-style: normal;
  font-weight: 400;
  line-height: 1.2; /* 120% */
  letter-spacing: -0.1px;
  padding: 5px 0;
  text-align: center;
`;

export const StyledHeader = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;

  .title {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f14};
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.14px;
  }
`;
