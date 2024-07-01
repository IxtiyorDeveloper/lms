import React, { FC } from "react";
import { TabWrapper, Wrapper } from "./style";
import { AntdTable, RoundedTab } from "components";
import { Columns } from "./columns";
import { LifeCycleModal } from "globals/components";
import {
  REFERRAL_APPROVED,
  REFERRAL_CONTACTING,
  REFERRAL_PAID,
  REFERRAL_REGISTERED,
  REFERRAL_REJECTED,
  REFERRAL_SPENT,
} from "constants/referral";
import { bgColors } from "styles/theme";
import LeadLifeCycleModal from "../../../../../../globals/components/leadLifeCycle";

export const referralsColorsList = {
  [REFERRAL_CONTACTING]: bgColors.primary,
  [REFERRAL_REGISTERED]: bgColors.ginger,
  [REFERRAL_PAID]: bgColors.deep,
  [REFERRAL_APPROVED]: bgColors.midori,
  [REFERRAL_REJECTED]: bgColors.pepper,
};

interface IProps {
  data?: any;
  isLoading: boolean;
}

const TableComponent: FC<IProps> = ({ data, isLoading }) => {
  const pagination = {
    current: data?.meta?.currentPage,
    total: data?.meta?.totalCount,
  };

  const tabsList = [
    {
      title: () => (
        <TabWrapper>Contacting ({data?.tabs[REFERRAL_CONTACTING]})</TabWrapper>
      ),
      query: { type: REFERRAL_CONTACTING },
      children: (
        <AntdTable
          loading={isLoading}
          pagination={pagination}
          dataSource={data?.list}
          columns={Columns({ type: REFERRAL_CONTACTING })}
        />
      ),
    },
    {
      title: () => (
        <TabWrapper>Registered ({data?.tabs[REFERRAL_REGISTERED]})</TabWrapper>
      ),
      query: { type: REFERRAL_REGISTERED },
      children: (
        <AntdTable
          loading={isLoading}
          pagination={pagination}
          dataSource={data?.list}
          columns={Columns({ type: REFERRAL_REGISTERED })}
        />
      ),
    },
    {
      title: () => <TabWrapper>Paid ({data?.tabs[REFERRAL_PAID]})</TabWrapper>,
      query: { type: REFERRAL_PAID },
      children: (
        <AntdTable
          loading={isLoading}
          pagination={pagination}
          dataSource={data?.list}
          columns={Columns({ type: REFERRAL_PAID })}
        />
      ),
    },
    {
      title: () => (
        <TabWrapper>
          Approved (
          {isNaN(
            Number(data?.tabs[REFERRAL_APPROVED]) +
              Number(data?.tabs[REFERRAL_SPENT]),
          )
            ? 0
            : Number(data?.tabs[REFERRAL_APPROVED]) +
              Number(data?.tabs[REFERRAL_SPENT])}
          )
        </TabWrapper>
      ),
      query: { type: REFERRAL_APPROVED },
      children: (
        <AntdTable
          loading={isLoading}
          pagination={pagination}
          dataSource={data?.list}
          columns={Columns({ type: REFERRAL_APPROVED })}
        />
      ),
    },
    {
      title: () => (
        <TabWrapper>Rejected ({data?.tabs[REFERRAL_REJECTED]})</TabWrapper>
      ),
      query: { type: REFERRAL_REJECTED },
      children: (
        <AntdTable
          loading={isLoading}
          pagination={pagination}
          dataSource={data?.list}
          columns={Columns({ type: REFERRAL_REJECTED })}
        />
      ),
    },
  ];

  return (
    <Wrapper>
      <RoundedTab tabs={tabsList} />
      <LeadLifeCycleModal />
    </Wrapper>
  );
};

export default TableComponent;
