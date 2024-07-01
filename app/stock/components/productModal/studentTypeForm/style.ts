import styled from "@emotion/styled";
import { textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .switch {
    display: flex;
    gap: 10px;
    color: ${textColors.sceptreBlue};
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -0.12px;
  }
`;
