import { EObservationStaff, IObservationOfficeHour } from "types/observation";
import { IGroup } from "types";
import { makeGroupOptions } from "./utils/makeGroupOptions";
import { makeOfficeHourOptions } from "./utils/makeOfficeHourOptions";

export const makeOptions = ({
  type,
  groups,
  officeHours,
}: {
  type: EObservationStaff;
  groups: IGroup[] | undefined;
  officeHours: IObservationOfficeHour[] | undefined;
}) => {
  if (type == EObservationStaff.teacher) {
    return makeGroupOptions({ groups });
  }
  if (type == EObservationStaff.support) {
    return makeOfficeHourOptions({ officeHours });
  }
};
