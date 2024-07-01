import * as yup from "yup";

export const CreateIncome = yup.object().shape({
  amount: yup.string().required("Amount is a required field"),
  payment_type: yup.string().required("Payment type is a required field"),
  product_and_service_id: yup.string().required("Product is a required field"),
});
