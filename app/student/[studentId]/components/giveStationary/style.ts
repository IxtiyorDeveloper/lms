import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.form``;

export const Divider = styled.div`
  height: 1px;
  background: ${bgColors.whiteSmoke};
  width: 100%;
`;
export const ModalTitle = styled.h4`
  padding: 20px;
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.sceptreBlue};
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tax {
    color: ${textColors.midori};
    font-size: ${fontSizes.f12};
    font-weight: 600;
    line-height: 1.66; /* 166.667% */

    div {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }

  .disconnected {
    color: ${textColors.rose};
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

export const AmountWrapper = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  color: ${textColors.sceptreBlue};
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
