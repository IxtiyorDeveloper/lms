import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { HexToRgbA } from "utils/hexToRgba";

export const Wrapper = styled.div`
  background: ${HexToRgbA(bgColors.whiteSmoke, 0.4)};
  border: 1px solid ${HexToRgbA(bgColors.purpleCrystal, 0.8)};
  border-radius: 16px;
  padding: 20px;
  margin: 20px 0;
`;

export const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
  max-width: 600px;
`;

export const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 12px;

  .button,
  .btn-confirm {
    width: fit-content;
  }
`;

export const ItemWrapper = styled.div<{ gridCol?: string }>`
  margin-bottom: 8px;
  width: 100%;

  .btn-delete {
    padding: 0 24px;
    color: ${textColors.blueGray};
    background-color: ${bgColors.pale};
  }

  .btn-plus {
    padding: 0 24px;
    color: ${textColors.blueGray};
  }
`;

export const Title = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 700;
  margin-bottom: 16px;
`;
