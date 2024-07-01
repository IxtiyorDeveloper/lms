import styled from "@emotion/styled";
import { bgColors, borders } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  padding: 30px 40px 0 40px;
`;

export const Content = styled.div`
  background-color: ${bgColors.white};
  padding: 20px;
  border-radius: 8px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 60px;
  justify-content: flex-end;
  .cancel {
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    border-radius: ${borders.b10};
    height: 40px;
    font-weight: 700;
    min-width: 88px;
  }
  .save {
    border-radius: ${borders.b10};
    box-shadow: inset 0 4px 6px #ffe866;
    font-weight: 700;
    height: 40px;
    min-width: 88px;
  }
`;
