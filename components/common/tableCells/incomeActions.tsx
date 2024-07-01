import React from "react";
import { DeleteCircle, LifeCycleLabel } from "components";
import { TParams } from "types";
import { IconWrapper } from "./style";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";
import Print from "../../elements/actions/printer";
import { PAYMENT_CARD, PAYMENT_CASH } from "../../../constants/payment";

const IncomeActions = ({
  activeActions,
  data,
  modalName,
  size = "small",
}: {
  activeActions: TParams;
  queryKeys?: string[];
  data?: any;
  modalName?: string;
  size?: "small" | "medium";
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const id = data?.id;

  const taxReceiptAvailability = !data?.gotTaxReceipt;
  const cardOrCash =
    data?.payment_type === PAYMENT_CARD || data?.payment_type === PAYMENT_CASH;

  const elements: TParams = {
    delete: (
      <DeleteCircle
        key={`${id}_delete`}
        size="small"
        onClick={() =>
          dispatch(
            toggleModal({
              key: "deleteTransaction",
              data: {
                data: {
                  transactionId: id,
                },
                open: true,
              },
            })
          )
        }
      />
    ),
    print: (
      <Print
        borderColor={cardOrCash ? taxReceiptAvailability : false}
        key={`${id}_print`}
        size="small"
        onClick={() =>
          router.replace(
            {
              pathname: Router.pathname,
              query: {
                ...router.query,
                income_id: data?.id,
                [modalName || "paymentIncomeCheck"]: "true",
              },
            },
            undefined,
            { scroll: false }
          )
        }
      />
    ),
    lifecycle: (
      <LifeCycleLabel
        key={`lifecycle_${id}_key`}
        size={size}
        onClick={() => {
          dispatch(
            toggleModal({
              key: "transactionLifeCycle",
              data: {
                data,
                open: true,
              },
            })
          );
        }}
      />
    ),
  };
  return (
    <IconWrapper>
      {Object.entries(activeActions ?? {})
        ?.map(([key, value]) => ({ key, value }))
        ?.map((item) => {
          if (item.value) {
            return elements[item.key];
          }
        })}
    </IconWrapper>
  );
};

export default IncomeActions;
