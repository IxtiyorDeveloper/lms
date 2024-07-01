import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

export const Item = styled.div<{
  disabled: boolean;
  activeColor: string;
  isActive: boolean;
  activeTextColor: string;
  shadow?: string;
}>`
  background: ${(props) =>
    props.isActive
      ? props.activeColor
      : !props.disabled
      ? "#0F0F0F"
      : bgColors.cardDark};
  border-radius: 8px;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 15px;
  letter-spacing: -0.01em;
  color: ${(props) =>
    props.isActive
      ? props.activeTextColor
      : !props.disabled
      ? textColors.brotherBlue
      : textColors.sceptreBlue};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  cursor: ${(props) => (!props.disabled ? "pointer" : "not-allowed")};
  box-shadow: ${(props) => (props.isActive ? props.shadow : null)};
`;
