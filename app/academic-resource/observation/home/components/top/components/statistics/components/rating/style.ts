import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 5px;
  background: ${bgColors.white};
  border: 1px solid ${bgColors.purpleCrystal};
  box-shadow: inset 0px 0px 45px rgba(0, 0, 0, 0.02);
  border-radius: 6px;
  width: 100%;
`;
export const Header = styled.p`
  background: ${bgColors.sceptreBlue};
  border-radius: 2px;
  font-style: normal;
  font-weight: 400;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.brilliance};
  padding: 5px 10px;
`;
export const Content = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const Amount = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
  flex: none;
  order: 0;
  flex-grow: 0;
`;
