import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .image {
    margin: 0 !important;
  }

  .flex {
    display: flex;
    width: 30px;
    height: 30px;
    flex-direction: column;

    .text {
      font-style: italic;
      font-weight: 600;
      font-size: ${fontSizes.f8};
      line-height: 10px;
      letter-spacing: -0.01em;
      color: ${textColors.sceptreBlue};
      white-space: nowrap;
      margin-top: 2px;
      align-self: center;
    }

    .del {
      display: none;
      position: absolute;
      bottom: -2px;
      z-index: 100;
      align-self: center;
      justify-content: center;
      right: -2px;
      height: 14px;
      width: 14px;
      border-radius: 50%;
      background-color: ${bgColors.pop};
    }

    &:hover .del {
      display: flex;
      cursor: pointer;
    }
  }
`;
