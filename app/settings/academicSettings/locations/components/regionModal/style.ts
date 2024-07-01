import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

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
  display: flex;
  flex: 1;
  width: 340px;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  padding-top: 50px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  background: ${bgColors.brilliance};
  gap: 10px;
`;
export const FormWrapper = styled.div`
  padding: 10px 20px;
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
  padding: 20px 20px 20px 24px;
  gap: 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  color: ${textColors.yourShadow};
`;
