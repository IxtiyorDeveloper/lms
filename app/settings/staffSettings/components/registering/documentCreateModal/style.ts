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
  }
`;

export const JOWrapper = styled.div`
  position: relative;
  background-color: ${bgColors.white};
  width: 800px;
  height: 1031px;

  .padding-wrapper {
    padding: 45px;
    padding-bottom: 0 !important;
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
    margin-bottom: 30px;
  }

  .mb-max {
    margin-bottom: 300px;
  }

  .mb-max1 {
    margin-bottom: 250px;
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
  margin-top: 40px;
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
  //padding: 35px;
  background-color: ${bgColors.white};
  width: 800px;

  & p {
    text-align: justify;
    font-size: 12.1px !important;
    margin-bottom: 6px;
  }

  .mb-space {
    margin-bottom: 42px;
  }

  .mb-90 {
    margin-bottom: 210px;
  }

  .mb-100 {
    margin-bottom: 290px;
  }

  .mb-150 {
    margin-bottom: 350px;
  }

  .fill {
    width: 95% !important;
    text-align: justify;
  }

  .s-flex {
    display: flex;

    & .number {
      width: 5% !important;
      display: block !important;
    }
  }

  .table-title-bg {
    background: ${bgColors.dark};
    color: ${textColors.white};
    padding: 4px 10px;
    border-radius: 8px;
    margin: 4px auto;
    width: fit-content;
  }

  table {
    width: 90%;
    margin: 0 auto 20px auto;
    border-collapse: collapse;
    border: 1px solid ${bgColors.dark};

    tr,
    td {
      border: 1px solid ${bgColors.dark};
    }

    td {
      text-align: center;
      padding: 3px;
    }
  }

  .c-flex {
    display: flex;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 3px;
      align-items: center;
    }
  }

  .c-title {
    font-size: 12px;
    font-weight: 700;
    text-align: center;
  }

  .v-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    font-size: 12px;
    margin-bottom: 6px;
  }

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

  .a-flex {
    display: flex;
    justify-content: space-around;

    & > div {
      text-align: center;
      font-weight: 700;
      width: 50%;
    }
  }

  .end {
    font-weight: 700;
    font-style: italic;
    border: 1px solid #1c1e2e;
    padding: 5px;
    margin-top: 20px;
  }

  .ag-flex {
    gap: 30px;
    display: flex;
    justify-content: space-around;

    & > div {
      width: 50%;
    }
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

  .pl {
    padding-left: 40px;

    .number {
      width: 8% !important;
    }

    .fill {
      width: 92% !important;
    }
  }
`;
