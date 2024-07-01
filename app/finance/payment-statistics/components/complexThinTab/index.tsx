import React, { useMemo } from "react";
import { ComplexThinTab } from "components";
import Filter from "../filter";
import { ChildWrapper } from "./style";
import GrossTotal from "../grossTotal";
import Total from "../total";
import Expense from "../expense";
import Profit from "../profit";
import { usePaymentStatistics } from "hooks";
import { useRouter } from "next/router";
import { Spin } from "antd";
import moment from "moment";
import Details from "../details";
import Switch from "components/antd/switch";
import { useForm } from "react-hook-form";

const ComplexThinTabPayment = () => {
  const router = useRouter();
  const { control, watch } = useForm();
  const dates = useMemo(() => {
    return {
      year: moment(router?.query?.date)?.year(),
      month: moment(router?.query?.date)?.format("MM"),
    };
  }, [router?.query?.date]);

  const { data, isLoading } = usePaymentStatistics({
    query_params: {
      year: dates.year,
      month: dates.month,
      branch_id: router?.query?.branch_id,
    },
  });

  const total = data?.potentialSalary || 0;

  const switchValue = watch("switch");

  const menu = useMemo(() => {
    const salary = switchValue ? total : 0;
    return [
      {
        label: "Statistics",
        children: (
          <ChildWrapper>
            <div className="flex">
              Potential expense
              <Switch name="switch" control={control} />
            </div>

            <GrossTotal data={data} />
            <Total data={data} />
            <Expense data={data} salary={salary} />
            <Profit data={data} salary={salary} />
          </ChildWrapper>
        ),
        icon: null,
        query: {
          mainTab: 0,
        },
        isClickable: true,
      },
      {
        label: "Details",
        children: (
          <ChildWrapper style={{ padding: 0 }}>
            <Details />
          </ChildWrapper>
        ),
        icon: null,
        query: {
          mainTab: 1,
        },
        isClickable: true,
      },
    ];
  }, [data, total, switchValue]);

  const initValue = router?.query?.mainTab
    ? +router?.query?.mainTab.toString()
    : 0;

  return (
    <Spin spinning={isLoading}>
      <ComplexThinTab
        paddingTab="0 60px"
        headPadding={16}
        initValue={initValue}
        menu={menu}
        topLeftChildren={<Filter />}
      />
    </Spin>
  );
};

export default ComplexThinTabPayment;
