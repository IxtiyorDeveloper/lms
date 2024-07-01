import styled from "@emotion/styled";
import { fontSizes, borders, textColors, bgColors } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${bgColors.white};
  border-radius: ${borders.b12};
  padding-bottom: 22px;
`;
export const InnerWrapper = styled.div`
  width: 100%;
  padding: 18px;

  .flex {
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
  }

  .flex-btns {
    display: flex;
    gap: 5px;
  }
`;
export const Title = styled.h4`
  font-weight: 600;
  font-size: ${fontSizes.f16};
  line-height: 19px;
  letter-spacing: -0.02em;
  color: #1a1d1f;
`;

export const MiddlePart = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 12px;
  flex-wrap: wrap;
`;
export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(40% - 7px);
`;

export const RightContent = styled.div`
  display: flex;
  width: calc(60% - 7px);
`;

export const ImgPart = styled.div`
  display: flex;
  width: 100%;
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  gap: 14px;
  margin-top: 10px;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 14px;
  width: 100%;
`;
export const ResponsiveImg = styled.div`
  width: calc(50% - 7px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ImageComponent = styled.div`
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  height: 140px;
  width: 140px;
  border-radius: 50%;
  position: relative;
  min-width: 140px;
  .badge {
    position: absolute;
    width: 32px;
    height: 34px;
    right: 0;
    bottom: 0;
    font-weight: 900;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    color: ${textColors.dark};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 1820px) {
    height: 92px;
    width: 92px;
    min-width: 92px;
  }
`;
export const PersonalDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 7px);

  .name {
    font-weight: 600;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    color: ${textColors.blueGray};
    display: flex;
    align-items: center;
    width: 100%;

    .tooltip {
    }

    .full_name {
      width: calc(100% - 20px);
      cursor: pointer;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
      p {
        font-weight: 600;
        font-size: ${fontSizes.f14};
        line-height: 1.2;
        color: ${textColors.blueGray};
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 90%;
      }
    }

    a {
      width: 20px;
    }
  }

  .studying {
    font-weight: 600;
    font-size: ${fontSizes.f10};
    line-height: 12px;
    color: ${textColors.secondary};
    padding: 3px 8px;
    background-color: ${bgColors.transparentGreen};
    width: fit-content;
    border-radius: 10px;
    margin-top: 7px;
  }

  .icons {
    display: flex;
    gap: 23px;
    margin-top: 10px;

    .col {
      p {
        font-weight: 700;
        font-size: ${fontSizes.f12};
        line-height: 1.2;
        color: ${textColors.blueGray};
        text-align: center;
      }
    }
  }

  .lower-buttons {
    display: flex;
  }
`;
export const EditWrapper = styled.div`
  width: fit-content;
  cursor: pointer;
  //margin-left: 13px;
`;
export const Line = styled.div`
  width: 100%;
  height: 0;
  left: 0;
  top: 231px;
  border: 1px solid ${bgColors.whiteSmoke};
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  overflow-x: auto;
  gap: 10px;
`;

export const PrinterWrapper = styled.div`
  height: 40px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid ${bgColors.purpleCrystal};
  transition: 0.3s;

  &:hover {
    background-color: ${bgColors.purpleCrystal};
  }

  &:active {
    background-color: ${`${bgColors.purpleCrystal}60`};
  }
`;
export const LeftActions = styled.div`
  display: flex;
  gap: 10px;
`;
export const RightActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;

  .col {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 50px;

    p {
      font-weight: 600;
      font-size: ${fontSizes.f8};
      line-height: 10px;
      letter-spacing: -0.01em;
      color: #353945;
      margin-top: 2px;
    }
  }
`;
