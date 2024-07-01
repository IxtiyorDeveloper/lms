import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import Input from "components/common/input";
import Link from "next/link";

export const colors = {
  "New student not attended": {
    backgroundColor: bgColors.anakiwa,
    color: textColors.deep,
  },
  "Not attended": {
    backgroundColor: bgColors.anakiwa,
    color: textColors.deep,
  },
  "New student attended": {
    backgroundColor: bgColors.kitten,
    color: textColors.white,
  },
  Studying: {
    backgroundColor: bgColors.transparentGreen,
    color: textColors.midori,
  },
  Transferring: {
    backgroundColor: bgColors.deep,
    color: textColors.white,
  },
  Transferred: {
    backgroundColor: bgColors.pop,
    color: textColors.white,
  },
  Stopping: {
    backgroundColor: bgColors.pepper,
    color: textColors.white,
  },
  Banned: {
    backgroundColor: bgColors.pop,
    color: textColors.white,
  },
  Archived: {
    backgroundColor: bgColors.nouveau,
    color: textColors.obscure,
  },
  Waiting: {
    backgroundColor: bgColors.primary,
  },
};

export const groupColors = {
  Opening: {
    backgroundColor: bgColors.primary,
    color: textColors.dark,
  },
  Opened: {
    backgroundColor: bgColors.kitten,
    color: textColors.white,
  },
  Running: {
    backgroundColor: bgColors.serengeti,
    color: textColors.white,
  },
  Closing: {
    backgroundColor: bgColors.pepper,
    color: textColors.white,
  },
  Closed: {
    backgroundColor: bgColors.slate,
    color: textColors.white,
  },
  Archived: {
    backgroundColor: bgColors.purpleCrystal,
    color: textColors.yourShadow,
  },
};

export const Wrapper = styled.div`
    .capitalize {
        text-transform: capitalize;
    }

    .tab {
        font-size: ${fontSizes.f12};
        padding: 0;
        min-height: 10px;
        margin-top: 22px;
    }
`;

export const HeaderContainerBox = styled.div`
    min-height: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    position: fixed;
    width: calc(100% - 220px);
    z-index: 1000;
    background-color: ${bgColors.hat};
    border-radius: 40px 0 0 0;

    .tax-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .pointer {
        cursor: pointer;
    }

    .username {
        font-weight: 700;
        font-size: ${fontSizes.f14};
        line-height: 1;
    }

    .role {
        font-weight: 400;
        font-size: ${fontSizes.f12};
        line-height: ${fontSizes.f12};
        color: #92929d;
    }

    .actions {
        margin-top: auto;
        margin-bottom: 10px;
        margin-left: 20px;
        display: flex;
        align-self: center;
        gap: 20px;
        align-items: center;
        justify-content: center;
    }
`;

export const HeaderTitle = styled.div`
    font-weight: 600;
    font-size: ${fontSizes.f16};
    line-height: 19px;
    padding: 6px 12px;
    gap: 6px;

    height: 28px;

    background: ${bgColors.brilliance};
    border-radius: 6px;

    @media screen and (max-width: 1150px) {
        display: none;
    }

    @media screen and (max-width: 1250px) {
        max-width: 300px;
        overflow-x: auto;
        height: auto;
    }

    .container {
        display: flex;
        flex-direction: revert;
        gap: 6px;
        flex-wrap: nowrap;

        @media screen and (max-width: 1100px) {
            align-items: center;
        }

        @media screen and (max-width: 1250px) {
            align-items: center;
        }

        div:first-of-type {
            font-style: normal;
            font-weight: 500;
            font-size: ${fontSizes.f12};
            //line-height: 1.2;
            color: ${textColors.brotherBlue};
            display: flex;
            gap: 6px;
        }

        .first div {
            color: ${textColors.blueGray} !important;
        }

        div {
            display: flex;
            gap: 6px;
            font-style: normal;
            font-weight: 600;
            font-size: ${fontSizes.f12};
            //line-height: 1.2;
            text-align: center;
            letter-spacing: -0.01em;
            color: ${textColors.blueGray};
            cursor: pointer;
            user-select: none;
        }

        .arrow {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;

export const InputC = styled(Input)`
    background-color: ${bgColors.white} !important;
    box-shadow: none;
    border: none;

    &:hover {
        background-color: ${bgColors.white} !important;
    }
    
    &:active {
        background-color: ${bgColors.white} !important;
    }
    
    &:focus {
        background-color: ${bgColors.white} !important;
    }

    & * {
        background-color: ${bgColors.white};
    }
`;

export const ContentWrapper = styled.div`
    padding: 10px;
`;

export const ResultWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid ${bgColors.whiteSmoke};
    padding: 10px;
    width: 100%;

    & .status {
        padding: 3px 8px;
        border-radius: 10px;
        font-weight: 600;
        font-size: ${fontSizes.f10};
    }
`;

export const PhoneWrapper = styled.div`
    padding-bottom: 10px;
`;

export const PhoneAndButtonsWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 30px;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    gap: 5px;

    & p:hover {
        color: ${textColors.white} !important;
    }

    & .dark:hover {
        color: ${textColors.sceptreBlue} !important;
    }
