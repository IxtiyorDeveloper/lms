import styled from "@emotion/styled";
import { bgColors } from "styles/theme";
export const Wrapper = styled.div`
  td:nth-of-type(6) {
    background: ${bgColors.hat} !important;
    width: 60px;
  }
`;
export const ResetButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 4px 8px;
`;
