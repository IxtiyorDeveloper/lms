import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TopSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 10px 20px;
  margin-bottom: 30px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};

  .btn-info {
    background-color: ${bgColors.deep};
    color: ${textColors.white};
    box-shadow: 0 3px 4px 0 #87a5ff inset;
  }
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

export const InputsWrapper = styled.div`
  width: 100%;
`;

export const ItemWrapper = styled.div`
  margin-bottom: 14px;
  width: 100%;
`;

export const PDataInputs = styled.div`
  display: flex;
  gap: 20px;
`;

export const Text = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
`;

export const TextSecondary = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 700;
`;

export const TextLabel = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 500;
  line-height: 15px;
  color: ${textColors.sceptreBlue};
  letter-spacing: -0.01em;
  margin-bottom: 10px;
`;

export const PassportDetails = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
`;

export const ButtonAdd = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
`;
