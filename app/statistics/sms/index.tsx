import React from "react";
import Header from "./components/header";
import TableComponent from "./components/table";
import { useSmsCounts, useSMSList } from "hooks";
import { useRouter } from "next/router";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";

const SMSStatistics = () => {
  const router = useRouter();
  const today = moment().format(DATE_FORMAT_YYYY_MM_DD);
  const startOfMonth = moment().startOf("month").format(DATE_FORMAT_YYYY_MM_DD);

  const { isLoading, data } = useSmsCounts({
    query_params: {
      from_date: router.query?.from_date || startOfMonth,
      to_date: router.query?.to_date || today,
      branches: router.query?.branches || null,
      service_id: router.query?.service_id,
      status: router.query.status || null,
      // template_id: router.query.template_id || null,
      project: router.query.project || "LMS",
      name: router.query.name,
    },
  });

  const {
    data: smsDeliveryData,
    isLoading: smsDeliveryLoading,
    isPreviousData: smsDeliveryPreviousData,
  } = useSMSList({
    query_params: {
      type: router.query?.type || "100",
      from_date: router.query.from_date || startOfMonth,
      to_date: router.query.to_date || today,
      project:
        router.query.project === "all" ? null : router.query.project || "LMS",
      template_id: Number(router.query?.template_id)
        ? router.query.template_id
        : null,
      service_id: router.query?.service_id,
      branches: router.query?.branches || null,
      status: router.query.status || null,
      page: router.query.page || 1,
      "per-page": router?.query.pageSize || 20,
      expand: "userPhone.user.userProfile,createdBy,service",
      name: router.query.name,
    },
  });

  return (
    <div>
      <Header isLoading={isLoading} data={data} filters={smsDeliveryData} />
      <TableComponent
        dataForCounts={data || []}
        data={smsDeliveryData}
        isLoading={smsDeliveryLoading}
        isPreviousData={smsDeliveryPreviousData}
      />
    </div>
  );
};

export default SMSStatistics;
