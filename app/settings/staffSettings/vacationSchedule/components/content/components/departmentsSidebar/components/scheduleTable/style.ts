import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TableContainer = styled.div`
  position: relative;
  min-height: 60vh;
  width: calc(100% - 256px);
  flex: 1;
`;

export const WrapperControlPanel = styled.div`
  background-color: ${bgColors.white};
  border-radius: 10px;
  margin-bottom: 6px;
`;

export const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
`;

export const BottomWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background: ${bgColors.white};
    border-radius: 10px;
    
    .scroller {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        min-width: 20px;
        height: 20px;
        background: ${bgColors.white};
        border-radius: 50%;
        box-shadow: 0 2px 10px 0 #0000001a;
        bottom: 10px;
        opacity: 1;
        transition: 0.1s ease-in;

        &:hover {
            opacity: 1;
        }

        & > .rotate {
            transform: rotate(180deg);
        }
    }

    .prev {
        left: 5px;
    }

    .next {
        right: 5px;
    }

    .year {
        margin-bottom: 7px;
        font-size: ${fontSizes.f12};
        color: ${textColors.yourShadow};
        font-weight: 600;
        padding-left: 10px;
    }

    .period-wrapper {
        height: 100%;
        padding: 8px 0;
        border-left: 1px solid ${bgColors.whiteSmoke};
    }

    .months {
        display: flex;

        & > p {
            cursor: pointer;
            padding: 3px 9px;
            border-radius: 4px;
            font-weight: 500;
            color: ${textColors.sceptreBlue};
            width: 40px;
            font-size: ${fontSizes.f12};

            &:hover {
                background: ${bgColors.whiteSmoke};
            }
        }

        & > .active {
						color: ${textColors.white};
            background: ${bgColors.yourShadow};

            &:hover {
                background: ${bgColors.yourLighter};
            }
        }

        .current {
            border: 1px solid ${bgColors.primary};
        }

        & > .active-current {
            background: ${bgColors.primary};

            &:hover {
                background: ${bgColors.sunny};
            }
        }
    }
`;

export const PeriodWrapper = styled.div`
    //position: relative;
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */

    & {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }

    //width: calc(100% - 200px);
    //height: 61px;
`;

export const RightSide = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
`;

export const HelpIcon = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: ${fontSizes.f12};
    font-weight: 500;
    color: ${textColors.sceptreBlue};
`;

export const ContentWrapper = styled.div`
    background: ${bgColors.white};
    padding: 12px;
    border-radius: 10px;
    box-shadow: 0 32px 48px -8px #0000001A, 0 0 14px -4px #0000000D, 0 40px 64px -12px #00000014;
`;

export const DetailsContent = styled.div`
    display: grid;
    grid-template-rows: repeat(7, 50px);
    gap: 10px;
    grid-auto-flow: column;
    grid-auto-columns: 270px 270px;
`;

export const Detail = styled.div`
    display: flex;
    gap: 10px;
    width: 270px;
`;

export const TextSide = styled.div`    
    width: calc(100% - 50px);
    
    .title-sign {
        font-size: ${fontSizes.f12};
        font-weight: 500;
        color: ${textColors.sceptreBlue};
    }
    
    .text-sign {
        font-size: ${fontSizes.f10};
        font-weight: 500;
        color: ${textColors.sadet};
    }
`;

export const BoxWrapper = styled.div`
    height: 50px;
    width: 50px;
    background-color: ${bgColors.whiteSmoke};
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    .box {
        height: 28px;
        width: 28px;
    }

    .upcoming {
        background-color: ${bgColors.midoriVacation};
        border-radius: 2px;
    }

    .upcoming-early {
        background-color: ${bgColors.midoriVacation};
        border-radius: 2px;
        border: 1px solid #E92857;
    }

    .recommended {
        background-color: ${bgColors.white};
        border-radius: 2px;
        border: 1px solid #E6E8EC;
    }

    .not-recommended {
        background-color: #FCD3E2;
        border-radius: 2px;
        border: 1px solid #FCD3E2;
    }

    .past-early {
        background-color: ${bgColors.paleGray};
        border-radius: 2px;
        box-shadow: 0 0.699999988079071px 2.1000001430511475px 0 #FFFFFF63 inset, 0 -0.699999988079071px 2.1000001430511475px 0 #00000014 inset;
        border: 1px solid #E92857;
    }

    .not-working {
        background-color: ${bgColors.whiteSmoke};
        border-radius: 2px;
        box-shadow: 0 0 1px 0 #00000059, 0 1px 3px 0 #0000001A;
    }

    .current-month {
        background: #FFCF000D;
        border-left: 1px dashed ${bgColors.primary};
        border-right: 1px dashed ${bgColors.primary};
    }

    .selected-month {
        background: #1414160D;
        border-left: 1px dashed ${bgColors.sadet};
        border-right: 1px dashed ${bgColors.sadet};
    }

    .late {
        border-radius: 2px;
        border: 1px solid #FCD3E2;
        background: #fff2f6 repeating-linear-gradient(
                -50deg,
                #ffffff,
                #ffffff 4px,
                #fff2f6 3px,
                #fff2f6 10px
        );
    }

    .past {
        background-color: ${bgColors.paleGray};
        border-radius: 2px;
        border: 1px solid #E6E8EC;
        box-shadow: 0 0.699999988079071px 2.1000001430511475px 0 #FFFFFF63 inset, 0 -0.699999988079071px 2.1000001430511475px 0 #00000014 inset;
    }
`;

export const TitleText = styled.p`
    font-size: ${fontSizes.f14};
    font-weight: 500;
    letter-spacing: -1px;
    color: ${bgColors.sceptreBlue};
    margin-bottom: 12px;
`;

export const LeftSide = styled.div`
  display: flex;
  min-width: 223px;
  gap: 32px;
`;

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: ${fontSizes.f12};
  font-weight: 500;
  gap: 6px;

  .ant-switch {
    min-width: 34px !important;
    height: 20px !important;

    &.ant-switch-checked .ant-switch-handle {
      inset-inline-start: calc(100% - 17px);
    }

    .ant-switch-handle {
      height: 14px;
      width: 14px;
      top: 3px;
    }
  }
`;

export const StaffNameWrapper = styled.div`
  text-transform: uppercase;
  font-size: ${fontSizes.f12};
  font-weight: 500;
  color: ${textColors.brotherBlue};
  padding: 23px 12px;
  width: 200px;
  border-right: 1px solid ${bgColors.whiteSmoke};
`;
