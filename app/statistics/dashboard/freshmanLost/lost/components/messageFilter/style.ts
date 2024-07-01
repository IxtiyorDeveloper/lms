import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  background-color: ${bgColors.white};
  align-items: center;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  display: flex;
  gap: 10px;
  padding: 4px 8px;

  .item {
    background: ${bgColors.primary};
    box-shadow:
      inset 0 -1px 1px rgba(0, 0, 0, 0.04),
      inset 0 2px 2px rgba(255, 223, 63, 0.8);
    border-radius: 10px;
    width: 44px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
