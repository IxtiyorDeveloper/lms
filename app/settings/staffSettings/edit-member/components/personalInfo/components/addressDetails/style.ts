import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";
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
`;

export const Flex = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`;

export const ItemWrapper = styled.div<{ gridCol?: string }>`
  margin-bottom: 8px;
  width: 100%;
`;

export const Title = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 700;
  margin-bottom: 20px;
`;
