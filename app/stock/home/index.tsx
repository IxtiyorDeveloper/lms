import React from "react";
import { Wrapper } from "./style";
import Tabs from "./components/tabs";
import FiltersComponent from "./components/filters";
import Categories from "./components/categories";
import StockCategoryModal from "./components/categoryModal";
import ProductModal from "../components/productModal";
import { useStockPageData } from "hooks";
import Actions from "../components/actions";
import { queryKeys } from "constants/queryKeys";

const StockPage = () => {
  const { data } = useStockPageData({});

  return (
    <Wrapper>
      <Tabs locations={data?.locations || []} />
      <FiltersComponent data={data} />
      <Categories />
      <StockCategoryModal />
      <ProductModal />
      <Actions
        shouldBeInvalidateKeys={[
          queryKeys.admin_category_index,
          queryKeys.admin_page_data,
        ]}
      />
    </Wrapper>
  );
};

export default StockPage;
