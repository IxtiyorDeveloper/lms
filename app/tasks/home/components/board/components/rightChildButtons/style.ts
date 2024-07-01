import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  .category-btn {
    display: flex;
    gap: 10px;
    background: ${bgColors.purpleCrystal};
  }
`;
