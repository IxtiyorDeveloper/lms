import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const ModalTitle = styled.h4`
  padding: 20px 20px 10px 20px;
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
    background: ${bgColors.white};
    border: 1px solid ${bgColors.purpleCrystal};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    border-radius: ${borders.b6};
  }
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
