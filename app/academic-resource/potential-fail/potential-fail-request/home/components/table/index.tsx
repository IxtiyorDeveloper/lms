import React from "react";
import { Wrapper } from "./style";
import { AntdTable } from "components";
import Columns from "./components/columns";
import { ITable } from "./type";
import { useRouter } from "next/router";
import { EPotentialFailStaffType } from "types/potentialFail/potentialFailRequest";

const TableComponent = ({ data, isLoading }: ITable) => {
  const router = useRouter();
  const onRowClick = ({
    id,
    staff_type,
  }: {
    id: string;
    staff_type: EPotentialFailStaffType;
  }) => {
    const staff =
      staff_type == EPotentialFailStaffType.TEACHER_AND_SUPPORT
        ? EPotentialFailStaffType.TEACHER
        : staff_type;
    router.push({
      pathname: `/academic-resource/potential-fail/potential-fail-request/${id}`,
      query: {
        staff_type: staff,
      },
    });
  };

  return (
    <Wrapper>
      <AntdTable
        columns={Columns()}
        dataSource={data?.list ?? []}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
        loading={isLoading}
        onRow={(record) => {
          return {
            onClick: () => {
              onRowClick({ id: record?.id, staff_type: record?.staff_type });
            }, // click row
          };
        }}
      />
    </Wrapper>
  );
};

export default TableComponent;
