import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const BottomWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  .sidebar_container {
    width: 15%;
  }
`;
export const TableContainer = styled.div`
  position: relative;
  min-height: 60vh;
  flex: 1;
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

    .ant-anchor {
      &:before {
        display: none;
      }

      .ant-anchor-ink {
        display: none !important;
      }
    }

    .ant-anchor-link {
      padding-left: 0 !important;
    }
  }
`;

export const TableWrapper = styled.div``;
