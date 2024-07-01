import { IProductAndService } from "types";

export const calculateProductAmount = ({
  data,
}: {
  data?: IProductAndService;
}) => {
  let total = 0;

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      data[key]?.forEach((item) => {
        if (item.hasOwnProperty("amount")) {
          total += parseFloat(item.amount);
        }
      });
    }
  }

  return total;
};
