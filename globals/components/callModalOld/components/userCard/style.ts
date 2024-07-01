import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { IProps, statusColors } from "./index";
import {
  MainPhone,
  HomePhone,
  ParentsPhone,
  OtherPhone,
} from "constants/phoneTypes";
import { css } from "@emotion/react";

export const numberColors = {
  [MainPhone]: bgColors.midori,
  [HomePhone]: bgColors.orange,
  [ParentsPhone]: bgColors.deep,
  [OtherPhone]: bgColors.brotherBlue,
};

export const Wrapper = styled.div<IProps>`
  display: flex;
  background: ${bgColors.cardDark};
  border-radius: 8px;
  /* justify-content: center; */
  align-items: center;
  background-color: ${bgColors.blueGray};
  gap: 8px;
  isolation: isolate;
  padding: 8px;
  width: 220px;
  /* overflow: hidden; */

  .flex {
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
  .fullName-container {
    overflow: hidden !important;
    max-width: 170px !important;
    white-space: nowrap;
    text-overflow: ellipsis !important;
    display: block;
    padding-right: 4px;
    color: ${textColors.brilliance};
  }

  .fullName {
    font-size: ${fontSizes.f12};
    line-height: 18px;
    text-align: center;
    letter-spacing: -0.01em;

    font-weight: 600;
  }

  .status {
    height: 10px;
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
