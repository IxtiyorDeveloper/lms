import styled from "@emotion/styled";
import { textColors } from "styles/theme";

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
  width: 100%;
  .cancel {
    width: 100%;
    color: ${textColors.yourShadow};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
  }

  .save {
    width: 100%;
    color: ${textColors.dark};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #ffe866;
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const CalculationInfoWrapper = styled.div`
  padding: 30px 0 0 0;
`;
