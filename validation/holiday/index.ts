import * as yup from "yup";

export const CreateHoliday = yup.object().shape({
  general: yup.object().shape({
    name: yup.string().required("Name is a required field"),
    type: yup.string().required("Group form is a required field"),
    date: yup.array().nullable().required("Date is a required field"),
    notify_type: yup.boolean(),
    notify_text: yup.string().when("notify_type", {
      is: true,
      then: yup.string().required("Notify text is a required field"),
    }),
    dates: yup.array().of(
      yup.object().shape({
        from_time: yup
          .string()
          .nullable()
          .test(
            "conditional-from-time",
            "From time is a required field if a switch is true",
            function (value) {
              const notifyType = this.parent.notify_type;

              if (notifyType) {
                return value !== null && value !== undefined;
              }

              return true;
            }
          ),
        to_time: yup
          .string()
          .nullable()
          .test(
            "conditional-from-time",
            "To time is a required field if a switch is true",
            function (value) {
              const notifyType = this.parent.notify_type;

              if (notifyType) {
                return value !== null && value !== undefined;
              }

              return true;
            }
          ),
      })
    ),
  }),
});
