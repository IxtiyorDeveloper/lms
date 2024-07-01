import React from "react";
import { Filters } from "components";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import {
  ONLINE_PAYMENT,
  paymentOptions,
  STUDENT_BALANCE,
} from "constants/payment";

const FilterComponent = () => {
  const methods = useForm();
  const selects = usePageDataMemo();
  const payment_type = methods.watch("payment_type");
  const isSelectedOnlinePayment =
    (payment_type as any[])?.includes(ONLINE_PAYMENT.toString()) ||
    payment_type == ONLINE_PAYMENT;
  const isSelectedSB =
    (payment_type as any[])?.includes(STUDENT_BALANCE.toString()) ||
    payment_type == STUDENT_BALANCE;

  return (
    <Filters
      activeElements={[
        {
          name: "full_name",
          elementType: "search",
          label: "Search",
        },
        {
          name: "start_date",
          elementType: "rangePicker",
          label: "Start date period",
        },
        {
          name: "branch_id",
          elementType: "select",
          label: "Branch",
          options: "ownAllBranches",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "created_by",
          elementType: "select",
          options: "transactionUsers",
          label: "Created By",
          args: {
            maxTagCount: 1,
            mode: "multiple",
          },
        },
        {
          name: "phone_number",
          elementType: "phone",
          label: "Phone",
        },
        {
          name: "group_name",
          elementType: "input",
          label: "Group",
        },
        {
          name: "payment_type",
          elementType: "select",
          customOptions: selects.incomePaymentTypesWithBalance.map((e) => {
            return {
              ...e,
              disabled:
                payment_type?.length > 0
                  ? parseInt(e.value) !== STUDENT_BALANCE
                    ? isSelectedSB
                    : !isSelectedSB
                  : false,
            };
          }),
          label: "Payment Type",
          args: { mode: "multiple" },
        },
        {
          name: "sub_payment_type",
          elementType: "select",
          customOptions: paymentOptions,
          label: "SubPayment Type",
          isVisible: isSelectedOnlinePayment,
        },
        {
          name: "amount",
          elementType: "number",
          label: "Amount",
        },
      ]}
      resetQueryExceptions={[
        "page",
        "pageSize",
        "incomeSecondaryTabIndex",
        "type",
        "roundedTabIndex",
      ]}
      useExcludeArguments={{
        array: [
          "page",
          "pageSize",
          "incomeSecondaryTabIndex",
          "type",
          "roundedTabIndex",
        ],
      }}
      dates={[
        {
          enterFieldsName: "start_date",
          firstFieldName: "from_date",
          secondFieldName: "to_date",
        },
      ]}
      deletedFields={["start_date"]}
      methods={methods}
      selects={selects}
      dateFormatDisabled
    />
  );
};

export default FilterComponent;
