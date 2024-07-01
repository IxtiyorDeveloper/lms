import styled from "@emotion/styled";
import Link from "next/link";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .segmented-content-container {
    .ant-segmented {
      background: ${bgColors.greyWhale};
      border: 1px solid ${bgColors.purpleCrystal};
      box-shadow: 0 0 4px 0 rgba(177, 181, 195, 0.2) inset;
    }
    .ant-segmented-item {
      padding: 12px 0 !important;
    }
  }

  .ant-segmented-item-selected {
    border-radius: 8px;
    background: ${bgColors.white};
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    .item {
      border-right: hidden;
    }
    .count {
      color: ${textColors.white};
      background-color: ${bgColors.pop};
    }
  }

  .ant-segmented-item-label {
    display: flex;
    justify-content: space-between;
    padding: 0;
  }
  .ant-segmented-thumb {
    background: ${bgColors.white};
  }
`;

export const OptionWrapper = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  .col_left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  &.item {
    border-right: 1.5px solid #d5d7de;
    transition: all 0.3s ease-in-out;
    opacity: 1;
  }
  &:hover {
    color: ${textColors.blueGray};
  }
`;
export const LabelCount = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: fit-content;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.12px;
  border-radius: 30px;
  color: ${textColors.brilliance};
  background: ${bgColors.sadet};
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1) inset;
  &.count {
    min-width: 24px;
  }
`;
