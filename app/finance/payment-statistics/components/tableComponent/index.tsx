import React, { useMemo } from "react";
import TableC from "./components/table";
import { usePageDataMemo, usePaymentStatistics } from "hooks";
import { Spin } from "antd";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { ITeacherObject } from "types/finance/paymentStatistics";

const TableComponent = () => {
  const selects = usePageDataMemo();
  const router = useRouter();
  const dates = useMemo(() => {
    return {
      year: moment(router?.query?.date)?.year(),
      month: moment(router?.query?.date)?.format("MM"),
    };
  }, [router?.query?.date]);

  const { data, isLoading, isPreviousData } = usePaymentStatistics({
    query_params: {
      expand: "teachers",
      year: dates.year,
      month: dates.month,
      branch_id: router?.query?.branch_id,
      full_name: router?.query?.full_name,
    },
  });

  return (
    <Spin spinning={selects.args.isLoading || selects.args.isPreviousData}>
      {data?.teachers ? (
        Object.keys(data?.teachers || {}).map((key, index) => {
          if (Array.isArray(data?.teachers[key as any])) {
            return (
              <TableC
                isLoading={isLoading || isPreviousData}
                data={{
                  data: data?.teachers?.[
                    key as any
                  ] as unknown as ITeacherObject[],
                  title: key,
                  count:
                    (data?.teachers?.[key as any]
                      ?.length as unknown as number) || 0,
                }}
                key={index}
              />
            );
          }
        })
      ) : (
        <TableC
          isLoading={isLoading || isPreviousData}
          data={{ data: [], title: "" }}
        />
      )}
    </Spin>
  );
};

export default TableComponent;
