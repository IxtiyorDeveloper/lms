import { EPayment, SubPaymentTypes } from "constants/payment";
import { Flex } from "./style";
export const generatePaymentType = ({
  selects,
  value,
  record,
}: {
  selects: any;
  value: any;
  record: any;
}) => {
  if (value == EPayment.ONLINE_PAYMENT)
    return (
      <Flex>
        <p className="text">ONLINE</p>
        <img
          src={
            SubPaymentTypes[
              record?.sub_payment_type as keyof typeof SubPaymentTypes
            ]?.img
          }
          alt={
            SubPaymentTypes[
              record?.sub_payment_type as keyof typeof SubPaymentTypes
            ]?.label
          }
          height={30}
        />
      </Flex>
    );
  else
    return selects.incomePaymentTypesWithBalance?.find(
      (type: any) => type.value == value
    )?.label;
};
