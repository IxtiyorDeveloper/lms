import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const ItemForm = styled.div`
  margin-bottom: 16px;
`;

export const AttachTitle = styled.h4`
  margin-top: 30px;
`;

export const FileWrapper = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-bottom: 30px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding-top: 10px;

  .cancel {
    background: ${bgColors.wildSand};
    color: ${textColors.yourShadow};
  }
`;
