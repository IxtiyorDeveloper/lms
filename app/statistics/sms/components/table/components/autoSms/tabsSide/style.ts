import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CollapseHeaderText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${fontSizes.f12};
  line-height: 20px;
  font-weight: 600;

  .stats {
    display: flex;
    align-items: center;
    gap: 6px;

    .total {
      font-weight: 500;
      font-size: ${fontSizes.f14};
    }

    .daily {
      font-weight: 500;
      padding: 2px 4px;
      border-radius: 4px;
      line-height: 20px;
      font-size: ${fontSizes.f12};
      background: ${bgColors.midori};
      color: ${textColors.white};
    }

    & * {
      font-family: "Space Grotesk", sans-serif !important;
    }
  }
`;

export const NoData = styled.p`
  text-align: center;
  color: ${textColors.yourShadow};
`;

export const NestedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .active {
    background: ${bgColors.lemon};
    color: ${textColors.dark};
    border: 1px solid ${bgColors.sunny};
    box-shadow: 0 0 8px 0 #ffdf3f80 inset;
  }
`;

export const NestedItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${fontSizes.f12};
  font-weight: 500;
  color: ${textColors.yourShadow};
  padding: 12px 12px 12px 14px;
  background: ${bgColors.white};
  border-radius: 6px;
  border: 1px solid transparent;
  transition: 0.2s ease;
  cursor: pointer;

  & span {
    font-size: 20px;
  }

  &:hover {
    background: ${bgColors.lemon}75;
    color: ${textColors.dark}75;
    border: 1px solid ${bgColors.sunny}75;
    box-shadow: 0 0 8px 0 #ffdf3f80 inset;
  }

  &:active {
    background: ${bgColors.lemon}95;
    color: ${textColors.dark}95;
    border: 1px solid ${bgColors.sunny}95;
    box-shadow: 0 0 8px 0 #ffdf3f80 inset;
  }

  .stats {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 6px;

    .total {
      font-weight: 500;
      font-size: ${fontSizes.f14};
      line-height: 20px;
    }

    .daily {
      font-weight: 500;
      border-radius: 4px;
      line-height: 20px;
      font-size: ${fontSizes.f12};
    }

    & * {
      font-family: "Space Grotesk", sans-serif !important;
    }
  }
`;

export const IconWrap = styled.div``;

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

export const TemplateTextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;

  .title {
    font-size: ${fontSizes.f12};
    font-weight: 600;
    line-height: 24px;
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

export const Flex = styled.div`
  display: flex;
  padding: 10px 0;
`;
