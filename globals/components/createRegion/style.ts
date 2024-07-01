import styled from "@emotion/styled";
import { bgColors, borders, textColors } from "styles/theme";

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 50px;
  justify-content: flex-end;

  .cancel {
    border-radius: ${borders.b10};
    height: 44px;
    font-weight: 700;
    min-width: 88px;
    color: ${textColors.yourShadow};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    background-color: ${bgColors.wildSand};
  }

  .save {
    color: ${textColors.dark};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #ffe866;
    border-radius: ${borders.b10};
    font-weight: 700;
    height: 44px;
    min-width: 88px;
  }
`;