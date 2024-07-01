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
  position: relative;

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

  .remove {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 24px;
    right: 0;
    border-radius: 50%;
    background: ${bgColors.pop};
    box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.25),
      inset 0 2px 3px ${bgColors.peach};
    cursor: pointer;
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

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
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
  flex-wrap: wrap;
`;
