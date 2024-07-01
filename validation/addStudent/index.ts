import * as yup from "yup";

export const PreferTimeSchema = {
  day_id: yup.number().required(),
  time_id: yup.number().required(),
};

export const AddPhoneSchema = {
  phone_number: yup.string().required("Phone is a required field"),
  type: yup.string().required("Type is a required field"),
  is_confirmed: yup.boolean().optional(),
  confirmation_id: yup.number().nullable(),
};

export const AddStudentSchema = yup.object().shape({
  root: yup.object().shape({
    first_name: yup
      .string()
      .trim()
      .matches(/[abcdefghijklmnopqrstuvwxyz]+/, "Is not in correct format")
      .required("First name is a required field"),
    last_name: yup.string().required("Last name is a required field"),
    dob: yup.string().required("Date of birth is a required field"),
    gender: yup.string().required("Gender is a required field"),
    language: yup.string().required("Language is a required field"),
    course_id: yup.number().required("Course is a required field"),
    group_type_id: yup.number().required("Group type is a required field"),
    level_id: yup.number().required("Level is a required field"),
    sub_level_id: yup.string().required("Sub level is a required field"),
    branch_id: yup.number().required("Branch is a required field"),
    day: yup.array().required("Day is a required field"),
    time: yup.array().required("Time is a required field"),
    note: yup.string().nullable(),
    phones: yup
      .array()
      .of(yup.object().shape(AddPhoneSchema))
      .required("Must have fields")
      .min(1, "Minimum of 1 field"),
    source_id: yup.number().nullable().optional(),
    is_ban: yup.number().optional(),
    avtar_file_id: yup.number().optional(),
    // prefer_time: yup.array().of(yup.object().shape(PreferTimeSchema)).optional(),
  }),
});
