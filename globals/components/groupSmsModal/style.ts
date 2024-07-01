import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  .title {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }

  .check {
    width: 100%;
    padding: 15px;
    background-color: ${bgColors.wildSand};
    border-radius: 6px;

    & .checkBox {
      align-items: flex-start;

      input {
        outline: none !important;
      }
    }

    & span {
      font-size: ${fontSizes.f12};
    }
  }
`;
export const Content = styled.div`
  margin-top: 20px;

  .flex {
    margin-top: 20px;
    display: flex;
    gap: 14px;
  }
`;

export const Badge = styled.span`
  border-radius: 40px;
  padding: 0 4px;
  font-size: ${fontSizes.f12};
  font-weight: 600;
  color: ${textColors.white};
`;

export const ProfileWrapper = styled.div`
  position: relative;
  padding: 7px 11px;
  background: ${bgColors.brilliance};
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;

  .studying {
    background-color: ${bgColors.transparentGreen};
    color: ${textColors.midori};
    width: 80px;
    padding: 0 4px;
    text-align: center;
    border-radius: 15px;
    font-weight: 600;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }

  .studying-p {
    background-color: ${bgColors.transparentGreen};
    color: ${textColors.midori};
    width: fit-content !important;
    text-align: center;
    border-radius: 15px;
    font-weight: 600;
    padding: 10px;
    margin: 10px;
  }

  & img {
    border-radius: 50%;
  }

  .name {
    padding: 10px;
    font-size: ${fontSizes.f10};
    font-weight: 500;
    line-height: -0.1rem;
  }

  .name-visible {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 110px;
    display: inline-block;
    font-size: ${fontSizes.f10};
    font-weight: 500;
    line-height: -0.1rem;
    padding-left: 2px;
  }

  .phone {
    font-size: ${fontSizes.f10};
    color: ${textColors.yourShadow};
    margin-bottom: 5px;
    margin-top: -5px;
    padding-left: 2px;
    display: block;
  }
`;

export const CheckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: ${fontSizes.f12};
  line-height: 15px;
  text-align: center;
  letter-spacing: -0.01em;
  color: ${bgColors.black};

  div {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
  }
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  padding: 10px;
  background-color: ${bgColors.whiteSmoke};
  gap: 8px;
  max-height: 345px;
  overflow-y: auto;
  border-radius: 6px;

  .profile-extra-styles {
    background-color: ${bgColors.transparent};
    box-shadow: none;
    padding: 0;
    flex-direction: row-reverse;
    align-items: flex-start;
  }

  & .checkbox {
    position: absolute;
    top: 1px;
    right: 5px;
  }

  & * {
    font-size: ${fontSizes.f10};
  }

  & .profile {
    position: relative;
    display: flex;
    gap: 5px;
    align-items: center;
    width: 100%;
    background-color: ${bgColors.white};
    border-radius: 6px;
    padding: 8px;
  }

  .studying {
    width: fit-content !important;
    padding: 0 5px !important;
  }
`;

export const FlexWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid ${bgColors.wildSand};

  .status {
    font-size: ${fontSizes.f10};
    padding: 2px 4px;
    background-color: ${bgColors.primary};
    border-radius: 20px;
    font-weight: 600;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 60px;
  justify-content: flex-end;

  .cancel {
    border-radius: ${borders.b10};
    height: 44px;
    font-weight: 700;
    min-width: 88px;
    color: ${textColors.yourShadow};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    background-color: ${bgColors.wildSand};
  }

  .save {
    color: ${textColors.dark};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #ffe866;
    border-radius: ${borders.b10};
    font-weight: 700;
    height: 44px;
    min-width: 88px;
  }
`;

export const CheckBoxWrap = styled.div`
  position: absolute;
  z-index: 99;
  top: 4px;
  right: 4px;
`;
