import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DD } from "../../constants/dates";

export function formatDates({
  dates,
  data,
}: {
  dates?: {
    enterFieldsName: string;
    firstFieldName: string;
    secondFieldName: string;
    isVisible?: boolean;
  }[];
  data: any;
}) {
  let formattedDates = {};
  if (dates) {
    dates.map((date) => {
      const permitted = checkCanGetValue({ date });
      if (
        data?.[date.enterFieldsName] &&
        data?.[date.enterFieldsName] &&
        permitted
      ) {
        Object.assign(formattedDates, {
          [date.firstFieldName]: moment(
            new Date(data?.[date.enterFieldsName]?.[0])
          ).format(DATE_FORMAT_YYYY_MM_DD),
          [date.secondFieldName]: moment(
            new Date(data?.[date.enterFieldsName]?.[1])
          ).format(DATE_FORMAT_YYYY_MM_DD),
        });
      }
    });
  }

  return formattedDates;
}

export function checkCanGetValue({
  date,
}: {
  date: {
    enterFieldsName: string;
    firstFieldName: string;
    secondFieldName: string;
    isVisible?: boolean;
  };
}) {
  if (date.hasOwnProperty("isVisible")) {
    return date.isVisible;
  } else return true;
}
