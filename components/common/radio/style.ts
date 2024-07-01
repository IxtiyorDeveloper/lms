import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div<{ left?: boolean }>`
  width: 100%;
  min-height: 60px;
  position: relative;
  padding: 5px 0;
  display: flex;
  flex-direction: column;

  & span.ant-radio {
    align-self: ${(props) => (props.left ? "center" : "flex-start")} !important;
  }

  .radioStyled {
    padding: 7px 10px;
    background: ${bgColors.brilliance};
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const Label = styled.label``;
