import { ISchedule } from "types";

export const generateTableData = ({
  collection,
  data,
}: {
  collection: {
    groups: ISchedule["data"] | undefined;
    rooms: ISchedule["rooms"] | undefined;
    teachers: ISchedule["teachers"] | undefined;
  };
  data: ISchedule | undefined;
}) => {
  return {
    "0": collection?.rooms && data?.times.length ? collection?.rooms : [],
    "1":
      collection?.rooms && data?.times.length
        ? [{}, ...(collection?.rooms || [])]
        : [],
    "2":
      collection?.teachers && data?.times.length
        ? [{}, ...(collection?.teachers || [])]
        : [],
    "3":
      data?.levels && data?.times.length ? [{}, ...(data?.levels || [])] : [],
  };
};