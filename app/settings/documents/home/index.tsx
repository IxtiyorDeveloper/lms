import React from "react";
import { Wrapper } from "./style";
import TableC from "./components/table";
import Filter from "./components/filter";
import DocumentTabs from "./components/tabs";
import { useRouter } from "next/router";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { Button, PlusSvg } from "components";
import DeleteTab from "./components/deleteTab";
import AddDocumentTab from "./components/addDocumentTab";
import { useAllCompanyCategories, useCompanyFiles } from "hooks";
import AddFileModal from "./components/addFile";

const Home = () => {
  const router = useRouter();
  const { isLoading: categoriesLoading, data: categories } =
    useAllCompanyCategories({
      query_params: {
        "per-page": 100,
      },
    });

  const category_id = router.query.category_id || categories?.list?.[0]?.id;

  const { isLoading, data } = useCompanyFiles({
    query_params: {
      ...router.query,
      "per-page": router.query.pageSize || 100,
      category_id: category_id,
      pageSize: undefined,
    },
    enabled: !!category_id,
  });
  const handleOpen = () => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, addFile: true },
    });
  };

  return (
    <Wrapper>
      <DeleteTab />
      <AddDocumentTab />
      <div className="lead-filter">
        <Filter />
      </div>
      <DocumentTabs categories={categories} loading={categoriesLoading} />
      <div className="container">
        <div className="flex-top">
          <CheckPermission
            permission={[COMPONENTS_VIEWS.can_manage_document_settings]}
          >
            <Button onClick={handleOpen} icon={<PlusSvg />}>
              Create document
            </Button>
          </CheckPermission>
        </div>
        <TableC data={data} isLoading={isLoading} />
      </div>
      <AddFileModal categories={categories} category_id={category_id!} />
    </Wrapper>
  );
};

export default Home;
