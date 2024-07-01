import styled from "@emotion/styled";
import { bgColors, borders } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 340px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  padding: 20px;
  background: ${bgColors.white};
  border-radius: ${borders.b10};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 60px;
`;
