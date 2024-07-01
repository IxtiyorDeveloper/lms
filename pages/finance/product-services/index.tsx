import React from "react";
import { ProductsServicesPage } from "app";
import withAuth from "utils/guard";

const ProductsServices = () => {
  return <ProductsServicesPage />;
};

export default withAuth(ProductsServices, []);
