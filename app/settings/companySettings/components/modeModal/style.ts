import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 60px;
  .cancel {
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    border-radius: 8px;
    height: 40px;
    font-weight: 700;
  }
  .save {
    box-shadow: inset 0 4px 6px ${bgColors.friedEgg};
    border-radius: 8px;
    font-weight: 700;
    height: 40px;
  }
`;
