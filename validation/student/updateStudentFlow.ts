import * as yup from "yup";

export const UpdateStudentFlowSchema = yup.object().shape({
  general: yup.object().shape({
    leaving_category_id: yup.string().required("Category is a required field"),
    reason: yup.string().optional(),
    // reason: yup.string().required("Reason can not be blank"),
  }),
});
