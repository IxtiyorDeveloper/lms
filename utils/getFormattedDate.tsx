import moment from "moment/moment";
import Router from "next/router";

export const getFormattedDate = ({format = "YYYY-MM"}: { format?: string } = {}) => {
    return moment().format(format);
};

export const getMonthAndYear = ({dateKey = "date"}: { dateKey?: string } = {}) => {

    const date = moment(
        Router.query?.[dateKey] || getFormattedDate(),
        "YYYY-MM"
    )

    const month = date.format("MM");
    const year = date.format("YYYY");

    return {
        month,
        year
    }
}