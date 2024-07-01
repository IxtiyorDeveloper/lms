import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ModalTitle = styled.h4`
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;

export const Wrapper = styled.div`
  width: 100%;
  padding-top: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 12px 0 0 0;
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

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const PaymentTitle = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 500;
`;

export const GroupWrapper = styled.div`
  text-align: center;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  gap: 14px;
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
    color: ${textColors.blueGray};
    font-size: ${fontSizes.f14};
    font-weight: 500;
  }
`;

export const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const DebtWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: #fcd9d399;
  padding: 12px;
  border-radius: 6px;
  border: 0.5px solid #fcada9;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
`;

export const PayingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: #ddfadc;
  padding: 12px;
  border: 0.5px solid #70d088;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
`;

export const PaymentIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 5px;
  padding: 30px 0;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
`;

export const TextD = styled.p`
  color: ${textColors.sceptreBlue};
  font-size: ${fontSizes.f14};
  font-weight: 500;
  letter-spacing: -0.01em;
`;

export const NumberD = styled.p`
  color: ${textColors.pop};
  font-size: ${fontSizes.f14};
  font-weight: 700;
  font-family: "Space Grotesk", sans-serif;
  text-align: right;
  letter-spacing: -0.01em;
`;

export const NumberP = styled.p`
  color: ${textColors.sceptreBlue};
  font-size: ${fontSizes.f14};
  font-weight: 700;
  font-family: "Space Grotesk", sans-serif;
  text-align: right;
  letter-spacing: -0.01em;
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 9px;
  margin-bottom: 9px;
  font-weight: 500;
  font-size: ${fontSizes.f14};
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 14px;
  padding-bottom: 40px;
  margin-top: 60px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
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

export const AmountWrapper = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  color: ${textColors.sceptreBlue};
`;

export const Balance = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
