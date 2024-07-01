import * as yup from "yup";
export const CreateGroupSchema = yup.object().shape({
  general: yup.object().shape({
    name: yup.string().required("Name is a required field"),
    start_date: yup.string().optional(),
    course_id: yup.string().required("Course is a required field"),
    group_type_id: yup.string().required("Group Type is a required field"),
    branch_id: yup.string().required("Index is a required field"),
    room_id: yup.string().required("Room Type is a required field"),
    parent_level_id: yup.string().required("Level is a required field"),
    level_id: yup.string().required("SubLevel is a required field"),
    lesson_day_id: yup.string().required("Day is a required field"),
    lesson_time_id: yup.string().required("Time a required field"),
    mentor_id: yup.string().nullable(),
    support_id: yup.string().nullable(),
  }),
});

export const RunningTypeModalSchema = yup.object().shape({
  type: yup.string().required("Type is a required field"),
});
