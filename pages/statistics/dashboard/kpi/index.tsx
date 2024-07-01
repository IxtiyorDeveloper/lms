import React from "react";
// import KpiStatistics from "app/statistics/dashboard/kpi";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const KpiStatistics = dynamic(() => import("app/statistics/dashboard/kpi"));
const KpiPage = () => {
  return (
    <div>
      <KpiStatistics />
    </div>
  );
};

export default withAuth(KpiPage, []);
