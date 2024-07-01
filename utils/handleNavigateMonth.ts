import moment from "moment";
import Router, { NextRouter } from "next/router";

export const handleNavigateMonth = ({
  e,
  router,
  queryKey,
}: {
  e: string;
  router: NextRouter;
  queryKey: string | string[];
}) => {
  if (!Array.isArray(queryKey)) {
    const date = moment(e, "MMMM YYYY");
    const isSame =
      date.isSame(moment(Router.query?.[queryKey], "YYYY-MM"), "month") &&
      date.isSame(moment(Router.query?.[queryKey], "YYYY-MM"), "year");
    if (!isSame) {
      Router.replace(
        {
          pathname: Router.pathname,
          query: {
            ...Router.query,
            [queryKey]: moment(e, "MMMM YYYY").format("YYYY-MM"),
          },
        },
        undefined,
        { scroll: false }
      );
    }
  } else {
    const date = moment(e, "MMMM YYYY");
    const isSame =
      date.isSame(moment(Router.query?.[queryKey[0]], "YYYY-MM"), "month") &&
      date.isSame(moment(Router.query?.[queryKey[1]], "YYYY-MM"), "year");
    if (!isSame) {
      Router.replace(
        {
          pathname: Router.pathname,
          query: {
            ...Router.query,
            [queryKey[0]]: moment(e, "MMMM YYYY").format("YYYY"),
            [queryKey[1]]: moment(e, "MMMM YYYY").format("MM"),
          },
        },
        undefined,
        { scroll: false }
      );
    }
  }
};
