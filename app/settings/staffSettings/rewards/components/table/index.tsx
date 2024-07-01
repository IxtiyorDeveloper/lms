import { AntdTable } from "components";
import { Columns } from "./columns";
import { IFetchList } from "types";
import { IStaffReward } from "types/staffSettings";
import { Wrapper } from "./style";
import { useInitialData } from "hooks";

const Table = ({
  data,
  loading,
}: {
  data: IFetchList<IStaffReward> | undefined;
  loading: boolean;
}) => {
  const { data: initialData, isLoading } = useInitialData();
  const meta = data?.data?.meta;

  return (
    <Wrapper>
      <AntdTable
        columns={Columns({ initialData })}
        dataSource={data?.data?.list ?? []}
        pagination={{
          current: meta?.currentPage,
          total: meta?.totalCount,
          pageSize: meta?.perPage,
        }}
        loading={loading || isLoading}
        rowKey="id"
      />
    </Wrapper>
  );
};

export default Table;
