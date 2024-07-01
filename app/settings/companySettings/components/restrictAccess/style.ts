import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  border-radius: 12px;
  background: ${bgColors.whiteSmoke};
  display: flex;
  padding: 16px;
  margin: 50px 0;
  justify-content: space-between;
`;
export const Title = styled.p`
  color: ${textColors.blueGray};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.14px;
`;

export const Text = styled.p`
  color: ${textColors.soulfulBlue};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.12px;
`;
export const Container = styled.div`
  display: flex;
  gap: 12px;
`;
export const Inner = styled.div``;
