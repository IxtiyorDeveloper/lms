import * as yup from "yup";

export const field = {
  expense_category_id: yup
    .string()
    .nullable()
    .required("Expense category is a required field"),
  description: yup
    .string()
    .nullable()
    .required("Description is a required field"),
  amount: yup.string().nullable().required("Amount is a required field"),
  ordered_by: yup
    .string()
    .nullable()
    .required("Ordered By is a required field"),
  payment_form: yup
    .string()
    .nullable()
    .required("Payment form is a required field"),
  branch_id: yup.string().nullable().required("Branch is a required field"),
};
export const expense = {
  received_by: yup.string().required("Receiver is a required field"),
  expense_category_id: yup
    .string()
    .required("Expense Category is a required field"),
  amount: yup.string().nullable().required("Amount is a required field"),
};

export const CreateBatch: { [x: string]: any } = yup.object().shape({
  root: yup.object().shape({
    expenses: yup.array().of(yup.object().shape(field)),
  }),
});

export const DivideExpenseSchema = yup.object().shape({
  general: yup.object().shape({
    expenses: yup.array().of(yup.object().shape(expense)),
  }),
});
