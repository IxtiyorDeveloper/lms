import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const ModalTitle = styled.h4`
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;

export const Wrapper = styled.div`
  width: 100%;
  padding-top: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
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
  margin-top: 20px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
