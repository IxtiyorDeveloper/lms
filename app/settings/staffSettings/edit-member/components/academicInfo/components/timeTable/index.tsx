import { AntdTable } from "components";
import Columns from "./columns";
import { ISupportTimeTable } from "types";
import { IStaffViewPageInfoData } from "types/staffSettings";
import { TableWrapper } from "./style";

const Switcher = ({
  is_support,
  loading,
  dataGetOne,
  data,
}: {
  is_support: boolean;
  loading: boolean;
  dataGetOne: IStaffViewPageInfoData | undefined;
  data: ISupportTimeTable | undefined;
}) => {
  if (is_support)
    return (
      <TableWrapper>
        <AntdTable
          columns={Columns({ data, loading })}
          loading={loading}
          dataSource={dataGetOne?.workingHours}
          bordered
        />
      </TableWrapper>
    );
  else {
    return null;
  }
};

export default Switcher;
