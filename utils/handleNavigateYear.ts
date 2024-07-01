import moment from "moment";
import Router, { NextRouter } from "next/router";

export const handleNavigateYear = ({
  e,
  router,
  queryKey,
}: {
  e: string;
  router: NextRouter;
  queryKey: string | string[];
}) => {
  if (!Array.isArray(queryKey)) {
    const date = moment(e, "YYYY");
    const isSame = date.isSame(
      moment(Router.query?.[queryKey], "YYYY"),
      "year"
    );
    if (!isSame) {
      Router.replace(
        {
          pathname: Router.pathname,
          query: {
            ...Router.query,
            [queryKey]: moment(e, "YYYY").format("YYYY"),
          },
        },
        undefined,
        { scroll: false }
      );
    }
  } else {
    const date = moment(e, "YYYY");
    const isSame = date.isSame(
      moment(Router.query?.[queryKey[1]], "YYYY"),
      "year"
    );
    if (!isSame) {
      Router.replace(
        {
          pathname: Router.pathname,
          query: {
            ...Router.query,
            [queryKey[0]]: moment(e, "YYYY").format("YYYY"),
          },
        },
        undefined,
        { scroll: false }
      );
    }
  }
};
