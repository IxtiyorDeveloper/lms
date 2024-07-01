import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  .ant-collapse-item {
    margin-bottom: 8px;
    border-radius: 8px !important;
    background: white;
  }

  .ant-collapse-header {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #303940;
    border-radius: 8px !important;
    align-items: center !important;
  }

  .ant-collapse-extra {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .basic-table-container {
    table {
      overflow: hidden !important;
      width: 100% !important;
      min-width: unset !important;
      table-layout: fixed !important;
      border-radius: 0 !important;

      @media (max-width: 1224px) {
        table-layout: auto !important;
      }

      .ant-table-row-expand-icon {
        display: none !important;
      }

      td {
        //padding: 0 !important;
        border-bottom: 1px solid ${bgColors.purpleCrystal} !important;
        border-left: 1px solid ${bgColors.purpleCrystal} !important;
      }

      th {
        //padding: 0 !important;
        border-bottom: 1px solid ${bgColors.purpleCrystal} !important;
      }
    }
  }

  @media (max-width: 1224px) {
    .basic-table-container {
      table {
        table-layout: auto;
        border-radius: 0 !important;
      }
    }
  }
`;
export const Circle = styled.div<{ isActive?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid #e6e8ec;
  border-radius: 40px;
  transform: rotate(${(props) => (props.isActive ? "80deg" : "270deg")});
`;
