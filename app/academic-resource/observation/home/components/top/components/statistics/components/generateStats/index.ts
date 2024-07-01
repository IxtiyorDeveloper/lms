import { EObservationStaff, IObservationStatistics } from "types/observation";
import { bgColors } from "styles/theme";

export const generateStats = ({
  data,
}: {
  data: IObservationStatistics | undefined;
}) => {
  const teacher = data?.[EObservationStaff.teacher];
  const support = data?.[EObservationStaff.support];
  if (data) {
    const teacher_observed_count = teacher?.observed_count || 0;

    const teacher_not_observed_count = teacher?.not_observed_count || 0;

    const support_observed_count = support?.observed_count || 0;

    const support_not_observed_count = support?.not_observed_count || 0;

    const all_teacher_observations =
      teacher_observed_count + teacher_not_observed_count;

    const all_support_observations =
      support_not_observed_count + support_observed_count;

    const teacher_observed_percentage = Number(
      ((teacher_observed_count * 100) / all_teacher_observations).toFixed(0),
    );

    const teacher_not_observed_count_percentage = Number(
      ((teacher_not_observed_count * 100) / all_teacher_observations).toFixed(
        0,
      ),
    );

    const support_observed_percentage = Number(
      ((support_observed_count * 100) / all_support_observations).toFixed(0),
    );

    const support_not_observed_count_percentage = Number(
      ((support_not_observed_count * 100) / all_support_observations).toFixed(
        0,
      ),
    );

    return {
      [EObservationStaff.teacher]: {
        chart: [
          {
            color: bgColors.midori,
            value: teacher?.observed_count,
            text: "Observed",
            percentage: teacher_observed_percentage,
          },
          {
            color: bgColors.pepper,
            value: teacher?.not_observed_count,
            text: "Not Observed",
            percentage: teacher_not_observed_count_percentage,
          },
        ],
      },
      [EObservationStaff.support]: {
        chart: [
          {
            color: bgColors.midori,
            value: support?.observed_count,
            text: "Observed",
            percentage: support_observed_percentage,
          },
          {
            color: bgColors.pepper,
            value: support?.not_observed_count,
            text: "Not Observed",
            percentage: support_not_observed_count_percentage,
          },
        ],
      },
    };
  } else {
    return {
      [EObservationStaff.teacher]: null,
      [EObservationStaff.support]: null,
    };
  }
};
