import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const Top = styled.div`
  display: flex;
  gap: 14px;
`;
export const Plus = styled.div`
  width: 20px;
  height: 20px;
  left: 20px;
  top: 146px;
  background: ${bgColors.primary};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const DynamicFields = styled.div``;
export const FieldWrapper = styled.div`
  background: #fcfcfd;
  border: 1px solid #f4f5f6;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;

  .grip {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: -10px;
    display: none;
  }

  &:hover .grip {
    display: block;
  }
`;
export const Row = styled.div`
  display: flex;
  gap: 14px;
  justify-content: space-between;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
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
  display: flex;
  gap: 10px;
`;
