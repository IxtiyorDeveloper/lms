import React from "react";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";
import { PAGE_VISITS } from "../../constants/permissions";

const Stock = dynamic(() => import("app/stock/home"));

const StockPage = () => {
  return <Stock />;
};

export default withAuth(StockPage, [PAGE_VISITS.can_visit_stock_page]);
