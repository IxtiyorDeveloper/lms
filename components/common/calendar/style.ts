import styled from "@emotion/styled";
import { bgColors, borders, fontSizes } from "styles/theme";
import TimePicker from "antd/lib/time-picker";

export const Wrapper = styled.div`
  input {
    background-color: ${bgColors.whiteSmoke};
    padding: 8px 12px;
    border-radius: ${borders.b6};
    max-width: 80px;
  }

  label {
    display: none;
  }

  fieldset {
    display: none;
  }

  & .ant-picker {
    padding: 2px !important;
    font-size: ${fontSizes.f10}!important;
    line-height: 1.2;

    .ant-picker-suffix {
      margin-inline-start: 1px !important;
    }
  }
`;

const StyledTimePicker = styled(TimePicker)`
  &:where(.css-dev-only-do-not-override-sk7ap8).ant-picker-focused {
    border-color: ${bgColors.primary}!important;
    box-shadow: 0 0 0 2px rgb(5 145 255 / 10%);
    border-inline-end-width: 1px;
    outline: 0;
  }
  &:where(.css-dev-only-do-not-override-sk7ap8).ant-picker:hover,
  :where(.css-dev-only-do-not-override-sk7ap8).ant-picker-focused {
    border-color: ${bgColors.primary}!important;
    border-inline-end-width: 1px;
  }
`;

export default StyledTimePicker;
