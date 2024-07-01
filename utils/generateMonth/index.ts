import Router from "next/router";
import moment from "moment";

export const generateMonth = () => {
  const date = Router.query?.date;
  if (date) {
    return moment(date).add(-1).format("MMMM");
  } else return moment().add(-1).format("MMMM");
};
