import React, { useEffect, useMemo, useState } from "react";
import { Wrapper } from "./style";
import Filter from "./components/filter";
import TableHeader from "./components/tableHeader";
import ParentTable from "./components/parentTable";
import { useCashFlow } from "hooks";
import { useRouter } from "next/router";
import { ICashFlow, PaymentForms } from "types";
import { Spin } from "antd";
import Sticky from "react-stickynode";
import Switch from "components/antd/switch";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";

export interface IPropsCashFlow {
  isLoading: boolean;
  bool: boolean;
  total: number;
  data: ICashFlow[] | undefined;
  without_avans?: boolean;
}
const CashFlow = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { control, watch } = useForm({
    defaultValues: {
      without_avans: true,
      switch: false,
    },
  });
  const { control: controlSort, watch: sortWatch } = useForm();

  const switchValue = watch("switch");

  const without_avans = watch("without_avans");
  const sort = sortWatch("sort");

  const { isLoading, data, isFetched } = useCashFlow({
    ...router.query,
    query_params: {
      full: 1,
      without_avans,
    },
  });

  const [total, setTotal] = useState<number>(1);

  useMemo(() => {
    if (isFetched) {
      let sum: number = 0;
      data?.map((e) => {
        let a = +e.total_amount || 0;
        sum += a;
      });
      setTotal(sum);
    }
  }, [data]);

  useEffect(() => {
    if (!switchValue) {
      queryClient.invalidateQueries([queryKeys.cash_flow]);
      queryClient.resetQueries([queryKeys.admin_finance_salary_main_index]);
    }
  }, [switchValue]);

  const sortedData = useMemo(() => {
    if (!sort) {
      return data;
    } else {
      const type =
        sort.field === "mot"
          ? PaymentForms.MOT
          : sort.field === "bank"
            ? PaymentForms.BANK
            : undefined;

      const newData = data?.sort((a, b) => {
        if (type) {
          let total1 = 0;
          let total2 = 0;
          a.detailedAmount.map((e) => {
            if (e.payment_form == type) {
              total1 += parseInt(e.amount);
            }
          });
          b.detailedAmount.map((e) => {
            if (e.payment_form == type) {
              total2 += parseInt(e.amount);
            }
          });
          return sort.type == "asc" ? total1 - total2 : total2 - total1;
        } else {
          return sort.type == "asc"
            ? parseInt(a.total_amount) - parseInt(b.total_amount)
            : parseInt(b.total_amount) - parseInt(a.total_amount);
        }
      });

      return newData;
    }
  }, [sort, data]);

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <Filter
          isLoading={isLoading}
          bool={switchValue}
          data={data}
          total={total}
        />
        <div className="bottom">
          <div className="last">
            <div className="flex">
              Without avans
              <Switch name="without_avans" control={control} />
            </div>
            <div className="flex">
              Potential expense
              <Switch name="switch" control={control} />
            </div>
          </div>
          <div style={{ paddingTop: "40px" }}>
            <Sticky
              innerZ={10}
              enabled={true}
              top={80}
              children={(<TableHeader control={controlSort} />) as any}
            />
          </div>
          <ParentTable
            isLoading={!isFetched}
            data={sortedData}
            total={total}
            bool={switchValue}
            without_avans={without_avans}
          />
        </div>
      </Wrapper>
    </Spin>
  );
};

export default CashFlow;