`;

export const NameWrapper = styled(Link)`
    margin: 0;
    font-weight: 500;
    font-size: ${fontSizes.f12};
    padding-bottom: 8px;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
        color: ${textColors.white} !important;
    }

    &.dark:hover {
        color: ${textColors.sceptreBlue} !important;
    }
`;

export const Count = styled.span`
    padding: 3px;
    border-radius: 6px;
    background: ${bgColors.wildSand};
    color: ${textColors.yourShadow};
    font-size: ${fontSizes.f10};
    font-weight: 700;
    font-family: "Space Grotesk", sans-serif;
`;

export const ProfileButton = styled(Link)`
    background-color: ${bgColors.serengeti};
    color: ${textColors.white};
    padding: 1px 8px;
    border-radius: 10px;
    font-size: ${fontSizes.f10};
    font-weight: 700;
    opacity: 91%;

    &:hover {
        opacity: 100%;
        color: ${textColors.white};
    }
`;

export const GroupButton = styled(Link)`
    cursor: pointer;
    background-color: ${bgColors.primary};
    color: ${textColors.white};
    padding: 1px 8px;
    border-radius: 10px;
    font-size: ${fontSizes.f10};
    font-weight: 700;
    opacity: 91%;
    max-width: 100px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;

    &:hover {
        opacity: 100%;
        color: ${textColors.white};
    }
`;

export const WrapperC = styled.div`
    padding: 10px;
`;

export const ExampleP = styled.p`
    max-width: 100px;
    width: 100px;
    padding: 10px;
`;

export const ProfileWrapper = styled.div`
    padding: 5px;
    background: #ffffff;
    /* Shadow 2 */
    width: 231px;

    box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);

    border-radius: 12px;

    .log_out {
        background: ${bgColors.pop};
        border-radius: 6px;
        display: flex;
        gap: 8px;
        font-weight: 500;
        font-size: ${fontSizes.f14};
        line-height: 15px;
        letter-spacing: -0.01em;
        color: ${textColors.brilliance};
    }

    .divider {
        border: 1px solid #f4f5f6;
    }

    .username {
        font-weight: 600;
        font-size: ${fontSizes.f14};
        line-height: 1.2;
        letter-spacing: -0.01em;
        color: ${textColors.dark};
        text-align: center;
        margin: 14px 0 12px 0;
    }

    .name {
        font-weight: 600;
        font-size: ${fontSizes.f14};
        line-height: 1.2;
        letter-spacing: -0.01em;
        color: ${textColors.dark};
        text-align: center;
        text-transform: capitalize !important;
    }

    .role {
        font-weight: 500;
        font-size: ${fontSizes.f12};
        line-height: 1.2;
        /* identical to box height */

        letter-spacing: -0.01em;

        /* #353945 */

        color: #353945;
        text-align: center;
    }

    .number {
        font-weight: 500;
        font-size: ${fontSizes.f10};
        line-height: 1.3;
        /* identical to box height */
        text-align: center;

        letter-spacing: -0.01em;

        /* #777E91 */

        color: #777e91;
    }

    .image_container {
        display: flex;
        margin-top: -35px;
        justify-content: center;
    }

    .image {
        border: 4px solid #ffcf00;
        width: 70px;
        height: 70px;
    }

    .edit_button {
        background: #f4f5f6;
        /* New style */

        box-shadow: inset 0 0 45px rgba(0, 0, 0, 0.02);
        border-radius: 6px;
        display: flex;
        gap: 8px;
        font-weight: 500;
        font-size: ${fontSizes.f14};
        line-height: 15px;
        letter-spacing: -0.01em;
        color: ${textColors.yourShadow};
    }
`;

export const TopSide = styled.div`
    background: #141416;
    border-radius: 6px;
    display: flex;
    flex: 1;
    height: 69px;
    padding: 8px;
    justify-content: space-between;

    .edit {
        width: 20px;
        height: 20px;
        background: ${bgColors.blueGray};
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16);
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        display: flex;
    }
`;

export const AvatarWrapper = styled.div`
    display: flex;
    gap: 10px;

    .name-with-arrow {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-bottom: 4px;
    }
`;
export const ChangePasswordWrapper = styled.div`
    display: flex;
    gap: 8px;

    p {
        font-weight: 500;
        font-size: ${fontSizes.f12};
        line-height: 1.2;
        letter-spacing: -0.01em;
        color: ${textColors.yourShadow};
    }
`;

export const CallAction = styled.div<{
  background: string;
  boxShadow?: string;
}>`
    background: ${(props) => props.background};
    box-shadow: ${(props) => props.boxShadow};
    width: 27.69px;
    height: 27.66px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const UlWrapper = styled.ul`
    padding: 4px 0;
    overflow: hidden;
    border-radius: 5px;
    background-color: ${bgColors.white};
    list-style: none;
`;

export const SpanWrapper = styled.span`
    margin-left: 3px;
    padding-left: 2px;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
`;

export const LiWrapper = styled.li`
    padding: 2px 10px;
    line-height: 16px;

    & > span {
        font-size: 12px;
    }
`;
