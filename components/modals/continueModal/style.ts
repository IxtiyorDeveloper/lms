import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ModalTitle = styled.h4`
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 12px 0 0 0;
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 6px;
  color: ${textColors.white};
  font-size: ${fontSizes.f14};
  font-weight: 600;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Group = styled.div`
  border: 0.5px solid ${bgColors.purpleCrystal};
  background: #fcfcfd;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & p {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f14};
    font-weight: 500;
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 9px;
  margin-bottom: 9px;
  font-weight: 500;
  font-size: ${fontSizes.f14};
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 14px;
  padding-bottom: 17px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
`;
