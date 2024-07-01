import styled from "@emotion/styled";
import { HexToRgbA } from "utils/hexToRgba";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const CardWrapper = styled.div`
  background: ${HexToRgbA(bgColors.whiteSmoke, 0.4)};
  border: 1px solid ${HexToRgbA(bgColors.purpleCrystal, 0.8)};
  border-radius: 16px;

  & > .title {
    padding: 20px 20px 0 20px;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;

  .title {
    display: flex;
    flex: 1;
  }

  .image-wr {
    width: 200px;
    min-width: 200px;
  }
`;

export const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

export const Flex = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;

  .button {
    width: fit-content;
  }

  .gender {
    display: flex;
    align-items: flex-end;
    gap: 8px;

    & > div {
      width: 100%;
    }
  }
`;

export const ItemWrapper = styled.div`
  margin-bottom: 14px;
  width: 100%;
`;

export const TextLabel = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: 15px;
  color: ${textColors.sceptreBlue};
  letter-spacing: -0.01em;
  margin-bottom: 10px;
`;
