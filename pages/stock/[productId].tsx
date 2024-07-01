import React from "react";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";
import { PAGE_VISITS } from "../../constants/permissions";

const ProductInnerPage = dynamic(() => import("app/stock/[productId]"));

const ProductPage = () => {
  return <ProductInnerPage />;
};

export default withAuth(ProductPage, [PAGE_VISITS.can_visit_stock_page]);
