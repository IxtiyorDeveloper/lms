import styled from "@emotion/styled";
import { ESortTypes } from "types";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div``;

export const Icon = styled.div<{ type: ESortTypes }>`
  transform: rotate(
    ${(props) => (props.type === ESortTypes.asc ? "180deg" : "0deg")}
  );
  line-height: 1;
  height: 15px;
`;
export const Container = styled.div`
  display: flex;
  align-items: center;
  user-select: none !important;
  cursor: pointer;
`;

export const Text = styled.p`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.paleSky};
`;
