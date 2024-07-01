import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const CreateWrapper = styled.div``;

export const BottomSide = styled.div`
  padding: 15px 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  .btn-secondary {
    background: ${bgColors.wildSand};
    color: ${textColors.yourShadow};
  }
`;
