import moment from "moment/moment";

export const getMonth = ({
  format,
  date,
}: {
  format: string;
  date: string;
}) => {
  return {
       month: moment(date, format).format("MM"),
    year: moment(date, format).format("YYYY"),
  };
};
