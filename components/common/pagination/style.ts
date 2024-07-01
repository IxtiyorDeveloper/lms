import styled from "@emotion/styled";
import { Pagination } from "antd";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const StyledPagination = styled(Pagination)`
  width: 100%;
  display: flex;
  align-items: center !important;
  font-size: ${fontSizes.f12};
  color: ${textColors.blueGray};
  cursor: pointer;
  font-weight: 700;
  padding: 0 20px;
  min-height: 40px;
  .ant-pagination-item-active a {
    background: ${bgColors.primary} !important;
    font-size: 12px;
    color: ${textColors.blueGray};
    cursor: pointer;
    font-weight: 700;
    border-radius: 4px;

    &:hover {
      color: ${textColors.blueGray} !important;
    }
  }

  .ant-pagination-prev {
    min-width: unset !important;
  }

  .ant-pagination-next {
    min-width: unset !important;
  }

  li:nth-of-type(2) {
    border: 1px solid ${bgColors.purpleCrystal} !important;
    padding: 0 !important;
    overflow: hidden !important;
    border-radius: 5px 0 0 5px !important;

    button {
      border-radius: 0 !important;
      height: 24px !important;
      width: 24px !important;
    }
  }

  li:last-of-type {
    border: 1px solid ${bgColors.purpleCrystal} !important;
    padding: 0 !important;
    overflow: hidden !important;
    border-radius: 0 5px 5px 0 !important;

    button {
      border-radius: 0 !important;
      height: 24px !important;
      width: 24px !important;
    }
  }

  li {
    border: 1px solid ${bgColors.purpleCrystal} !important;
    margin-inline: 0 !important;
    border-left: 0 !important;
    border-right: 0 !important;
    border-radius: 0 !important;
    line-height: 18px !important;
    height: unset !important;
    padding: 3px 2px;

    &:hover a {
      color: ${textColors.blueGray} !important;
    }
  }

  li:first-of-type {
    border: none !important;
  }

  .ant-pagination-total-text {
    .selectContainer {
      display: flex;
      align-items: center;
      gap: 10px;

      .info {
        color: ${textColors.yourShadow};
        font-weight: 500;
        font-size: 12px !important;
      }
    }

    flex: 1;
    margin-left: 10px;
  }

  .ant-pagination .ant-pagination-item {
    height: unset !important;
  }

  .ant-pagination-item-link {
    height: 18px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: 20px;
    margin-inline: 0 !important;
    margin: 0 !important;
  }

  .ant-pagination-options-size-changer {
    display: none !important;
  }
`;
