import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 16px;
  background: ${bgColors.whiteSmoke};
  border-radius: 12px;
  margin-top: 16px;
  width: 100%;

  .ant-table {
    background: ${bgColors.whiteSmoke} !important;
  }

  table .ant-table-thead th,
  table .ant-table-thead th tr {
    background: ${bgColors.sceptreBlue} !important;
    border-bottom: 3px solid ${bgColors.whiteSmoke} !important;
  }

  table .ant-table-thead .ant-table-cell:first-of-type {
    border-bottom-left-radius: 8px !important;
    border-top-left-radius: 8px !important;
  }

  table .ant-table-thead .ant-table-cell:last-of-type {
    border-bottom-right-radius: 8px !important;
    border-top-right-radius: 8px !important;
  }

  table .ant-table-thead th * {
    color: ${textColors.whiteSmoke} !important;
  }

  table tbody tr,
  table tbody tr td {
    background: ${bgColors.white} !important;
  }

  .row-sms-table {
    border-radius: 5px !important;
    overflow: hidden !important;
  }

  .basic-table-container tbody tr .ant-table-cell {
    border-bottom: 3px solid ${bgColors.whiteSmoke} !important;
    border-top: 3px solid ${bgColors.whiteSmoke} !important;
  }

  .basic-table-container tbody tr .ant-table-cell:first-of-type {
    border-top-left-radius: 8px !important;
    border-bottom-left-radius: 8px !important;
  }

  .basic-table-container tbody tr .ant-table-cell:last-of-type {
    border-top-right-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
  }

  .ant-collapse-content,
  .ant-collapse-content-active,
  .ant-collapse-content .ant-collapse-content-active {
    background: ${bgColors.whiteSmoke} !important;
  }

  .ant-collapse-content-box {
    padding: 6px 0 10px 0 !important;
  }
`;

export const Badge = styled.div`
  background: ${bgColors.pepper};
  color: ${textColors.white};
  font-size: ${fontSizes.f10};
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 40px;
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  & form {
    display: flex;
    align-items: center;
    gap: 10px;

    .for-input {
      min-width: 120px;
    }
  }
`;

export const Flex = styled.div`
  display: flex;
  padding: 10px 0;
`;
