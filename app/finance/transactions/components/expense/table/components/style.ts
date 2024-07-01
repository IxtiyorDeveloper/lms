import styled from "@emotion/styled";
import { MySelect } from "components";
import { fontSizes, textColors } from "styles/theme";

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

export const Wrapper = styled.div`
  padding: 10px 20px;

  .container {
    display: flex;
    flex-direction: column;

    .items {
      display: flex;
      gap: 5px;

      a {
        width: 100%;
        font-weight: 500;
        font-size: ${fontSizes.f12};
        line-height: 1;
        letter-spacing: -0.01em;
        color: ${textColors.dark};

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
