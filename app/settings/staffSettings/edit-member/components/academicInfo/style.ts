import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 20px;
  .antd-segmented {
    width: auto;
    border-radius: 20px !important;
    background: #f4f4f4 !important;
    padding: 3px 2px;
    border: 0.5px solid ${bgColors.purpleCrystal};
  }
`;

export const TopWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  .col {
    flex: 1;
  }
`;
export const LesseonInfoWrapper = styled.div`
  border-radius: 10px;
  background: #f7f9fa;
  padding: 10px;
  margin: 16px 0;
`;
