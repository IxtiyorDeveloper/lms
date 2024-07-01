import styled from "@emotion/styled";
import { Collapse } from "antd";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const PeopleWrapper = styled.div`
  max-height: 300px;
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding: 10px 5px 4px 10px;
  gap: 6px;
  border-left: 1px solid ${bgColors.brotherBlue};

  &::-webkit-scrollbar {
    width: 6px !important;
    background-color: ${bgColors.whiteSmoke};
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    cursor: pointer !important;
    margin-left: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border: 1px solid ${bgColors.yourShadow};
    border-radius: 4px;
    background-color: ${bgColors.harrison};
    background-size: 12px 5px;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer !important;
    margin-left: 10px;
  }
  .row {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.5;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    padding: 8px 8px 8px 5px !important;
    background: ${bgColors.whiteSmoke}!important;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 36px;
    box-shadow: inset 0 0 45px rgba(0, 0, 0, 0.02);
    cursor: pointer;
    position: relative !important;
    &.active-row {
      background: ${bgColors.purpleCrystal}!important;
    }
    .dot {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #777e91;
      border-radius: 50%;
      right: 20px !important;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

export const ChildMenuWrapper = styled.div`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  padding: 5px 0 2px 5px;
  border-left: 1px solid ${bgColors.brotherBlue};
  .skeleton {
    span {
      height: 36px;
      transform: scale(1, 0.99);
    }
  }
`;
export const Wrapper = styled.div`
  background: ${bgColors.white};
`;
export const ParentHeader = styled.div`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: ${textColors.dark};
  padding: 8px 8px 8px 5px;
  background: ${bgColors.whiteSmoke}!important;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const StyledChildrenCollapse = styled(Collapse)`
  background-color: unset !important;
  border: none !important;
  border-radius: unset !important;

  .ant-collapse-expand-icon {
    display: none !important;
  }

  .ant-collapse-item {
    border-bottom: none !important;
    margin-bottom: 6px !important;
    .active {
      .arrow {
        transform: rotate(-90deg) !important;
        path {
          fill: ${bgColors.yourShadow} !important;
        }
      }
    }
    &.ant-collapse-item-active {
      .active {
        background: ${bgColors.friedEgg}!important;
        .arrow {
          transform: rotate(0deg) !important;
          path {
            fill: ${bgColors.sceptreBlue} !important;
          }
        }
      }
    }

    .ant-collapse-header {
      padding: 0;
      line-height: unset;
      cursor: pointer;
    }

    .ant-collapse-content {
      border: none !important;

      .ant-collapse-content-box {
        padding: 0;
      }
    }
  }
`;
