import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 20px 40px;

  .page-routers {
    display: flex;
    gap: 10px;
  }
`;

export const Background = styled.div`
  background-color: ${bgColors.white};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  min-height: 100vh;
`;

export const PaddingWrapper = styled.div`
  padding: 16px;
`;
