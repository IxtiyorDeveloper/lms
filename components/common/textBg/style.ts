import styled from "@emotion/styled";
import { bgColors, borders, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  padding: 3px 8px;
  border-radius: ${borders.b4};
  border: 1px solid ${bgColors.brotherBlue};
  font-weight: 700;
  font-size: ${fontSizes.f8};
  line-height: 12px;
  letter-spacing: -0.01em;
  height: fit-content;
`;
