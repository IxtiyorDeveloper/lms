import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const TabHeader = styled.div`
  text-align: center;
  width: 100%;
  z-index: 4;
  height: 100%;
  padding: 5px 0;
  border-radius: 6px;
  font-weight: 600;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const TabWrapper = styled.div`
  width: 100%;
  padding: 8px;
  border-radius: 12px;
  background-color: ${bgColors.white};
  .ant-segmented {
    background-color: ${bgColors.white};
  }
`;
