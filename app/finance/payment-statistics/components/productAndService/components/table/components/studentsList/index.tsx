import React, { FC } from "react";
import { useIncomeList } from "hooks";
import { Spin } from "antd";
import SwiperCore, { Mousewheel } from "swiper";
import { useRouter } from "next/router";
import { expand } from "../../../../../../../transactions/components/income/expand";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { AntdTable } from "components";
import { Columns } from "./coloumns";

SwiperCore.use([Mousewheel]);
const StudentsList: FC<any> = ({ row, width }) => {
  const router = useRouter();
  const { data, isLoading } = useIncomeList({
    query_params: {
      type: 200,
      from_date: moment(router.query.date, DATE_FORMAT_YYYY_MM)
        .startOf("months")
        .format(DATE_FORMAT_YYYY_MM_DD),
      to_date: moment(router.query.date, DATE_FORMAT_YYYY_MM)
        .endOf("months")
        .format(DATE_FORMAT_YYYY_MM_DD),
      expand,
      product_and_service_origin_id: row?.original?.origin_id,
      product_and_service_type: row?.original?.type,
      pageSize: 10000,
    },
  });
  return (
    <Spin spinning={isLoading}>
      <AntdTable columns={Columns()} dataSource={data?.list} />
    </Spin>
  );
};

export default StudentsList;
