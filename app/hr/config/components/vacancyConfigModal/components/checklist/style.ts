import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const DraggableItemWrapper = styled.div`
  position: relative;
  margin-top: 20px;
  .grip {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: -10px;
  }
`;
export const FieldWrapper = styled.div`
  border-radius: 10px;
  background: ${bgColors.whiteSmoke};
  box-shadow: 0 0 45px 0 rgba(0, 0, 0, 0.02) inset;
  padding: 12px 16px 16px;
`;
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
export const Plus = styled.div`
  width: 20px;
  height: 20px;
  left: 20px;
  top: 146px;
  background: ${bgColors.white};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px solid ${bgColors.secondary};
`;
