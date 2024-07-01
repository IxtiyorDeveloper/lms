import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const InfoDeviceIntegration = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  padding: 10px 16px;
  border: 1px solid ${bgColors.pearl};
  background-color: ${bgColors.transparentGreen};
  color: ${textColors.lucky};
  border-radius: 10px;
  margin: 10px 20px;
`;

export const InfoDeviceIntegrationFailed = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  padding: 10px 16px;
  border: 1px solid ${bgColors.peach};
  background-color: ${bgColors.pale};
  color: ${textColors.plum};
  border-radius: 10px;
  margin: 10px 20px;

  .bg {
    background-color: ${bgColors.pop};
    min-width: 34px;
    height: 34px;
  }
`;

export const IconCheckWrapper = styled.div`
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${bgColors.midori};
`;

export const NoteWrapper = styled.div`
  padding: 20px 20px 0 20px;

  .label {
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.12px;
  }

  .note {
    display: inline-flex;
    padding: 10px;
    align-items: center;
    border-radius: 6px;
    border: 1px solid ${bgColors.purpleCrystal};
    background: ${bgColors.cascading};
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f12};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.12px;
    margin-top: 10px;
    width: 100%;
  }
`;
export const ModalTitle = styled.h4`
  padding: 20px;
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;

export const Wrapper = styled.div<{ paddingX?: number }>`
  width: 100%;
  padding: ${(props) => props.paddingX}px;

  .suffix {
    font-weight: 600;
    color: ${textColors.yourShadow};
  }

  .currency {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 18px;
    background: #ffffff;
    border: 1px solid ${bgColors.purpleCrystal};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    border-radius: ${borders.b6};
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  background: ${bgColors.brilliance};
  border-top: 1px solid ${bgColors.whiteSmoke};

  .btn {
    display: flex;
    gap: 10px;
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
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 14px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px 20px 24px;
  gap: 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  color: ${textColors.yourShadow};
  position: relative;

  .payment-request {
    position: absolute;
    right: 30px;
  }
`;

export const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: ${fontSizes.f12};

  & p:first-of-type {
    font-size: ${fontSizes.f12};
    margin: 0;
  }

  .group {
    font-weight: 600;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    color: ${textColors.yourShadow};
    padding: 4px 8px;
    background-color: ${bgColors.whiteSmoke};
    border-radius: ${borders.b10};
    width: fit-content;
    display: flex;
    align-items: center;
  }

  .group_link {
    font-weight: 600;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    color: ${textColors.yourShadow};
    padding: 4px 8px;
    background-color: ${bgColors.whiteSmoke};
    border-radius: ${borders.b10};
    width: fit-content;
    display: flex;
    align-items: center;

    &:hover {
      text-decoration: underline;
    }
  }

  .flex {
    display: flex;
    gap: 10px;
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
