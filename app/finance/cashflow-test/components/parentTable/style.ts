import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  table {
    width: 100%;
    margin-bottom: 24px;
    border-collapse: separate;
    border-spacing: 1em;
  }

  .main-header {
    color: ${textColors.brilliance};
    font-family: Rubik sans-serif;
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: 1.66;
    letter-spacing: -0.12px;
    background: ${bgColors.sceptreBlue};

    th:first-child {
      border-top-left-radius: 6px !important;
      border-bottom-left-radius: 6px !important;
      padding-left: 2%;
    }
    th:last-child {
      border-top-right-radius: 6px !important;
      border-bottom-right-radius: 6px !important;
    }
  }

  .items {
    background: white;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;

    td:first-child {
      border-top-left-radius: 6px !important;
      border-bottom-left-radius: 6px !important;
      padding-left: 2%;
    }
    td:last-child {
      border-top-right-radius: 6px !important;
      border-bottom-right-radius: 6px !important;
    }
  }
`;

export const TH = styled.th<{ width: number }>`
  width: ${(props) => props.width}%;
  text-align: left;
  padding: 15px 0;
`;
