import { EObservationStaff, IMainObservation } from "types/observation";
import { ranking_classes } from "constants/ranking";
import React from "react";

export const generateClass = ({ record }: { record: IMainObservation }) => {
  if (record?.type?.toString() == EObservationStaff.teacher) {
    if (record?.ranking_less_reason == null) {
      return (
        <div className="abs-bottom">
          {ranking_classes[record?.class as keyof typeof ranking_classes]}
        </div>
      );
    } else {
      return undefined;
    }
  } else return undefined;
};
