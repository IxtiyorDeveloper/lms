import moment from "moment/moment";
import Router from "next/router";

export const yearMonthGenerator = () => {
  return {
    month: moment(Router.query?.date).format("MM"),
    year: moment(Router.query?.date).format("YYYY") || moment().year(),
  };
};
