import styled from "@emotion/styled";
import { Collapse } from "antd";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CollapseWrapper = styled.div`
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
`;
export const Wrapper = styled.div`
  background: ${bgColors.white};
  min-width: 240px;
  height: fit-content;
`;
export const ParentHeader = styled.div`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: ${textColors.dark};
  padding: 8px 8px 8px 5px;
  background: ${bgColors.brilliance};
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: inset 0 0 45px rgba(0, 0, 0, 0.02);
`;
export const StyledParentCollapse = styled(Collapse)`
  background-color: unset !important;
  border: none !important;
  border-radius: unset !important;

  .ant-collapse-expand-icon {
    display: none !important;
  }

  .ant-collapse-item {
    border-bottom: none !important;
    margin-bottom: 6px !important;

    &.ant-collapse-item-active {
      .active {
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
export const DepartmentsWrapper = styled.div<{ liH?: number }>`
  background-color: ${bgColors.brilliance};
  border-radius: 8px;

  .header {
    padding: 12px;
    background-color: ${bgColors.brilliance};
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid ${bgColors.wildSand};

    .title-department {
      font-size: ${fontSizes.f12};
      font-weight: 600;
      color: ${textColors.sceptreBlue};
    }
  }

  .body {
    background-color: ${bgColors.white};
    padding: 12px;

    .search {
      margin-bottom: 12px;
    }

    table {
      width: 240px;
      min-width: unset;
      tr {
        border-bottom: 6px solid transparent;
        td {
          padding: 0;
          background: transparent;
        }
      }
    }
  }
`;
