import styled from "@emotion/styled";
import { MySelect } from "components";

export const MySelectC = styled(MySelect)`
  .ant-select-show-search:where(
      .css-dev-only-do-not-override-7g8nz
    ).ant-select:not(
      :where(.css-dev-only-do-not-override-7g8nz).ant-select-customize-input
    )
    .ant-select-selector
    div {
    background-color: red !important;
    height: 40px;
  }
`;
