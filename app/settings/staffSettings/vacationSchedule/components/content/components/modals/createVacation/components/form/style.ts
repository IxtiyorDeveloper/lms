import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const FormWrapper = styled.div`
  & > form > div {
    padding: 20px;

    .date-picker {
      min-height: 36px !important;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  background-color: ${bgColors.brilliance};
  border-top: 1px solid ${bgColors.whiteSmoke};
  padding: 20px;
  border-radius: 0 0 16px 16px;

  .secondary {
    background-color: ${bgColors.wildSand};
    color: ${textColors.yourShadow};
  }
`;

export const LabelPeriod = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  .ant-switch {
    min-width: 34px !important;
    height: 17px !important;

    &.ant-switch-checked .ant-switch-handle {
      inset-inline-start: calc(100% - 14px);
    }

    .ant-switch-handle {
      height: 11.3px;
      width: 11.3px;
      top: 3px;
    }
  }
`;
