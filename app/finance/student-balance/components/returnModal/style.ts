import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { css } from "@emotion/react";

export const ModalTitle = styled.h4`
  padding: 20px;
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;

export const Wrapper = styled.div<{
  padding?: number | string;
  isChecked?: boolean;
}>`
  width: 100%;
  padding: ${(props) =>
    typeof props.padding == "number" ? `${props.padding}px` : props.padding};
  display: flex;
  gap: 10px;

  .card {
    display: flex;
    padding: 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex: 1 0 0;
    border-radius: 8px;
    background: ${bgColors.whiteSmoke};

    .title {
      color: ${textColors.spring};
      font-size: 12px;
      font-weight: 500;
      letter-spacing: -0.12px;
      line-height: 1;
      display: flex;
      align-items: center;
      gap: 4px;

      .cirlce {
        width: 12px;
        height: 12px;
        background: red;
      }
    }

    .price {
      color: ${textColors.blueGray};
      font-family: "Space Grotesk", sans-serif;
      font-size: 12px;
      line-height: 1.2;
      font-weight: 500;
      letter-spacing: 0.12px;
    }

    .t-white {
      color: ${textColors.white};
    }

    .t-right {
      width: 100%;
      display: flex;
      gap: 4px;
      align-items: center;
      justify-content: flex-end;
      margin: -12px 0;
    }
  }

  .green {
    background: ${bgColors.midori};
  }

  .suffix {
    font-weight: 600;
    color: ${textColors.yourShadow};
  }

  .flex {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  .w-100 {
    width: 100%;
  }

  .PhoneInputInput {
    color: ${textColors.sadet} !important;
  }

  .danger {
    border-radius: 10px;
    border: 1px solid ${bgColors.peach};
    background: ${bgColors.pale};
    display: flex;
    padding: 10px 16px;
    align-items: center;
    gap: 12px;

    .info {
      color: ${textColors.orchid};
      font-size: ${fontSizes.f12};
      font-weight: 500;
      line-height: 1.66; /* 166.667% */
    }
  }

  .ReactInputVerificationCode-container {
    width: 100% !important;
    gap: 10px;
    margin-right: 20px;

    .ReactInputVerificationCode-item {
      width: 48px !important;
      height: 48px;
      border-radius: 8px;
      color: ${textColors.blueGray};
      font-family: Space Grotesk sans-serif;
      font-size: 18px;
      font-weight: 500;
      ${(props) =>
        props?.isChecked &&
        css`
          border: 2px solid ${bgColors.midori};
          background: ${bgColors.transparentGreen};
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25) inset;
        `}
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  background: ${bgColors.brilliance};
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

export const FormWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 14px;
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
  padding: 16px;
  gap: 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  color: ${textColors.yourShadow};
  border-radius: 12px;
  background: ${bgColors.whiteSmoke};
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.08) inset;
  margin: 0 20px;
`;

export const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  font-size: ${fontSizes.f12};
  flex: 1;
  align-items: flex-start;

  .name {
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f12};
    font-weight: 600;
    line-height: 1.5; /* 150% */
    letter-spacing: -0.12px;
  }

  .container {
    display: flex;
    justify-content: space-between;
    flex: 1;
    width: 100%;
    align-items: center;

    .flex {
      display: flex;
      gap: 10px;
    }

    .balance {
      height: 23px;
      left: 386px;
      top: 75px;
      background: ${bgColors.midori};
      border-radius: 4px;
      padding: 4px 6px;
      gap: 10px;
      font-weight: 700;
      font-size: ${fontSizes.f14};
      line-height: 15px;
      letter-spacing: -0.01em;
      color: ${textColors.brilliance};
      flex: none;
      order: 0;
      flex-grow: 0;
      margin-top: -4px;
      white-space: nowrap;
    }
  }

  & p:first-of-type {
    font-size: ${fontSizes.f14};
    margin: 0;
    font-weight: 600;
    line-height: 17px;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
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
  cursor: pointer;
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

export const WalletWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  background: ${bgColors.whiteSmoke};
  padding: 11px 10px;
  border-radius: 6px;
  border: 0.5px solid ${bgColors.purpleCrystal};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  min-width: 215px;
`;
export const Balance = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
