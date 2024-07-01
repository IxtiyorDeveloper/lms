import { IObjTimeTable } from "types";

export const generateName = (obj: IObjTimeTable) => {
  if (obj.officeHour.activeOfficeHourCandidates?.length === 1) {
    return {
      name: `${obj.officeHour.activeOfficeHourCandidates?.[0]?.groupContact?.user?.userProfile?.firstname}`,
      number: 0,
    };
  }
  if (obj.officeHour.activeOfficeHourCandidates?.length === 2) {
    return {
      name: `${obj.officeHour.activeOfficeHourCandidates?.[0]?.groupContact?.user?.userProfile?.firstname}, ${obj.officeHour.activeOfficeHourCandidates?.[1]?.groupContact?.user?.userProfile?.firstname}`,
      number: 0,
    };
  }
  if (obj.officeHour.activeOfficeHourCandidates?.length > 2) {
    return {
      name: `${obj.officeHour.activeOfficeHourCandidates?.[0]?.groupContact?.user?.userProfile?.firstname}, ${obj.officeHour.activeOfficeHourCandidates?.[1]?.groupContact?.user?.userProfile?.firstname}`,
      number: obj.officeHour.activeOfficeHourCandidates?.length - 2,
    };
  }
};
