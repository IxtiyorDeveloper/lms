import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ModalTitle = styled.h4`
  padding: 20px;
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;
export const MonthWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Wrapper = styled.div<{ paddingX?: number }>`
  width: 100%;
  padding-top: 20px;
  padding: ${(props) => props.paddingX}px;

  .suffix {
    font-weight: 600;
    color: ${textColors.yourShadow};
  }

  .remove {
  }

  .row {
    position: relative;
    margin-bottom: 20px;

    .remove {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -10px;
      right: -10px;
      border-radius: 50%;
      background: ${bgColors.pop};
      box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.25),
        inset 0 2px 3px ${bgColors.peach};
      cursor: pointer;
      z-index: 10;
    }
  }
  .add {
    margin-top: 20px;
  }
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

export const FormWrapper = styled.div<{ flexStart?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: unset !important;
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
export const Field = styled.div<{ isNext: boolean }>`
  .next {
    border-top: 2px solid ${bgColors.purpleCrystal};
    border-radius: 20px;
    padding: 0 20px;
  }

  ${({ isNext }) =>
    isNext
      ? css`
          padding: 20px 0;
        `
      : css`
          padding: 20px;
          border-bottom: 2px solid ${bgColors.purpleCrystal};
          border-radius: 20px;
        `}
  .row {
    padding: 0 20px;
    .line {
      border-top: 4px dashed ${bgColors.primary};
      margin-bottom: 20px;
    }
  }
`;
