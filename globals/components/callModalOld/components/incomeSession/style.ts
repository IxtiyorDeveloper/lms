import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { IProps, statusColors } from "../userCard";
import { css } from "@emotion/react";
import { numberColors } from "../userCard/style";

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

export const Conatiner = styled.div`
  max-width: 200px;
  max-height: 300px;
`;

export const ActiveCallWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 10000;
  background-color: black;
  .pointer {
    cursor: pointer;
  }

  .user {
    display: flex;
    overflow-y: auto;
    gap: 8px;
    padding: 12px;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .flex {
    display: flex;
    margin: 4px;
  }

  .flex-1 {
    display: flex;
    gap: 6px;
    font-family: "Space Grotesk";
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }

  .phone-info {
    font-family: "Space Grotesk";
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }

  .phone-container {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    align-items: center;
  }

  .call-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const SecondaryWrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 8px 8px 8px;
  gap: 6px;
  margin: 0 12px;
  overflow: hidden;
  background: #23262f;
  border-radius: 8px;
  margin-bottom: 8px;

  .pointer {
    cursor: pointer;
  }

  .phone-info-secondary {
    font-family: "Space Grotesk";
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #f4f5f6;
  }

  .actions {
    display: flex;
    gap: 6px;
    align-items: center;
    height: 100%;
    align-self: center;
    margin-top: 6px;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 6px;
    align-items: center;
  }

  .flex-1 {
    display: flex;
    justify-content: space-between;
    gap: 6px;
  }
`;

export const BtnSecondary = styled.div<{ bgColor?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 6.85714px;
  gap: 8.57px;
  width: 24px;
  height: 24px;
  background: ${(p) => p.bgColor ?? "#44b26b"};
  box-shadow: inset 0px 0px 3.42857px 0.857143px rgba(255, 255, 255, 0.2);
  border-radius: 85.7143px;
`;

export const MiniUserCardWrapper = styled.div<IProps>`
  display: flex;
  white-space: nowrap;
  overflow-y: hidden;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: right;
  margin-top: -16px;

  .statuses {
    display: flex;
    gap: 6px;
  }

  .type {
    display: flex;
    justify-content: space-between;
    width: 100%;

    div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      font-style: italic;
      align-items: center;
      padding: 2px 6px;
      gap: 10px;
      background: ${bgColors.sceptreBlue};
      border-radius: 20px;
      font-weight: 500;
      font-size: ${fontSizes.f10};
      line-height: 15px;
      text-align: center;
      letter-spacing: -0.01em;
      color: ${textColors.yourShadow};
    }

    ${(props) =>
      props.user?.type &&
      `
        div:first-of-type {
            background-color: transparent;
            font-weight: 700;
            font-size: ${fontSizes.f12};
            line-height: 15px;
            text-align: center;
            letter-spacing: -0.01em;
            color: ${textColors.white};
        }
    `}
    ${(props) => props.count > 1 && `div:first-of-type {display:none}`}
    ${(props) =>
      props.user?.type &&
      `
        div:nth-of-type(2) {
            background-color: transparent;
            font-weight: 600;
            font-size: ${fontSizes.f10};
            line-height: 15px;
            text-align: center;
            letter-spacing: -0.01em;
            color: ${textColors.brotherBlue};
            font-style: italic;
            padding: 2px 6px;
            gap: 10px;
            background: ${bgColors.sceptreBlue};
            border-radius: 20px;
        }
    `}
    
    .userType {
      white-space: nowrap;
    }
  }

  .fullname {
    margin: 0 auto;
    width: 100px;
    max-width: 100px;
    height: 15px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #fcfcfd;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: auto;
  }

  ${(props) =>
    props.user?.status
      ? css`
          .status {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;
            background: ${statusColors[
              props.user.status as keyof typeof statusColors
            ] as any};
            text-align: center;
            color: ${textColors.white};
            flex: none;
            font-weight: 500;
            font-size: ${fontSizes.f10};
            letter-spacing: -0.01em;
            display: flex;
            height: min-content;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 0 4px;
            border-radius: 36px;
            margin-top: 4px;
          }
        `
      : css`
          .status {
            background: ${bgColors.sceptreBlue};
            line-height: 12px;
            letter-spacing: -0.01em;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;
            text-align: center;
            color: ${textColors.white};
            flex: none;
            font-weight: 500;
            font-size: ${fontSizes.f10};
            letter-spacing: -0.01em;
            display: flex;
            height: min-content;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 0 4px;
            border-radius: 36px;
            margin-top: 4px;
          }
        `}
  ${(props) =>
    props.user?.status
      ? css`
          .numberType {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;
            background: ${numberColors[props.user.numberType] ||
            props.user.numberColor};
            color: ${textColors.white};
            font-style: italic;
            font-weight: 500;
            font-size: ${fontSizes.f10};
            line-height: 15px;
            text-align: center;
            letter-spacing: -0.01em;
            /* box-shadow: inset 0 1px 2px ${bgColors.serengeti}; */
            height: min-content;

            padding: 0 4px;
            border-radius: 36px;
            margin-top: 4px;
          }
        `
      : css`
          .numberType {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;
            background: ${bgColors.sceptreBlue};
            color: ${textColors.yourShadow};
            font-style: italic;
            font-weight: 500;
            font-size: ${fontSizes.f10};
            line-height: 15px;
            text-align: center;
            letter-spacing: -0.01em;

            padding: 0 4px;
            border-radius: 36px;
            margin-top: 4px;
          }
        `}
`;
