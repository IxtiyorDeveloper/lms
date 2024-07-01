import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 20px 20px 16px 20px;
  background-color: ${bgColors.white};

  .ant-table-cell {
    border-bottom: 4px solid ${bgColors.white} !important;
    background-color: #f7f9fa;
  }

  .ant-table-row {
    .ant-table-cell:first-child {
      border-top-left-radius: 10px !important;
      border-bottom-left-radius: 10px !important;
    }

    .ant-table-cell:last-child {
      border-top-right-radius: 10px !important;
      border-bottom-right-radius: 10px !important;
    }
  }

  .title {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }
`;

export const Comment = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
  gap: 6px;
  width: 300px;
  height: 65px;
  background: ${bgColors.brilliance};
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 6px;
  font-size: ${fontSizes.f12};
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: ${textColors.blueGray};
  overflow: hidden;
  text-overflow: ellipsis;
`;
