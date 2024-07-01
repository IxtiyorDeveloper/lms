import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  background: ${bgColors.white};
`;
export const PodoCount = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  border-bottom: 1px solid ${bgColors.purpleCrystal};
  align-items: center;

  .buttons {
    display: flex;
    gap: 4px;
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
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
