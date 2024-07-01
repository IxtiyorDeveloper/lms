import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin-top: 20px;

  .block {
    display: block;
  }

  .archive {
    display: block;

    .groups {
      padding-inline: 24px;
    }
  }

  .ant-tag {
    border-radius: 6px;
    background: ${bgColors.wildSand};
    padding: 7px 8px;
    color: ${textColors.soulfulBlue};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.24px;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;

    svg {
      path {
        stroke: ${textColors.yourShadow} !important;
      }

      circle {
        stroke: ${textColors.yourShadow} !important;
      }
    }
  }

  .ant-tag-checkable-checked {
    background: ${bgColors.primary};
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.24px;

    svg {
      path {
        stroke: ${bgColors.white} !important;
      }

      circle {
        stroke: ${bgColors.white} !important;
      }
    }

    p {
      color: ${bgColors.white} !important;
    }
  }

  .ant-tag-checkable:hover {
    color: ${textColors.blueGray} !important;
  }
`;
