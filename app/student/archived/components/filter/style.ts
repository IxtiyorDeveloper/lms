import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { bgColors } from "styles/theme";

export const WaitingListFilterWrapper = styled(Box)`
  margin: 0 40px 30px 40px;
  background: ${bgColors.brilliance};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 20px;
  .ant-tree-select-dropdown .ant-select-tree .ant-select-tree-treenode {
    width: 100% !important;
  }
  .ant-select-selection-item {
    .color {
      height: 12px !important;
    }
  }
`;

export const ColorContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid ${bgColors.purpleCrystal};
  padding: 3px;

  .color {
    height: 20px;
    width: 100%;
    cursor: pointer;
    min-width: 20px;
  }

  .no-color {
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
