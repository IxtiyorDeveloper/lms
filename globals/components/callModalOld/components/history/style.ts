import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  height: 400px;
  color: white;
  overflow: hidden;

  .ant-input-affix-wrapper {
    background: ${bgColors.dark} !important;
    text-align: right;
    border: 0;
    outline: 0;
    border-radius: 6px;

    input {
      z-index: 1000;
      border: 0;
      background: ${bgColors.dark} !important;
      border-radius: 6px;
    }

    .ant-input {
      color: white !important;
    }
  }

  .staff_container {
    margin-top: 10px;
    overflow-y: auto;
    max-height: 380px;

    ::-webkit-scrollbar {
      width: 0 !important;
    }
  }
`;
