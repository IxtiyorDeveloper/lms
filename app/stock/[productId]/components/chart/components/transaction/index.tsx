import React, { FC, useCallback, useEffect, useState } from "react";
import { CustomTooltip, Wrapper } from "./style";
import { Segmented } from "components";
import ByMonthFilter from "./components/byMonthFilter";
import ByDayFilter from "./components/byDayFilter";
import { useForm } from "react-hook-form";
import { IStockPage } from "types";
import { bgColors } from "styles/theme";
import { useAdminProductTransactionStatistics } from "hooks";
import ByTimeChart from "./components/byTimeChart";
import { useRouter } from "next/router";
import debounce from "lodash/debounce";
import moment from "moment";

interface IProps {
  pageData?: IStockPage;
}

const TransactionTab: FC<IProps> = ({ pageData }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("1");

  const { control, watch } = useForm({
    defaultValues: {
      statistics_location_id:
        router.query.statistics_location_id &&
        parseInt(router.query.statistics_location_id as string),
    },
  });

  const changeRouter = useCallback(
    debounce((values: any) => {
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            ...values,
          },
        },
        undefined,
        { scroll: false },
      );
    }, 500),
    [watch, router],
  );

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        changeRouter(value);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, router.query]);

  const { data } = useAdminProductTransactionStatistics({
    query_params: {
      product_id: router.query.productId,
      variationId: router.query.variationId,
      location_id: router.query.statistics_location_id || null,
      type: activeTab == "1" ? 100 : 200,
      year: router.query.statistics_year || moment().format("YYYY"),
      month: router.query.statistics_month || moment().format("MM"),
    },
  });

  return (
    <Wrapper>
      <div className="flex">
        <Segmented
          options={[
            { label: "By month", value: "1" },
            { label: "By day", value: "2" },
          ]}
          onChange={setActiveTab}
          initValue={activeTab}
        />
        <div>
          {activeTab == "1" ? (
            <ByMonthFilter control={control} pageData={pageData} />
          ) : (
            <ByDayFilter control={control} pageData={pageData} />
          )}
        </div>
      </div>
      <ByTimeChart
        xAxisVertical
        customTooltip={(p) => {
          const data = p.payload?.[0]?.payload;
          return (
            <CustomTooltip>
              <div className="item">
                <div className="flex">
                  <div className="color" />
                  <div className="child">
                    <div className="title">Arrival (External)</div>
                    <div className="count">{data?.["100"]?.external || 0}</div>
                  </div>
                </div>
                <div className="flex">
                  <div className="color" />
                  <div className="child">
                    <div className="title">Arrival (Internal)</div>
                    <div className="count">{data?.["100"]?.internal || 0}</div>
                  </div>
                </div>
                <div className="flex mt">
                  <div className="color Departure" />
                  <div className="child">
                    <div className="title ">Departure</div>
                    <div className="count">{data?.["200"]?.internal || 0}</div>
                  </div>
                </div>
                <div className="flex">
                  <div className="color Transfer" />
                  <div className="child">
                    <div className="title">Transfer</div>
                    <div className="count">{data?.["200"]?.external || 0}</div>
                  </div>
                </div>
                <div className="flex border">
                  <div className="child">
                    <div className="title">All</div>
                    <div className="count">
                      {parseInt(data?.["100"]?.external) +
                        parseInt(data?.["100"]?.internal) +
                        parseInt(data?.["200"]?.external) +
                        parseInt(data?.["200"]?.internal) || 0}
                    </div>
                  </div>
                </div>
              </div>
            </CustomTooltip>
          );
        }}
        barSize={30}
        isBrush
        data={data || []}
        color={bgColors.midori}
      />
    </Wrapper>
  );
};

export default TransactionTab;
