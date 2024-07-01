import styled from "@emotion/styled";
import { HexToRgbA } from "utils/hexToRgba";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background: ${HexToRgbA(bgColors.whiteSmoke, 0.4)};
  border: 1px solid ${HexToRgbA(bgColors.purpleCrystal, 0.8)};
  border-radius: 16px;
  padding: 20px;
  margin: 0 0 20px 0;
`;

export const FormWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding-top: 30px;
  gap: 12px;
`;

export const PlusWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.7;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }
`;

export const ItemWrapper = styled.div<{ gridCol?: string }>`
  margin-bottom: 8px;
  width: 100%;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;

  .btn-secondary {
    background: ${bgColors.wildSand};
    color: ${textColors.yourShadow};
  }
`;
