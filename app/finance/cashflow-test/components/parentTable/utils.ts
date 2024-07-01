import { FINANCE_BANK, FINANCE_MOT } from "constants/finance";
import { ICashFlow } from "types";

export function generateParentTable({
  data,
}: {
  data: ICashFlow[] | undefined;
}) {
  if (data)
    return data.map((e, mainIndex) => {
      let bool = !!e.with_department;
      return {
        id: mainIndex,
        percent: {
          number: 0.4,
          color: "blue",
        },
        category_name: e.name,
        mot:
          e.detailedAmount.find((e) => +e.payment_form === FINANCE_MOT)
            ?.amount || 0,
        bank:
          e.detailedAmount.find((e) => +e.payment_form === FINANCE_BANK)
            ?.amount || 0,
        total: +e.total_amount || 0,
        color: "blue",
        children: e.children.map((child, childrenIndex) => {
          bool = !!child.with_department;
          return {
            percent: {
              number: 0.4,
              color: "green",
            },
            category_name: child.name,
            id: childrenIndex,
            mot:
              child.detailedAmount?.find((e) => +e.payment_form === FINANCE_MOT)
                ?.amount || 0,
            bank:
              child.detailedAmount?.find(
                (e) => +e.payment_form === FINANCE_BANK
              )?.amount || 0,
            total: +child.total_amount || 0,
            color: "midori",
            expense_category_id: bool ? null : child.id,
            department_id: bool ? child.id : null,
          };
        }),
      };
    });
  else return [];
}
