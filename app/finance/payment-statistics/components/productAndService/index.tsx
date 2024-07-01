import React, { useMemo } from "react";
import TableC from "./components/table";
import { usePageDataMemo, useProductAndServiceStatistics } from "hooks";
import { Spin } from "antd";
import { useRouter } from "next/router";
import moment from "moment/moment";

const ProductAndServiceTable = () => {
  const selects = usePageDataMemo();
  const router = useRouter();
  const dates = useMemo(() => {
    const date = moment(router?.query?.date, "YYYY-MM");
    const validateDate = date.isValid() ? date : moment();
    return {
      year: validateDate.format("YYYY"),
      month: validateDate.format("M"),
    };
  }, [router?.query?.date]);

  const { data, isLoading } = useProductAndServiceStatistics({
    query_params: {
      ...dates,
    },
  });

  return (
    <Spin spinning={selects.args.isLoading}>
      <TableC isLoading={isLoading} data={data} />
    </Spin>
  );
};

export default ProductAndServiceTable;
