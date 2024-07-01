import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 0 40px;
  width: 100%;
  .filter {
    background: ${bgColors.brilliance};
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
  }
`;
