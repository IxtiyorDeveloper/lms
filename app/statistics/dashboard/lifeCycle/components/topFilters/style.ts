import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  background: ${bgColors.white};
  width: 100%;
  padding-bottom: 16px;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  display: flex;
  justify-content: space-between;
  .tag-item {
    display: flex;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.yourShadow};
    align-items: center;
    gap: 4px;
  }

  .ant-tag {
    background: ${bgColors.wildSand};
    padding: 6px 10px;
    border-radius: 16px;
    svg {
      path {
        stroke: ${textColors.yourShadow} !important;
      }
      circle {
        stroke: ${textColors.yourShadow} !important;
      }
    }
  }

  .ant-tag-checkable-checked {
    background: ${bgColors.orange} !important;
    svg {
      path {
        stroke: ${bgColors.white} !important;
      }
      circle {
        stroke: ${bgColors.white} !important;
      }
    }

    p {
      color: ${bgColors.white} !important;
    }
  }
`;
