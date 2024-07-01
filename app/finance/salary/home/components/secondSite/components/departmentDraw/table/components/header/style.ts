import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { ESortTypes } from "types";

export const StyledHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  background: ${bgColors.white};
  box-shadow: rgba(0, 0, 0, 0.05) 0 0 0 1px;

  .column {
    display: flex;
    align-items: center;
    &:first-of-type {
      width: 20%;
      padding: 4px 16px;
    }

    &:nth-of-type(2) {
      width: 12%;
    }

    &:nth-of-type(3) {
      width: 12%;
    }

    &:nth-of-type(4) {
      width: 12%;
    }

    &:nth-of-type(5) {
      width: 12%;
    }

    &:nth-of-type(6) {
      width: 12%;
    }

    &:nth-of-type(7) {
      width: 12%;
    }

    &:nth-of-type(8) {
      width: 8%;
    }
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
`;
export const Text = styled.p`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.paleSky};
`;
export const Icon = styled.div<{ type: ESortTypes }>`
  display: ${(props) => (props.type === ESortTypes.none ? "none" : "block")};
  transform: rotate(
    ${(props) => (props.type === ESortTypes.asc ? "180deg" : "0deg")}
  );
`;
