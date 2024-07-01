import { AntdTable } from "components";
import { Columns } from "./columns";
import { ICandidate, IHRMainGeneral, InitialDataHR } from "types";

import { Wrapper } from "./style";

const Table = ({
  data,
  list,
  isLoading,
  initialData,
  isCollapse,
}: {
  data?: IHRMainGeneral;
  list: ICandidate[] | undefined;
  initialData?: InitialDataHR | undefined;
  isLoading?: boolean;
  isCollapse?: boolean;
}) => {
  return (
    <Wrapper
      numberedRowColors={(list ?? []).map((e, index) => ({
        id: index + 2,
        color: e.color,
      }))}>
      <AntdTable
        columns={Columns({
          initialData,
        })}
        dataSource={list ?? []}
        pagination={
          !isCollapse && {
            current: data?.data?.meta?.currentPage,
            total: data?.data?.meta?.totalCount,
            pageSize: 50,
          }
        }
        loading={isLoading}
        rowKey={"id"}
      />
    </Wrapper>
  );
};

export default Table;
