import React from "react";
import { IStatistics } from "types/finance/statistics";
import { EPayment, SubPaymentTypes } from "constants/payment";
import { Wrapper, Flex } from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const OnlineDetails = ({ data }: { data: IStatistics | undefined }) => {
  return (
    <Wrapper>
      {data?.income
        ?.find((i) => i.payment_type == EPayment.ONLINE_PAYMENT)
        ?.subs?.sort((a, b) => +(b.amount || 0) - +(a.amount || 0))
        ?.map((item, index) => {
          return (
            <Flex key={index}>
              <p>
                {
                  SubPaymentTypes[
                    item?.sub_payment_type as keyof typeof SubPaymentTypes
                  ]?.label
                }
              </p>
              <p>{toCurrencyFormat(+item?.amount)}</p>
            </Flex>
          );
        })}
    </Wrapper>
  );
};

export default OnlineDetails;
