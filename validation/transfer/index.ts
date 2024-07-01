import * as yup from "yup";

export const StudentTransfer = yup.object().shape({
  date_to: yup.string().required(),
  leaving_category_id: yup.string().required(),
  transfer_date_from: yup.string().required(),
  reason: yup.string().required(),
});
