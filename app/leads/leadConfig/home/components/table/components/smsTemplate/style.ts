import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .title {
    font-weight: 700;
  }

  .center {
    text-align: center;
  }

  .actions {
    display: flex;
    gap: 8px;

    div {
      cursor: pointer;
      user-select: none;
    }
  }

  .text {
    font-style: normal;
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 20px;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
    overflow-x: hidden;
    text-overflow: ellipsis;
    max-width: 70%;
  }

  .edit {
    width: 38px;
    height: 38px;
    left: 1079px;
    top: 16px;
    background: ${bgColors.brilliance};
    border: 1px solid ${bgColors.purpleCrystal};
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
