import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ModalTitle = styled.h4`
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;

export const Wrapper = styled.div`
  height: 720px;
  position: absolute;
  top: -200%;
  overflow-y: auto;

  .table * {
    font-family: "Titillium Web", sans-serif !important;
  }
`;

export const WrapperA = styled.div`
  .clas {
    margin-top: 20px;
  }

  .clas p {
    padding-top: 9px;
    padding-bottom: 9px;
    font-weight: 700;
  }

  ul {
    margin: 10px 0 20px 0;
    border-radius: 8px;
    overflow: hidden;
  }

  ul > li {
    padding: 8px;
    gap: 8px;
    display: flex;
    background-color: ${bgColors.whiteSmoke};
    font-weight: 600;
  }

  ul > li:nth-of-type(even) {
    background-color: ${bgColors.brilliance};
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
