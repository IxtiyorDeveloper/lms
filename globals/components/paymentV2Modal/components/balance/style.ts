import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  padding: 10px 10px 12px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${bgColors.purpleCrystal};
  background: ${bgColors.brilliance};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
  margin: 20px;

  .info {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    gap: 4px;
  }

  .completed {
    height: 35px !important;
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${textColors.midori};
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.28px;
  }
`;

export const PaymentInfo = styled.div<{
  textColor?: string;
  borderColor?: string;
  backgroud?: string;
}>`
  display: flex;
  padding: 10px 12px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 6px;
  border: 0.5px solid ${(props) => props.borderColor ?? bgColors.serengeti};
  background: ${(props) => props.backgroud ?? bgColors.transparentGreen};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);
  color: ${textColors.sceptreBlue};
  font-size: ${fontSizes.f14};
  font-weight: 500;
  letter-spacing: -0.14px;

  .amount {
    color: ${(props) => props.textColor ?? textColors.sceptreBlue};
    font-family: "Space Grotesk", sans-serif;
    font-size: ${fontSizes.f14};
    font-weight: 700;
    letter-spacing: 0.28px;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  gap: 14px;

  .item {
    min-height: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  .input-container {
    min-width: 31.5%;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .flex {
    display: flex;
    gap: 16px;
    width: 100%;
    align-items: flex-start;
    flex-direction: column;

    .w-100 {
      align-self: flex-end;
      width: 210px !important;
    }
  }
`;

export const StyledInputLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${textColors.sceptreBlue};
  font-size: ${fontSizes.f14};
  font-weight: 500;
  letter-spacing: -0.14px;

  .w-100 {
    width: 100%;
    display: flex;
    gap: 6px;
    align-items: center;
  }

  .ant-input-number-input {
    border-radius: 0 !important;
    border-top-left-radius: 6px !important;
    border-bottom-left-radius: 6px !important;
    background: ${bgColors.white} !important;
  }

  .switch-wrapper {
    margin-left: auto;
    margin-right: 20px;
  }
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .item {
    width: 31.5%;
  }

  .flex {
    display: flex;
    gap: 16px;
    align-items: flex-end;
    width: 100%;
  }
  .w-100 {
    align-self: flex-end;
    min-width: 210px !important;
  }
`;
