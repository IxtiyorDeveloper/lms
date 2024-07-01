import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 6px;
  padding-top: 20px;

  .btn-secondary {
    background-color: ${bgColors.wildSand};
    color: ${textColors.yourShadow};
    white-space: nowrap;
    font-weight: 500;
  }

  .docs {
    display: flex;
    gap: 6px;
  }
`;
