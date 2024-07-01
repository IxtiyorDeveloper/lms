import React, { FC, useEffect, useState } from "react";
import { TableWrapper, Wrapper } from "./style";
import Filter from "./components/filter";
import TableHeader from "./components/tableHeader";
import ParentTable from "./components/parentTable";
import { useCashFlow } from "hooks";
import { useRouter } from "next/router";
import { ICashFlow } from "types";
import { Spin } from "antd";
import Sticky from "react-stickynode";

export interface IPropsCashFlow {
  isLoading: boolean;
  total: number;
  data: ICashFlow[] | undefined;
}
const CashFlow: FC = () => {
  const router = useRouter();
  const { isLoading, data } = useCashFlow({
    ...router.query,
    query_params: {
      full: 1,
    },
  });
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let sum: number = 0;
    data?.map((e) => {
      let a = +e.total_amount || 0;
      sum += a;
    });
    setTotal(sum);
  }, [data]);

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <Filter isLoading={isLoading} data={data} total={total} />
        <div className="bottom">
          <div style={{ paddingTop: "40px" }}>
            <Sticky innerZ={10} enabled={true} top={80}>
              <TableHeader />
            </Sticky>
          </div>
        </div>
      </Wrapper>
      <TableWrapper>
        <ParentTable isLoading={isLoading} data={data} total={total} />
      </TableWrapper>
    </Spin>
  );
};

export default CashFlow;
