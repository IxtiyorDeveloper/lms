import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 40px;

  .btn-cancel {
    background-color: ${bgColors.purpleCrystal};
  }
`;
