import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import moment from "moment/moment";
import Router from "next/router";
import { checkCanGetValue, formatDates } from "./formatDates";

export function filterQuery(
  data: any,
  dates?: {
    enterFieldsName: string;
    firstFieldName: string;
    secondFieldName: string;
    isVisible?: boolean;
  }[],
  dateFormatDisabled: boolean | undefined = false,
  deletedFields?: string[],
  exceptions?: string[]
) {
  const page = Router.query.page ? { page: Router.query.page } : {};
  const pageSize = Router.query.pageSize
    ? { pageSize: Router.query.pageSize }
    : {};
  const finishDate =
    data?.start_date &&
    moment(new Date(data?.start_date[1])).format(DATE_FORMAT_YYYY_MM_DD);

  let formattedDates = formatDates({ dates, data });

  let oldData: { [key: string]: any };
  const optimizedData = Object.assign({}, data);
  const query = Router.query;
  if (deletedFields?.length && data && query) {
    for (let i = 0; i < deletedFields?.length; i++) {
      delete query[deletedFields[i]];
      delete optimizedData[deletedFields[i]];
    }
  }

  if (!dateFormatDisabled) {
    oldData = {
      ...page,
      ...pageSize,
      ...query,
      ...optimizedData,
      start_date:
        data?.start_date &&
        moment(new Date(data?.start_date[0])).format(DATE_FORMAT_YYYY_MM_DD),
      end_date: finishDate,
      finish_date: finishDate,
      from_date:
        data?.from_date &&
        moment(new Date(data?.from_date[0])).format(DATE_FORMAT_YYYY_MM_DD),
      to_date:
        data?.from_date &&
        moment(new Date(data?.from_date[1])).format(DATE_FORMAT_YYYY_MM_DD),
      ...formattedDates,
    };
  } else {
    oldData = {
      ...page,
      ...pageSize,
      ...query,
      ...optimizedData,
      ...formattedDates,
    };
  }

  delete oldData["per-page"];
  let newObj: any = {};
  for (const [key, value] of Object.entries(oldData)) {
    if (
      !!value ||
      exceptions?.some(
        (exc: { toString: () => any }) => exc?.toString() === value?.toString()
      )
    ) {
      newObj = {
        ...newObj,
        [key]: value,
      };
    }
  }

  if (dates?.length) {
    for (let i = 0; i < dates?.length; i++) {
      const currentDate = dates?.[i];
      const permitted = checkCanGetValue({ date: currentDate });

      if (!data?.[currentDate?.enterFieldsName] || !permitted) {
        const firstFieldName = `${currentDate?.firstFieldName}`;
        const secondFieldName = `${currentDate?.secondFieldName}`;
        delete newObj[`${firstFieldName}`];
        delete newObj[`${secondFieldName}`];
      }
    }
  }

  return Router.replace(
    {
      pathname: Router.pathname,
      query: newObj,
    },
    undefined,
    { scroll: false }
  );
}
