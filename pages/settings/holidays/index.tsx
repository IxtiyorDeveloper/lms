import React from "react";
import withAuth from "utils/guard";
// import { Holidays } from "app";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const Holidays = dynamic(() => import("app/settings/holidays"));
const HolidaysPage = () => {
  return <Holidays />;
};

export default withAuth(HolidaysPage, [
  PAGE_VISITS.can_visit_settings_holidays_page,
]);
