import React from "react";
import { TableWrapper } from "./style";
import {
  Button,
  ComplexThinTab,
  PlusSvg,
  SmsSearchSvg,
  SmsStarSvg,
} from "components";
import SmsTemplate from "./components/smsTemplate";
import SmsHistory from "./components/smsHistory";
import Router, { useRouter } from "next/router";
import { useLeadConfigSmsTemplateList } from "hooks";

const TableComponent = () => {
  const router = useRouter();
  const { data, isLoading, isPreviousData } = useLeadConfigSmsTemplateList({
    to_date: router.query.to_date,
    from_date: router.query.from_date,
    name: router.query.name,
    model_id: router.query.model_id,
    pageSize: router.query.pageSize,
    page: router.query.page,
  });

  const onClickCreate = () => Router.push("/leads/lead-config/template");

  return (
    <TableWrapper>
      <ComplexThinTab
        paddingTab="0 400px"
        styles={{ padding: "20px" }}
        menu={[
          {
            children: (
              <SmsTemplate
                data={data}
                isLoading={isLoading || isPreviousData}
              />
            ),
            label: (
              <div className="flex">
                <SmsStarSvg />
                <p>
                  SMS template{" "}
                  <span className="badge">
                    {(data as any)?.totals?.template_count || 0}
                  </span>
                </p>
              </div>
            ),
            isClickable: true,
            query: {
              page: 1,
              pageSize: 20,
            },
          },
          {
            children: <SmsHistory />,
            label: (
              <div className="flex">
                <SmsSearchSvg />
                <p>
                  SMS history
                  <span className="badge">
                    {(data as any)?.totals?.sms_history_count || 0}
                  </span>
                </p>
              </div>
            ),
            isClickable: true,
            query: {
              page: 1,
              pageSize: 20,
            },
          },
        ]}
        topLeftChildren={
          <Button onClick={onClickCreate} icon={<PlusSvg />}>
            Create Template
          </Button>
        }
      />
    </TableWrapper>
  );
};

export default TableComponent;
