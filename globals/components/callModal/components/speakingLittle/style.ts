import styled from "@emotion/styled";
import { bgColors } from "styles/theme";
import { IProps, statusColors } from "../userCard";
import { fontSizes, textColors } from "styles/theme";
import {
  MainPhone,
  HomePhone,
  ParentsPhone,
  OtherPhone,
} from "constants/phoneTypes";

const numberColors = {
  [MainPhone]: bgColors.midori,
  [HomePhone]: bgColors.orange,
  [ParentsPhone]: bgColors.deep,
  [OtherPhone]: bgColors.brotherBlue,
};
export const UserWrapper = styled.div<IProps>`
  margin-left: ${(p) => (p.count > 1 ? "12px" : 0)};
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

  .fullName {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 18px;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${textColors.purpleCrystal};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
  }

  ${(props) =>
    props.user?.status
      ? `
         .status {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 2px 14px;
            gap: 10px;
            background: ${
              statusColors[props.user.status as keyof typeof statusColors]
            };
            border-radius: 20px;
            text-align: center;
            color: ${textColors.white};
            flex: none;
            flex-grow: 0;
            font-weight: 500;
            font-size: ${fontSizes.f10};
            line-height: 15px;
            letter-spacing: -0.01em;
            margin-top: 10px;
         }
      `
      : `
        .status {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 2px 6px;
            gap: 10px;
            background: ${bgColors.sceptreBlue};
            border-radius: 20px;
            text-align: center;
            color: ${textColors.yourShadow};
            flex: none;
            flex-grow: 0;
            font-weight: 500;
            font-size: ${fontSizes.f10};
            line-height: 12px;
            letter-spacing: -0.01em;
            margin-top: 10px;
        }
    `}
  ${(props) =>
    props.user?.status
      ? `
        .numberType {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 2px 12px;
            gap: 10px;
            background: ${
              numberColors[props.user.numberType] || props.user.numberColor
            };
            border-radius: 20px;
            color: ${textColors.white};
            font-style: italic;
            font-weight: 500;
            font-size: ${fontSizes.f10};
            line-height: 15px;
            text-align: center;
            letter-spacing: -0.01em;
            margin-top: 10px;
            box-shadow: inset 0 1px 2px ${bgColors.serengeti};
        }
      `
      : `
        .numberType {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 4px 8px;
            gap: 10px;
            background: ${bgColors.sceptreBlue};
            border-radius: 20px;
            color: ${textColors.yourShadow};
            font-style: italic;
            font-weight: 500;
            font-size: ${fontSizes.f10};
            line-height: 15px;
            text-align: center;
            letter-spacing: -0.01em;
            margin-top: 8px;
        }
        `}
`;

export const Wrapper = styled.div`
  color: white;
  width: 380px;

  .flex {
    display: flex;

    .w-100 {
      width: 100%;
    }
  }
  .child {
    direction: ltr;
    display: flex;
    gap: 20px;
    /* margin-left: 10px; */
  }

  .items {
    height: 81px;
    overflow-y: auto;
    direction: rtl !important;
    display: flex;
    flex-direction: column;
    gap: 8px;

    ::-webkit-scrollbar {
      width: 6px;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-track {
      background: ${bgColors.blueGray};
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: ${bgColors.soulfulBlue};
      border-radius: 10px;
    }
  }

  .buttons {
    display: flex;
    align-items: flex-end;
    height: 100%;
    padding: 14px 0;
    gap: 12px;
  }

  .cancel1 {
    width: 50px !important;
    height: 50px !important;
    background: ${bgColors.pop} !important;
    border-radius: 50%;
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    align-self: flex-end;
  }

  .answer1 {
    width: 50px !important;
    height: 50px !important;
    background: ${bgColors.midori} !important;
    border-radius: 50%;
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    align-self: flex-end;
  }
`;
