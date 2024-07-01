import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  height: 100%;
  align-items: center;
`;
export const Time = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  color: ${textColors.blueGray};
`;
export const Later = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  color: ${textColors.brotherBlue};
`;
