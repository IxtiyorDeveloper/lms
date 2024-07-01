import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 20px;
  gap: 20px;
  border-radius: 12px;
  background: #fff;
  margin-top: 20px;
`;

export const Box = styled.div`
  border-radius: 12px;
  border: 0.5px solid ${bgColors.whiteSmoke};
  background: ${bgColors.brilliance};
  box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.02) inset;
  padding: 20px;
  width: 100%;
  margin-top: 20px;
`;

export const Title = styled.p`
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.12px;
  margin-bottom: 20px;
`;
