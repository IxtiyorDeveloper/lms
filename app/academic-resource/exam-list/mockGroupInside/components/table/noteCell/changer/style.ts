import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 10px;
  max-width: 250px;
`;
export const Top = styled.div`
  display: flex;
  border-bottom: 1px solid ${bgColors.sceptreBlue};
  padding-bottom: 8px;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
`;
export const Left = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.whiteSmoke};
`;
export const Right = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.brotherBlue};
`;
export const Content = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.whiteSmoke};
  padding-top: 8px;
`;
