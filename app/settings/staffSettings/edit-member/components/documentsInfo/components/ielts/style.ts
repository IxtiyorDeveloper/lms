import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const Wrapper = styled.div``;

export const IELTS = styled.div``;

export const Title = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  line-height: 20px;
  margin: 20px 0;
  padding-left: 20px;
`;
export const ScoreWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  padding: 0 20px 20px 20px;
`;
