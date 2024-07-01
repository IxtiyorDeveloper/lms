import styled from "@emotion/styled";
import { textColors } from "styles/theme";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 350px;
  justify-content: flex-end;
  .cancel {
    padding: 10px 24px;
    color: ${textColors.yourShadow};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
  }

  .save {
    padding: 10px 24px;
    color: ${textColors.dark};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #ffe866;
  }
`;
export const InputNumberWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  .col {
    width: 90px;
    flex: 1;
  }
`;
