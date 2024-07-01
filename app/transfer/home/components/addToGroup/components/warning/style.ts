import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 12px;
  background: ${bgColors.pumpkin};
  border-radius: 8px;
  display: flex;
  gap: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: ${textColors.white};
  span {
    background: ${bgColors.martian};
    border-radius: 2px;
    padding-inline: 4px;
  }
`;
