import * as yup from "yup";

export const Teacher = {
  user_id: yup.string().required("Teacher is a required field"),
  description: yup.string().required("Description is a required field"),
  amount: yup.string().nullable().required("Amount is a required field"),
};
export const CreateCoverTeacher = yup.object().shape({
  general: yup.object().shape({
    user_id: yup.string().required("Teacher is a required field"),
    description: yup.string().required("Description is a required field"),
    amount: yup.string().nullable().required("Amount is a required field"),
    teachers: yup
      .array()
      .of(yup.object().shape(Teacher))
      .required("Must have fields")
      .min(1, "Minimum of 1 field"),
  }),
});

export const TestTeacher = {
  user_id: yup.string().required("Teacher is a required field"),
  description: yup.array().nullable(),
  main_description: yup.array().nullable(),
  group_id: yup.array().required("Groups is a required field"),
  amount: yup.string().nullable(),
};
export const TestCreateCoverTeacher = yup.object().shape({
  user_id: yup.string().required("Teacher is a required field"),
  date: yup.string().required("Date is a required field"),
  description: yup.string().nullable(),
  amount: yup.string().nullable(),
  group_id: yup.array().required("Groups is a required field"),
  teachers: yup
    .array()
    .of(yup.object().shape(TestTeacher))
    .required("Must have fields")
    .min(1, "Minimum of 1 field"),
});

export const AddBonusInSalary = yup.object().shape({
  department: yup.string().required("Department is a required field"),
  role: yup.string().required("Role is a required field"),
  staff: yup.string().required("Staff is a required field"),
  amount: yup.string().required("Amount is a required field"),
  description: yup.string().required("Description is a required field"),
});
export const GiveAllSalary = yup.object().shape({
  password: yup.string().required("Password is a required field"),
});
