import React from "react";
import { usePageDataMemo } from "hooks";
import { AntdTable } from "components";
import { Spin } from "antd";
import { bgColors } from "styles/theme";
import { FlexWrapper } from "./style";
import Columns from "./columns";
import { ISmsDelivery } from "types/statistics/sms";

const colors = [
  bgColors.midori,
  bgColors.orange,
  bgColors.midori,
  bgColors.purpleCrystal,
  bgColors.pop,
  bgColors.yourShadow,
];

interface IAutoSMS {
  data: ISmsDelivery | undefined;
  isLoading: boolean;
  isPreviousData: boolean;
}
const ManualSMS = ({ data, isPreviousData, isLoading }: IAutoSMS) => {
  const { sms } = usePageDataMemo();

  return (
    <Spin spinning={isLoading}>
      <div style={{ padding: "10px" }}>
        <FlexWrapper>
          <ul className="stats">
            {data?.totals?.map((d: any) => (
              <li key={d.label}>
                <div
                  style={{ background: colors[d.status] }}
                  className="dot"
                ></div>
                {d.label} <span className="grotesk">({d.count})</span>
              </li>
            ))}
          </ul>
        </FlexWrapper>
        <AntdTable
          columns={Columns(data, sms)}
          dataSource={data?.list || []}
          loading={isLoading || isPreviousData}
          pagination={{
            current: data?.meta?.currentPage,
            total: data?.meta?.totalCount,
          }}
        />
      </div>
    </Spin>
  );
};

export default ManualSMS;
