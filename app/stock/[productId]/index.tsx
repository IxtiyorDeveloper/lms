import React from "react";
import Chart from "./components/chart";
import Filter from "./components/filter";
import Table from "./components/table";
import { useAdminProductView, useStockPageData } from "hooks";
import { useRouter } from "next/router";
import { Spin } from "antd";
import ProductModal from "../components/productModal";
import Actions from "../components/actions";
import { queryKeys } from "constants/queryKeys";

const ProductInnerPage = () => {
  const router = useRouter();
  const { data: pageData } = useStockPageData();
  const { data, isLoading } = useAdminProductView({
    query_params: {
      id: router.query.productId,
      variation_id: router.query.variation_id,
      expand:
        "notification_status,count,units,status,properties.options,category,isStationary,sellPlaces,photos,cover_file_id,stationary_type,level_id,description,tags,locations,allVariations.options,variations.options,variations.units,allProperties.allOptions,buttonActions,alert_counts",
    },
    keepPreviousData: true,
  });

  return (
    <Spin spinning={isLoading}>
      <div>
        <Chart pageData={pageData} data={data} />
        <Filter data={pageData} />
        <Table pageData={pageData} product={data} />
      </div>
      <ProductModal />
      <Actions
        shouldBeInvalidateKeys={[
          queryKeys.admin_product_view,
          queryKeys.admin_page_data,
          queryKeys.admin_product_actions,
          queryKeys.admin_product_transaction_statistics,
        ]}
      />
    </Spin>
  );
};

export default ProductInnerPage;
