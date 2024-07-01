import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const ProgressPercent = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
  margin-top: 12px;
`;
export const TabContent = styled.div`
  /* max-height: 540px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 50px;
    border: 0 solid transparent;
    background-color: #c1c1c1;
  } */

  .incorrect_text {
    font-size: 16px;
    line-height: 24px;
    color: ${textColors.pop};
    font-weight: 500;
    margin: 12px 0 8px;
  }
  .ant-collapse {
    display: flex;
    gap: 8px;
    flex-direction: column;
    border: none !important;
    background-color: #ffffff !important;
  }
  .ant-collapse-header {
    padding: 12px 16px !important;
    padding: 8px 16px;
    background: ${textColors.whiteSmoke} !important;
    border: 1px solid ${textColors.purpleCrystal};
  }
  .ant-collapse .ant-collapse-content {
    border: 1px solid ${textColors.whiteSmoke};
  }
  .ant-collapse > .ant-collapse-item {
    border-bottom: none;
  }
  .condition {
    padding: 12px 12px 0 12px;
    font-weight: 500;
  }
`;

export const InfoWrapper = styled.div`
  text-align: center;
  margin: 24px auto;
  .label {
    max-width: 420px;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: ${textColors.sceptreBlue};
  }
`;
