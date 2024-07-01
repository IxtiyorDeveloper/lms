import styled from "@emotion/styled";
import { textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 16px 0;
  padding: 16px;
  border-radius: 16px;
  background-color: ${textColors.whiteSmoke};
  .name {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: -0.01em;
    text-align: left;
    color: ${textColors.sceptreBlue};
  }
  .level {
    font-size: 12px;
    font-weight: 400;
    line-height: 15.52px;
    text-align: left;
    color: ${textColors.soulfulBlue};
  }
  .ant-progress.ant-progress-circle .ant-progress-text {
    font-size: 10px;
    font-weight: 500;
    line-height: 12.1px;
    letter-spacing: -0.01em;
    text-align: center;
    color: ${textColors.soulfulBlue};
  }
`;
