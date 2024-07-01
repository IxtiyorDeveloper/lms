import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

export const Name = styled.div`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
`;
