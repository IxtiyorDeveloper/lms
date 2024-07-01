import styled from "@emotion/styled";
import { borders, fontSizes, textColors } from "styles/theme";

export const ModalTitle = styled.h4`
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;

export const Wrapper = styled.div`
  position: absolute;
  top: -200%;

  .table * {
    font-family: "Titillium Web", sans-serif !important;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 20px;
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AmountWrapper = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  color: ${textColors.sceptreBlue};
`;
