import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ModalTitle = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  color: ${textColors.sceptreBlue};
  margin-bottom: 20px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid ${bgColors.wildSand};
  margin-top: 200px;

  .cancel {
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    border-radius: 8px;
    height: 40px;
    font-weight: 700;
  }

  .save {
    box-shadow: inset 0 4px 6px #ffe866;
    border-radius: 8px;
    font-weight: 700;
    height: 40px;
  }
`;
