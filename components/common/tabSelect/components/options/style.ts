import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 8px;
`;
export const Tabs = styled.div``;
export const Container = styled.div<{ listHeight: number }>`
  display: flex;
  flex-direction: column;
  max-height: ${(props) => `${props.listHeight}px`};
  overflow-y: auto;
  padding-right: 4px;

  ::-webkit-scrollbar {
    height: 2px !important;
    width: 2px !important;
  }

  ::-webkit-scrollbar-track {
    background-color: ${bgColors.purpleCrystal};
    -webkit-border-radius: 10px !important;
    border-radius: 10px;
    cursor: pointer !important;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px !important;
    border-radius: 10px;
    background: ${bgColors.primary};
    cursor: pointer !important;
  }
`;
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  gap: 8px;
  background: ${bgColors.brilliance};
  border-radius: 6px;
  justify-content: space-between;
  margin-top: 4px;
  cursor: pointer;

  &.selected {
    background: ${bgColors.primary};
  }
`;

export const RowLabel = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
  max-width: 150px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &.selected {
    font-weight: 700;
  }
`;
export const RowValue = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.01em;
  color: ${textColors.yourShadow};

  &.selected {
    font-weight: 700;
    color: ${textColors.sceptreBlue};
  }
`;
