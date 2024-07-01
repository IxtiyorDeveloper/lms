import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TableWrapper = styled.div`
  margin: 0 40px;
  background-color: ${bgColors.white};
  border-radius: 12px;

  .basic-table-container {
    thead {
      th {
        background: ${bgColors.purpleCrystal} !important;
        border-bottom: 4px solid ${bgColors.white} !important;

        &:first-of-type {
          padding-left: 10px !important;
        }
      }
    }

    tr {
      background: ${bgColors.whiteSmoke};

      td {
        background: ${bgColors.whiteSmoke};
        border-bottom: 4px solid ${bgColors.white} !important;

        &:first-of-type {
          padding-left: 10px !important;
        }
      }
    }
  }

  .tabs {
    padding: 24px;

    .ant-segmented {
      width: 100% !important;

      .ant-segmented-group {
        width: 100% !important;

        .ant-segmented-item {
          flex: 1 !important;

          .tab-element {
            width: 100%;
          }
        }
      }
    }
  }

  & table * {
    font-size: ${fontSizes.f12};
  }

  .stats {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: ${fontSizes.f10};
    font-weight: 500;
    margin-left: 20px;

    li {
      display: flex;
      align-items: center;
      gap: 4px;
      text-transform: lowercase !important;
    }

    li span {
      color: ${textColors.yourShadow};
    }

    li .dot {
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background: #000;
    }
  }
`;

export const ProjectsTabsWrapper = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
`;
