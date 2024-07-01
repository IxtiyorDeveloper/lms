import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  margin-top: 20px;
  .progress_line_chart {
    padding: 64px;
    background-color: ${bgColors.white};
    border-radius: 16px;
    margin-top: 24px;
  }
  h2 {
    //margin-bottom: 20px;
    padding: 20px;
  }
  .progress_container {
    display: flex;
    align-items: center;
  }
  .class {
    width: 95% !important;
    padding: 0 20px 20px 20px;
  }
  .circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #58c26a;
    font-weight: 600;
    line-height: 32px;
    font-size: ${fontSizes.f18};
    color: ${bgColors.white};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .my_statistic {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    padding: 0 10px;

    .position {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .position {
    margin-top: 4px;
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 24px;
    text-align: justify;
    color: #303940;
    span {
      color: #c94c5c;
    }
  }
  .progress_line {
    height: 300px;
  }
`;
