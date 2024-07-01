import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {bgColors, borders, fontSizes, textColors} from "styles/theme";

export const ModalTitle = styled.h4`
  padding: 20px;
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;


export const Last = styled.div<{ isErr: boolean }>`
  display: flex;
  align-items: ${(props) => (props.isErr ? "center" : "flex-end")};
  gap: 15px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 16px 20px 20px 20px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  background: ${bgColors.brilliance};
  border-top: 1px solid ${bgColors.whiteSmoke};
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 6px;
  color: ${textColors.white};
  font-size: ${fontSizes.f14};
  font-weight: 600;
`;

export const Group = styled.div`
  border: 0.5px solid ${bgColors.purpleCrystal};
  background: #fcfcfd;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & p {
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    margin-top: 8px;
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 9px;
  margin-bottom: 9px;
  font-weight: 500;
  font-size: ${fontSizes.f14};
`;

export const FormWrapper = styled.div<{ flexStart?: boolean }>`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 14px;
  ${({ flexStart }) =>
    flexStart &&
    css`
      align-items: flex-start;
    `}
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AmountWrapper = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  color: ${textColors.sceptreBlue};
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px 20px 24px;
  gap: 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  color: ${textColors.yourShadow};
`;

export const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: ${fontSizes.f12};

  & p:first-of-type {
    font-size: ${fontSizes.f14};
    margin: 0;
  }
`;

export const PhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${bgColors.whiteSmoke};
  height: 80px;
  width: 80px;
  border-radius: 50%;
`;

export const Card = styled.div<{ isActive?: boolean }>`
  background: ${bgColors.white};
  box-shadow: ${(props) =>
    !props.isActive
      ? "0 4px 4px rgba(0, 0, 0, 0.25)"
      : "0 40px 64px -12px rgba(0, 0, 0, 0.08), 0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1)"};
  width: 130px;
  border-radius: 8px;
  border: ${(props) =>
    !props.isActive ? "2px dashed transparent" : "2px dashed #FFCF00"};
  backdrop-filter: ${(props) => (!props.isActive ? "unset" : "blur(16px)")};
`;

export const CardImage = styled.div`
  background: ${bgColors.white};

  & img {
    width: 100%;
    height: 95px;
    object-fit: cover;
    border-radius: 6px;
  }
`;

export const CardBody = styled.div`
  padding: 10px 8px;

  & h4 {
    font-size: ${fontSizes.f16};
    font-weight: 700;
  }
`;

export const Wrapper = styled.div`
  min-height: 500px;

  .title {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }

  .segmented-content-container {
    margin-top: 20px;
  }

  .flex {
    display: flex;
    align-items: center;
    gap: 8px;
    transition: 0.3s;
  }

  .flex.inactive {
    color: ${textColors.yourShadow};
    transition: 0.3s;
  }
`;

export const Content = styled.div`
  margin-top: 20px;
  height: 400px;

  .running {
    margin-top: 20px;
    .c-label {
      color: ${textColors.blueGray};
      text-align: left;
      font-size: ${fontSizes.f14};
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.14px;
      margin-bottom: 20px;
    }
    .box {
      border-radius: 10px;
      border: 1px solid ${bgColors.purpleCrystal};
      background: ${bgColors.whiteSmoke};
      padding: 10px 14px;
      display: flex;
      gap: 12px;
      .circle {
        width: 40px;
        height: 40px;
        color: ${textColors.white};
        text-align: center;
        font-size: ${fontSizes.f18};
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.18px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${bgColors.pepper};
        box-shadow: 0 1px 8px 0 #ef466f inset;
        border-radius: 50%;
      }
      .cont {
        display: flex;
        gap: 4px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .units {
          color: ${textColors.blueGray};
          text-align: center;
          font-size: ${fontSizes.f14};
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: -0.14px;
        }
        .info {
          color: ${textColors.yourShadow};
          text-align: center;
          font-size: ${fontSizes.f12};
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          letter-spacing: -0.12px;
        }
      }
    }
  }
  .flex {
    margin-top: 20px;
    display: flex;
    gap: 14px;
    .col {
      width: 50%;
    }
    align-items: flex-end;
  }

  .group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .count {
    padding: 4px 8px;
    gap: 10px;
    background: ${bgColors.pop};
    border-radius: 24px;
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 15px;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${textColors.brilliance};
    flex: none;
    order: 0;
    flex-grow: 0;
    margin-left: 8px;
  }
`;
export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: flex-end;
  align-self: flex-end;
  .cancel {
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
    border-radius: ${borders.b10};
    height: 40px;
    font-weight: 700;
    min-width: 88px;
  }
  .save {
    border-radius: ${borders.b10};
    box-shadow: inset 0 4px 6px ${bgColors.friedEgg};
    font-weight: 700;
    height: 40px;
    min-width: 88px;
  }
`;
