import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const SalaryWrapper = styled.div<{
  shadow?: string;
  textColor?: string;
  cursorPointer?: boolean;
}>`
  cursor: pointer;
  font-weight: 700;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.01em;
  color: ${(props) =>
    props.textColor ? props.textColor : textColors.brilliance};
  background-color: ${(props) => props.color};
  padding: 4px 6px;
  width: fit-content;
  border-radius: ${borders.b4};
  display: flex;
  justify-content: center;
  box-shadow: ${(props) => (props.shadow ? props.shadow : "unset")};
  ${(props) => (!!props.cursorPointer ? "cursor:pointer" : "")}
`;
export const Wrapper = styled.div`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
  width: 100%;

  .editable {
    display: flex;
    align-items: center;
    gap: 5px;

    .crd {
      width: max-content;
    }

    .edit {
      cursor: pointer;
      opacity: 0;

      .note-editor {
        width: fit-content;
        min-width: unset;
      }
    }

    &:hover .edit {
      opacity: 1;
    }
  }
`;
