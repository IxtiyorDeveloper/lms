import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 10px;
`;
export const Title = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.white};
`;

export const SubLevel = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.brotherBlue};
  margin-top: 6px;
`;
export const Row = styled.div``;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #353945;
  margin: 5px 0;
`;
