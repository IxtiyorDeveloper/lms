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
    background: ${bgColors.white};
    border: 1px solid ${bgColors.purpleCrystal};
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    border-radius: ${borders.b6};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 16px 20px 20px 20px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  background: ${bgColors.brilliance};
  border-top: 1px solid ${bgColors.whiteSmoke};

  .w100 {
    width: 100% !important;
  }
`;

export const FormWrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: flex-end;
  gap: 14px;
`;
