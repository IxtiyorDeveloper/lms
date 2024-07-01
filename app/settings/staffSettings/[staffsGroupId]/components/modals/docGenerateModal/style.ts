import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const WrapperForm = styled.form``;

export const ItemWrapper = styled.div`
  margin-bottom: 20px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 20px;

  .btn-close {
    background-color: ${bgColors.wildSand};
    color: ${textColors.yourShadow};
  }
`;

export const NoneDiv = styled.div`
  height: 0;
  width: 0;
  overflow: hidden;
`;

export const PDFWrapper = styled.div`
  width: 800px;
  padding: 45px;

  .top-text {
    text-align: right;
    margin-bottom: 150px;
  }

  .title {
    text-align: center;
    margin-bottom: 30px;
  }

  .text {
    margin-bottom: 40px;
  }

  .text-t {
    margin-bottom: 100px;
    text-align: justify;
    text-indent: 10px;
  }
`;

export const JOWrapper = styled.div`
  position: relative;
  background-color: ${bgColors.white};
  width: 800px;
  height: 1131px;

  .padding-wrapper {
    padding: 45px;
  }

  .top-text {
    text-align: right;
    margin-bottom: 150px;
  }

  .title {
    text-align: center;
    margin-bottom: 5px;
  }

  .sub-title {
    text-align: center;
    margin-bottom: 50px;
  }

  .text {
    margin-bottom: 5px;
    text-indent: 10px;
    letter-spacing: 1px;
  }

  .text-date {
    margin-bottom: 50px;
  }

  .mb-max {
    margin-bottom: 300px;
  }

  .text-t {
    margin-bottom: 100px;
    text-align: justify;
  }
`;

export const LogoSide = styled.div`
  padding-bottom: 10px;
  margin: 0 0 50px 100px;
  width: 180px;
  height: 200px;
  background-color: ${bgColors.primary};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-bottom: 3px solid ${bgColors.dark};
`;

export const FooterPdf = styled.div`
  background-color: ${bgColors.dark};
  margin-top: 80px;
  bottom: 0;
  left: 0;
  right: 0;
  height: 105px;
  display: flex;
  justify-content: center;
  gap: 15px;
`;

export const Card = styled.div`
  margin-top: -40px;
  height: 86px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-direction: column;
  background-color: ${bgColors.primary};
`;

export const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background-color: ${bgColors.white};
  border-radius: 3px;
`;

export const Anchor = styled.a``;

export const LCWrapper = styled.div`
  padding: 35px;
  background-color: ${bgColors.white};
  width: 800px;

  & * {
    font-size: 12px;
  }

  .text-date {
    text-align: right;
    margin-bottom: 20px;
  }

  .title-text {
    margin-bottom: 10px;
    text-align: center;
  }

  .last {
    margin-bottom: 20px;
  }

  .text {
    text-indent: 10px;
    margin-bottom: 20px;
  }

  .title {
    margin-bottom: 15px;
    font-size: 16px;
    line-height: 1.2;
    text-align: center;
  }

  .flex {
    display: flex;
    gap: 100px;
  }
`;
