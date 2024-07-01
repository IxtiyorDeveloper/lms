import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TeacherWrapper = styled.div`
  margin: 20px 40px;
  border-radius: 20px;
  table {
    td {
      padding: 0 12px !important;
    }
  }
  .ant-table-header {
    table {
      table-layout: auto !important;
      td {
        padding: 0 12px !important;
      }
      thead tr th {
        &:nth-child(2) {
          /* width: 240px !important; */
        }
      }

      .ant-table-cell:nth-child(2) {
        width: 20% !important;
      }
      .ant-table-cell:nth-child(3) {
        width: 12%;
      }
      .ant-table-cell:nth-child(4) {
        width: 12%;
      }
      .ant-table-cell:nth-child(5) {
        width: 12%;
      }
      .ant-table-cell:nth-child(6) {
        width: 12%;
      }
      .ant-table-cell:nth-child(7) {
        width: 12%;
      }
      .ant-table-cell:nth-child(8) {
        width: 12%;
      }
      .ant-table-cell:nth-child(9) {
        width: 12%;
      }
    }
    .ant-table-cell-scrollbar {
      visibility: hidden !important;
      display: none !important;
    }
  }

  .cell {
    border-radius: 4px;
    background: ${bgColors.midori};
    padding: 6px;
    min-width: 36px;
    justify-content: center;
    align-items: center;
    display: flex;
    color: ${textColors.white};
    //width: 100px;
  }

  .cell.zero {
    background: ${bgColors.purpleCrystal};
    color: ${textColors.black};
  }

  .cell.minus {
    background: ${bgColors.pop};
  }
`;

export const StoppingActionCard = styled.div<{ bool?: boolean }>`
  display: flex;
  height: 20px;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${(props) => (props.bool ? bgColors.pop : bgColors.sinter)};
  color: ${(props) => (props.bool ? textColors.white : textColors.royal)};
  leading-trim: both;
  text-edge: cap;
  font-size: ${fontSizes.f10};
  font-weight: 600;
`;
