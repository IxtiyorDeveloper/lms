import React, { Fragment } from "react";
import { AntdTable } from "components";
import { getRecommendationListColumns } from "./components/row";
import { TWaitingList } from "types";
import { EStudentMatchType } from "../../../../../../types/student/waitingList";

const RecommendationListTable = ({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: TWaitingList | undefined;
}) => {
  return (
    <Fragment>
      <AntdTable
        columns={getRecommendationListColumns()}
        dataSource={data?.list || []}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
        loading={isLoading}
      />
    </Fragment>
  );
};

export default RecommendationListTable;
