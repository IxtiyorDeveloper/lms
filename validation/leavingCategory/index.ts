import * as yup from "yup";

export const LeavingCategory = yup.object().shape({
  general: yup.object().shape({
    name: yup.string().required("Name is a required field"),
    type: yup.string().required("Type is a required field"),
    effect_type: yup.string().optional(),
  }),
});
