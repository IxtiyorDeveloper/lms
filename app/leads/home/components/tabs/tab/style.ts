import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${bgColors.white};
  overflow: hidden;
  padding: 8px 6px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
`;

export const Buttons = styled.div`
  display: flex;
  .left {
    width: 50%;
  }
  .right {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
`;
export const TableWrapper = styled.div``;
