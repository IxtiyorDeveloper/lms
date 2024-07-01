import React, { useEffect } from "react";
import { useLeadSmsHistory, usePageData, usePageDataMemo } from "hooks";
import { AntdTable, MySelect } from "components";
import { Spin } from "antd";
import { bgColors } from "styles/theme";
import { useRouter } from "next/router";
import { FlexWrapper } from "./style";
import { useForm } from "react-hook-form";
import { filterQuery } from "utils/filterQuery";
import _ from "lodash";
import Columns from "./columns";

const colors = [
  bgColors.midori,
  bgColors.orange,
  bgColors.midori,
  bgColors.purpleCrystal,
  bgColors.pop,
  bgColors.yourShadow,
];

const SmsHistory = () => {
  const router = useRouter();
  const { sms } = usePageDataMemo();
  const { data, isLoading, isPreviousData } = useLeadSmsHistory({
    to_date: router.query.to_date,
    from_date: router.query.from_date,
    name: router.query.name,
    model_id: router.query.model_id,
    scenario: router.query.scenario,
    status: router.query.status,
    page: router.query.page || 0,
    "per-page": router?.query.pageSize || 20,
  });

  const { control, watch } = useForm();

  const onSubmit = (data: any) => {
    filterQuery(data);
  };

  const { data: pageData } = usePageData();

  useEffect(() => {
    const subscription = watch((value) => {
      onSubmit(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Spin spinning={isLoading || isPreviousData}>
      <div style={{ padding: "10px" }}>
        <FlexWrapper>
          <ul className="stats">
            {(data as any)?.totals?.map((d: any) => (
              <li>
                <div
                  style={{ background: colors[d.status] }}
                  className="dot"
                ></div>
                {d.label} <span className="grotesk">({d.count})</span>
              </li>
            ))}
          </ul>
          <form>
            <div className="for-input">
              <MySelect
                name="scenario"
                control={control}
                placeholder="Scenario"
                options={_.map(
                  pageData?.sms?.smsDeliveryScenarioEnums,
                  (value, key) => {
                    return {
                      label: value,
                      value: key,
                    };
                  }
                )}
              />
            </div>
            <div className="for-input">
              <MySelect
                name="status"
                options={(data as any)?.totals?.map((status: any) => {
                  return { label: status.label, value: status.status };
                })}
                control={control}
                placeholder="Status"
              />
            </div>
            {/*<Button type="submit">Search</Button>*/}
          </form>
        </FlexWrapper>
        <AntdTable
          loading={isLoading || isPreviousData}
          columns={Columns({ sms })}
          dataSource={data?.list || []}
          pagination={{
            current: data?.meta?.currentPage,
            total: data?.meta?.totalCount,
          }}
        />
      </div>
    </Spin>
  );
};

export default SmsHistory;
