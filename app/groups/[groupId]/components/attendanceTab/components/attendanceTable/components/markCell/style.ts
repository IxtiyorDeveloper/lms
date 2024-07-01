import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Container = styled.div<{ borderColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: fit-content;
  margin-inline: auto;
  padding: 2px;
  border-radius: 19px;
  border: 2px solid ${(props) => props.borderColor};
`;

export const MarksWrapper = styled.div<{ bgColor: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: ${fontSizes.f8};
  background: ${bgColors.midori};
  color: ${textColors.white};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.bgColor};
  line-height: 1;
`;
