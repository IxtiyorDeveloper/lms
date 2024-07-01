import React, { FC } from "react";
import { ButtonWrapper, TableWrapper } from "./style";
import { AntdTable, Button, PlusSvg } from "components";
import Columns from "./columns";
import { Interface } from "./type";
import { useRouter } from "next/router";
import { useProductsServicesList } from "hooks";
import { FilterSite } from "../index";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";

const ProductServices: FC<Interface> = ({ data: dataFilter, selects }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, isLoading, isPreviousData } = useProductsServicesList(
    router.query
  );

  return (
    <>
      <TableWrapper>
        <ButtonWrapper>
          <Button
            onClick={() =>
              dispatch(
                toggleModal({
                  key: "productAndService",
                  data: {
                    data: { action: "create" },
                    open: true,
                  },
                })
              )
            }
          >
            <PlusSvg /> Create
          </Button>
          <FilterSite data={dataFilter} selects={selects} />
        </ButtonWrapper>
        <AntdTable
          columns={Columns()}
          dataSource={data?.list ?? []}
          loading={isLoading || isPreviousData}
          pagination={{
            current: data?.meta?.currentPage,
            total: data?.meta?.totalCount,
          }}
        />
      </TableWrapper>
    </>
  );
};

export default ProductServices;
