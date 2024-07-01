import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const Title = styled.p`
  color: ${textColors.blueGray};
  text-align: center;
  font-size: ${fontSizes.f14};
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.14px;
`;
export const Right = styled.div`
  display: flex;
  gap: 4px;
`;
export const Label = styled.p`
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const Value = styled.p`
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
