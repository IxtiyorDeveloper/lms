import * as yup from "yup";
export const SearchRecommendation = yup.object().shape({
  group_type_id: yup.string().required("Group type is a required field"),
  level_id: yup.string().required("Level is a required field"),
  sub_level_id: yup.string().required("Sub level is a required field"),
  lesson_day_id: yup.array().of(yup.number()).optional(),
  lesson_time_id: yup.array().of(yup.number()).optional(),
});

export const AddToGroupValidation = yup.object().shape({
  date: yup.date().required("Date is a required field"),
});
