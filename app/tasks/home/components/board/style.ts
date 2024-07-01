import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const BoardWrapper = styled.div`
  padding: 20px;
  background-color: ${bgColors.white};
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    padding: 10px;
  }
`;
