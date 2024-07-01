import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  //padding: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .spin {
    padding: 21px;
  }

  .ant-btn {
    display: flex !important;
    padding: 10px 24px !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 10px !important;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.66; /* 166.667% */
    letter-spacing: -0.12px;
    border-radius: 10px;
    color: ${textColors.pop};
    background: ${bgColors.pale};
  }

  .cancel {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding-top: 20px;
  }
`;
