import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0;
  .segmented-content-container {
    width: auto;
  }
  .ant-segmented {
    background: ${bgColors.wildSand};
  }
  .ant-segmented-item-selected {
    background-color: ${bgColors.primary};

    .text {
      color: ${textColors.dark};
    }
  }
  .ant-segmented-item-label {
    min-height: 32px;
    min-width: 136px;
  }
`;
