import React, { FC } from "react";
import { usePageDataMemo, useSmsPageData } from "hooks";
import { AntdTable } from "components";
import { Spin } from "antd";
import { bgColors } from "styles/theme";
import {
  FlexWrapper,
  MainWrap,
  TemplateName,
  Wrapper,
} from "../manualSms/style";
import { useForm } from "react-hook-form";
import { useExclude } from "utils/excludeObjectFields";
import Columns from "./columns";
import { ISmsDelivery } from "types/statistics/sms";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import TabSideComponent from "./tabsSide";
import { ETypeSMSDelivery } from "../../index";
import ManualTabSideComponent from "./tabsSide/manualIndex";

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
  type?: 100 | 200;
}

const AutoSMS: FC<IAutoSMS> = ({
  data,
  isLoading,
  isPreviousData,
  type = 100,
}) => {
  const router = useRouter();

  const today = moment().format(DATE_FORMAT_YYYY_MM_DD);
  const startOfMonth = moment().startOf("month").format(DATE_FORMAT_YYYY_MM_DD);

  const { sms } = usePageDataMemo();

  const { watch, setValue } = useForm();

  useExclude(watch, [], setValue, ["page", "pageSize"], false, null);

  const { isLoading: pageDataLoading, data: smsPageData } = useSmsPageData({
    query_params: {
      from_date: router.query?.from_date || startOfMonth,
      to_date: router.query?.to_date || today,
      service_id: router.query?.service_id,
      type: router.query?.type || type,
      project:
        router.query.project === "all" ? null : router.query.project || "LMS",
      branches: null,
      status: null,
    },
  });

  const getNameOfTemplate = (type: 100 | 200) => {
    let template_id = router.query?.template_id;
    template_id = Array.isArray(template_id) ? template_id[0] : template_id;
    let title = "";

    if (type === ETypeSMSDelivery.manual) {
      // @ts-ignore
      return smsPageData?.period?.filter((p) => p.id == template_id)[0]?.name;
    }

    if (template_id && Array.isArray(smsPageData)) {
      smsPageData?.map((pData) => {
        pData.periodTemplates.map((p) => {
          if (p.id === template_id) title = p.name;
        });
      });
    } else {
      if (
        smsPageData &&
        Array.isArray(smsPageData) &&
        !!smsPageData[0]?.periodTemplates[0]
      ) {
        router
          .push({
            query: {
              ...router.query,
              template_id: smsPageData[0]?.periodTemplates[0]?.id,
            },
          })
          .then();
        title = smsPageData[0]?.periodTemplates[0]?.name;
      }
    }

    return title;
  };

  return (
    <Spin spinning={isLoading || pageDataLoading}>
      <MainWrap>
        <div className="sms-templates">
          {type === ETypeSMSDelivery.auto && Array.isArray(smsPageData) ? (
            <TabSideComponent smsPageData={smsPageData} />
          ) : type === ETypeSMSDelivery.manual &&
            !Array.isArray(smsPageData) ? (
            <ManualTabSideComponent smsPageData={smsPageData} />
          ) : null}
        </div>
        <Wrapper>
          <FlexWrapper>
            <TemplateName>{getNameOfTemplate(type)}</TemplateName>
            <ul className="stats">
              {data?.totals?.map((d: any) => {
                return (
                  <li key={d.label}>
                    <div
                      style={{ background: colors[d.status] }}
                      className="dot"
                    ></div>
                    {d.label} <span className="grotesk">({d.count})</span>
                  </li>
                );
              })}
            </ul>
          </FlexWrapper>
          <AntdTable
            rowClassName="row-sms-table"
            columns={Columns(sms)}
            dataSource={data?.list || []}
            loading={isLoading || isPreviousData}
            pagination={{
              current: data?.meta?.currentPage,
              total: data?.meta?.totalCount,
            }}
          />
        </Wrapper>
      </MainWrap>
    </Spin>
  );
};

export default AutoSMS;
