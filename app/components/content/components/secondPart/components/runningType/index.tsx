import React from "react";
import { useForm } from "react-hook-form";
import { RunningType as RunningTypeComponent } from "components";
import { PersonSvg } from "@jasurbekyuldashov/lms-web-icons";

const RunningType = () => {
  const { control } = useForm();
  const array = [
    {
      tabId: 1,
      lessons: 12,
      title: "Title",
      color: "green",
      finish_date: "12.06.2023",
      dates: "Aug 2023",
      bottom: true,
      svg: <PersonSvg />,
      count: 12,
      empty_lessons: 12,
      error: "New error",
      prep: 1,
      exam_days: 2,
      wom_days: 1,
    },
  ];
  return (
    <div>
      <RunningTypeComponent control={control} data={array} name="RunningType" />
    </div>
  );
};

export default RunningType;
