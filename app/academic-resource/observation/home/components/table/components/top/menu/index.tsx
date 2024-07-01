import { EObservationStaff, IObservationStatistics } from "types/observation";
import { Wrapper } from "./style";
import { AntdBadge, CoverTeacherSvg } from "components";
import { bgColors } from "styles/theme";
import React from "react";
import { SupportSvg } from "@jasurbekyuldashov/lms-web-icons";

export const Menu = ({
  type,
  data,
}: {
  type: string;
  data: IObservationStatistics | undefined;
}) => {
  const teacher = data?.[EObservationStaff.teacher];
  const support = data?.[EObservationStaff.support];

  const teacherCount =
    +(teacher?.observed_count || 0) + +(teacher?.not_observed_count || 0);

  const supportCount =
    +(support?.observed_count || 0) + +(support?.not_observed_count || 0);

  return [
    {
      label: (
        <Wrapper>
          <CoverTeacherSvg
            color={
              type == EObservationStaff.teacher
                ? bgColors.black
                : bgColors.yourShadow
            }
          />
          Teacher <AntdBadge content={teacherCount} />
        </Wrapper>
      ),
      value: EObservationStaff.teacher,
    },
    {
      label: (
        <Wrapper>
          <SupportSvg
            color={
              type == EObservationStaff.support
                ? bgColors.black
                : bgColors.yourShadow
            }
          />
          Academic Support <AntdBadge content={supportCount} />
        </Wrapper>
      ),
      value: EObservationStaff.support,
    },
  ];
};
