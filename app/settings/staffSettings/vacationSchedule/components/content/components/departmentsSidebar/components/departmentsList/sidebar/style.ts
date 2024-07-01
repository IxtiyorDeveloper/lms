import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";
import { Collapse } from "antd";

export const StyledParentCollapse = styled(Collapse)`
  background-color: unset !important;
  border: none !important;
  border-radius: unset !important;

  .ant-collapse-expand-icon {
    display: none !important;
  }
  .ant-collapse-item > .ant-collapse-header > .ant-collapse-header-text {
    width: 100%;
  }
  .ant-collapse-item {
    border-bottom: none !important;

    &.ant-collapse-item-active {
      .label {
        background: ${bgColors.primary};
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
export const Wrapper = styled.div`
  overflow-y: auto;
  padding-right: 5px;
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
  max-height: calc(100vh - 300px);
`;
export const Label = styled.div`
  background: ${bgColors.brilliance};
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  box-shadow: inset 0 0 45px rgba(0, 0, 0, 0.02);
  border-radius: ${borders.b6};
  color: ${textColors.blueGray};
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.5;
  text-align: center;
  letter-spacing: -0.01em;
  gap: 5px;
  width: 100%;
  .name {
    text-align: left;
    padding-right: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
  }

  .num {
    flex: 1;
  }
`;
