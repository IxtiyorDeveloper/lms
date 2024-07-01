import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const CollapseWrapper = styled.div`
  .ant-collapse-item {
    margin-bottom: 4px;
  }
  &.ant-collapse-borderless {
    background-color: transparent !important;
  }
  &.ant-collapse-borderless > .ant-collapse-item {
    border-bottom: none !important;
  }
  .ant-collapse-header {
    padding: 16px 20px !important;
    border-radius: 8px !important;
    background-color: ${bgColors.white};
  }
  .ant-collapse-item-active {
    .ant-collapse-header {
      border-radius: 8px 8px 0 0 !important;
    }
  }
  .ant-collapse-content-box {
    padding: 0 !important;
    border-radius: 8px !important;
  }
  .ant-collapse-header {
    position: relative;
  }
  .ant-collapse-expand-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const IconWrapper = styled.span<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  transform: ${(props) =>
    props.isActive ? "rotate(0deg)" : "rotate(-180deg)"};
`;
