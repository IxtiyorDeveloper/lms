import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";
import { Table } from "antd";

export const NoteWrapper = styled.div`
  padding: 0 0 24px 0;
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
  font-weight: 700;
  font-size: ${fontSizes.f14};
  letter-spacing: -0.01rem;
  color: ${textColors.blueGray};
`;

export const Wrapper = styled.div`
  width: 100%;
  padding-top: 20px;

  .suffix {
    font-weight: 600;
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
  padding: 10px 0;
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
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    margin-top: 8px;
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
  padding: 11px;
  border: 0.5px solid #70d088;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  margin: 0 10px;
`;

export const PaymentIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 5px;
  padding: 20px 0;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
`;

export const TextD = styled.p`
  color: ${textColors.sceptreBlue};
  font-size: ${fontSizes.f14};
  font-weight: 500;
  text-align: center;
  letter-spacing: -0.01em;
`;

export const NumberD = styled.p`
  color: ${textColors.pop};
  font-size: ${fontSizes.f14};
  font-weight: 700;
  font-family: "Space Grotesk", sans-serif;
  text-align: center;
  letter-spacing: -0.01em;
`;

export const NumberP = styled.p`
  color: ${textColors.sceptreBlue};
  font-size: ${fontSizes.f14};
  font-weight: 700;
  font-family: "Space Grotesk", sans-serif;
  text-align: center;
  letter-spacing: -0.01em;
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

export const Balance = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FormWrapper = styled.div<{ last?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 14px;
  ${({ last }) =>
    last &&
    css`
      padding-bottom: 20px;
      border-bottom: 1px solid ${bgColors.whiteSmoke};
    `}
`;

export const BalanceBlur = styled.div`
  position: relative;
  .eye {
    visibility: hidden;
    display: none;
    transition: 0.3s;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  &:hover {
    .eye {
      visibility: visible;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
    }
  }
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
  user-select: none;
`;

export const AmountWrapper = styled.p`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  color: ${textColors.sceptreBlue};
`;
export const BlurAmountWrapper = styled.p<{ blur?: boolean }>`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  color: ${textColors.sceptreBlue};
  overflow: hidden;
  ${(props) =>
    props.blur &&
    css`
      filter: blur(8px);
    `}
`;

export const CheckWrapperComp = styled.div`
  & .check * {
    font-family: "Times New Roman", serif !important;
  }
`;
export const MyTable = styled.div`
  padding: 0 10px 5px 10px;
  border: 0.5px solid ${bgColors.purpleCrystal};
  border-radius: ${borders.b6};
  background: ${bgColors.brilliance};
  .table {
    background: ${bgColors.brilliance}!important;

    th {
      padding: 10px 0 10px 0 !important;
      border: none !important;
      background: ${bgColors.brilliance}!important;
      font-weight: 500;
      font-size: ${fontSizes.f12};
      line-height: 1.2;
      letter-spacing: -0.01em;
      color: ${textColors.blueGray};
      &:before {
        display: none;
      }
    }
  }
  .row {
    td {
      background: ${bgColors.brilliance}!important;
      padding: 10px 0 !important;
    }
  }
  .insideTable {
    display: flex;
    justify-content: space-between;
    background: #fcd9d399;
    padding: 11px;
    border-radius: 6px;
    border: 0.5px solid #fcada9;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
  }
`;
export const StyledTable = styled(Table)``;
export const Title = styled.div`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.blueGray};
`;

export const Period = styled.div`
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.yourShadow};
  font-weight: 600;
`;

export const Amount = styled.div`
  font-family: "Space Grotesk" !important;
  font-style: normal;
  font-weight: 700;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${textColors.pop};
`;
