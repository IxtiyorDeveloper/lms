import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  overflow: hidden;
  padding: 16px;

  color: wheat;

  ::-webkit-scrollbar {
    display: none;
  }

  .user {
    display: flex;
    gap: 16px;
    overflow: auto;

    ::-webkit-scrollbar {
      display: none;
    }

    .minWidth100 {
      min-width: 100%;
    }

    .user_item {
      min-width: 50%;
    }
  }

  .cancel {
    margin-top: 10px;
    cursor: pointer;
    background: ${bgColors.pop};
    height: 50px;
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.2),
      inset 0 2px 3px ${bgColors.peach};
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${textColors.white};
  }

  .buttons {
    display: flex;
    gap: 16px;
    margin-top: 10px;
    align-items: center;
    justify-content: center;

    .answer {
      cursor: pointer;
      background: ${bgColors.midori};
      height: 50px;
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.2),
        inset 0 2px 3px ${bgColors.serengeti};
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${textColors.white};
      width: 100%;
    }

    .cancel {
      margin-top: 0;
      cursor: pointer;
      background: ${bgColors.pop};
      height: 50px;
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.2),
        inset 0 2px 3px ${bgColors.peach};
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${textColors.white};
      width: 100%;
    }
  }
`;
