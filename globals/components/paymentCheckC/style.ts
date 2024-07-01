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
  top: -1000px;
  height: 500px;
  overflow-y: auto;

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

export const styles = {
  title: {
    fontFamily: "Arial, Helvatica, sans-serif",
    fontWeight: 600,
    fontSize: fontSizes.f14,
    lineHeight: "13px",
  },
  tdRight70: {
    width: "70%",
    textAlign: "right" as any,
  },
  tdLeft30: {
    width: "30%",
  },
  value: {
    fontSize: fontSizes.f14,
    fontFamily: "Arial, Helvatica, sans-serif",
    fontWeight: 700,
    lineHeight: "13px",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  absoluteTitle: {
    transform: "rotate(45deg)",
    width: "55px",
    top: 0,
    right: "7px",
    position: "absolute" as any,
    borderBottom: "2px dashed black",
    borderTop: "2px dashed black",
    paddingTop: "1px",
  },
};
