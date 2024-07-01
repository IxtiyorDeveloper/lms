import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  IProps,
  statusColors,
} from "globals/components/callModal/components/userCard";
import { numberColors } from "globals/components/callModal/components/userCard/style";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div<{ isOpen: boolean }>`
  .child {
    max-height: 200px;
    overflow-y: auto;
    user-select: none;
    margin: 8px 0;
    height: ${(p) => (p.isOpen ? "" : 0)}!important;

    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #f5f5f5;
    }

    ::-webkit-scrollbar {
      width: 4px;
      background-color: #f5f5f5;
      border-radius: 10px;
      margin: 4px 0;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: ${bgColors.sceptreBlue};
    }
  }

  .date-c {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px 0;
  }

  .date {
    padding: 4px 10px;
    gap: 10px;
    background: ${bgColors.blueGray};
    border-radius: 34px;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.yourShadow};
    align-self: center;
    width: min-content;
    white-space: nowrap;
  }
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right: 4px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
  gap: 8px;
  background: ${bgColors.blueGray};
  border-radius: 10px;

  .cursor {
    cursor: pointer;
  }

  audio {
    width: 100%;
    height: 40px;
    border-radius: 8px;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
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

  .called-time {
    font-family: "Inter";
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: ${textColors.yourShadow};
  }

  .statuses {
    display: flex;
    gap: 6px;
    align-items: center;
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
    color: ${textColors.brilliance};
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
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
            background: ${numberColors[
              props.user.numberType as keyof typeof numberColors
            ] || props.user.numberColor};
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
            margin-top: 2px;
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
            margin-top: 2px;
          }
        `}
`;

const colors = {
  Waiting: bgColors.orange,
  Banned: bgColors.pop,
  Archived: bgColors.soulfulBlue,
  Stopping: bgColors.pop,
  Lead: bgColors.soulfulBlue,
  Staff: bgColors.soulfulBlue,
  "Not attended": bgColors.palomino,
  Attended: bgColors.palomino,
  Studying: bgColors.midori,
  Transferring: bgColors.royal,
  Transferred: bgColors.royal,
};

export const UserStatusWrapper = styled.div<{ status: string }>`
  background-color: ${(p) =>
    colors?.[p.status as keyof typeof colors] || "red"}!important;
`;
