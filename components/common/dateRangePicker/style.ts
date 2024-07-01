import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div<{ error: string; required: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  .ant-picker {
    background-color: ${bgColors.yukon};
    border: 1px solid ${bgColors.purpleCrystal};
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    width: 100%;
  }

  &:active .ant-picker {
    border: 1px solid ${bgColors.primary};
  }

  &:focus .ant-picker {
    border: 1px solid ${bgColors.primary};
  }
  &:hover .ant-picker {
    border: 1px solid ${bgColors.primary};
  }

  .ant-picker-focused {
    border: 1px solid ${bgColors.primary};
  }

  .ant-picker-cell-inner {
    border: 1px solid ${bgColors.primary};
  }

  &::after {
    ${({ required = false }) =>
      required &&
      css`
        position: absolute;
        content: "*";
        font-size: 20px;
        color: #ff4d4f;
        right: -10px;
        top: -10px;
      `}
  }
  ${({ error }) => {
    if (error) {
      return css`
        .ant-picker {
          border: 1px solid ${bgColors.red};
        }
      `;
    }
  }}
`;
export const Label = styled.label<{ required: boolean }>`
  font-size: ${fontSizes.f12};
  line-height: 15px;
  position: relative;
  margin-bottom: 10px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: ${textColors.sceptreBlue};
`;
