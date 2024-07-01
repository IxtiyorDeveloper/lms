import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
export const Wrapper = styled.div<{
  required: boolean;
  error: boolean;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  .ant-switch {
    border-radius: 22.667px;
    background: ${bgColors.whiteSmoke};
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.16) inset;
    .ant-switch-handle::before {
      background-color: ${bgColors.fluorescent};
    }
    &:hover {
      background-color: ${bgColors.whiteSmoke};
    }
  }
  .ant-switch-checked {
    .ant-switch-handle::before {
      background-color: ${bgColors.white};
    }
  }
  .ant-switch-disabled {
    background: ${bgColors.whiteSmoke} !important;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.16) inset;
    .ant-switch-handle::before {
      background-color: ${bgColors.purpleCrystal};
    }
  }
  button {
    width: fit-content !important;
  }
  .ant-switch-checked {
    background-color: ${bgColors.primary} !important;
  }
  .ant-click-animating-node {
    display: none !important;
  }

  .ant-switch {
    width: 10px;
  }

  .ant-switch-checked .ant-switch * {
    width: 10px;
  }
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
