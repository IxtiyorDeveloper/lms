import React from "react";
import { AntdTable } from "components";
import { orderColumns } from "./components/columns";
import { useOrderList } from "hooks";
import { useRouter } from "next/router";
import { Wrapper } from "./style";

const Shop = () => {
  const router = useRouter();
  // const { data, isLoading } = useStudentOrder({
  //   query_params: {
  //     student_id: Router.query.studentId,
  //   },
  // });

  const { data, isLoading } = useOrderList({
    query_params: {
      expand:
        "customer.phones,customer.profile,items.variation.optionsValue,items.variation.product,created,given.createdBy",
      // ...router.query,
      incomeSecondaryTabIndex: undefined,
      customer_id: router.query.studentId,
    },
  });

  return (
    <Wrapper>
      <AntdTable
        columns={orderColumns}
        dataSource={data?.list}
        loading={isLoading}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
      />
    </Wrapper>
  );
};

export default Shop;
