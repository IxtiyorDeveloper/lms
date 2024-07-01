import React from "react";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";
// import {StaffMotivation} from "app";

const StaffMotivation = dynamic(
  () => import("app/statistics/dashboard/staffMotivation")
);

const StaffMotivationPage = () => {
  return (
    <div>
      <StaffMotivation />
    </div>
  );
};

export default withAuth(StaffMotivationPage, []);
