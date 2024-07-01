import { IncomeGroupedPaymentTypes, PaymentForms } from "types";
import { IStatistics } from "types/finance/statistics";

export const generateStats = ({
  data,
  selects,
}: {
  data: IStatistics | undefined;
  selects: any;
}) => {
  return {
    motIncome:
      data?.income?.find(
        (i) =>
          i.payment_type.toString() ==
          selects.incomeGroupedPaymentTypesMOT?.find(
            (op: { value: { toString: () => string } }) =>
              op.value.toString() == IncomeGroupedPaymentTypes.MOT.toString()
          )?.value
      )?.amount ?? 0,
    motExpense:
      data?.expense?.find(
        (i) =>
          i.payment_form.toString() ==
          selects.paymentForms?.find(
            (op: { value: PaymentForms }) => op.value == PaymentForms.MOT
          )?.value
      )?.amount ?? 0,
    bankCash:
      data?.income?.find(
        (i) =>
          i.payment_type.toString() ==
          selects.incomeGroupedPaymentTypesBANK?.find(
            (op: { value: IncomeGroupedPaymentTypes }) =>
              op.value == IncomeGroupedPaymentTypes.CASH
          )?.value
      )?.amount ?? 0,
    bankCard:
      data?.income?.find(
        (i) =>
          i.payment_type.toString() ==
          selects.incomeGroupedPaymentTypesBANK?.find(
            (op: { value: IncomeGroupedPaymentTypes }) =>
              op.value == IncomeGroupedPaymentTypes.CARD
          )?.value
      )?.amount ?? 0,
    bankOnlinePayment:
      data?.income?.find(
        (i) =>
          i.payment_type.toString() ==
          selects.incomeGroupedPaymentTypesBANK?.find(
            (op: { value: IncomeGroupedPaymentTypes }) =>
              op.value == IncomeGroupedPaymentTypes.ONLINE_PAYMENT
          )?.value
      )?.amount ?? 0,
    bankExpense:
      data?.expense?.find(
        (i) =>
          i.payment_form.toString() ==
          selects.payment?.find(
            (op: { value: PaymentForms }) => op.value == PaymentForms.BANK
          )?.value
      )?.amount ?? 0,
  };
};
