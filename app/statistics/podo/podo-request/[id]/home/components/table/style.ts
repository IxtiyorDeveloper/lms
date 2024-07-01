import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
`;
export const TopActions = styled.div`
  background: ${bgColors.white};
  padding: 16px 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .item {
    background: ${bgColors.primary};
    box-shadow: inset 0 -1px 1px rgba(0, 0, 0, 0.04),
      inset 0 2px 2px rgba(255, 223, 63, 0.8);
    border-radius: 10px;
    width: 44px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
