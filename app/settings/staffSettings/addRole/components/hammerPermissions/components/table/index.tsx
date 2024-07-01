import React, { FC } from "react";
import { AntdTable } from "components";
import { columns } from "./columns";
import { IHrRbacPermissions } from "types";
import { Wrapper } from "./style";

interface IProps {
  data?: IHrRbacPermissions;
  control: any;
  setValue: any;
  watch: any;
  getValues: any;
}
const RbacRoleTable: FC<IProps> = ({
  data,
  control,
  setValue,
  watch,
  getValues,
}) => {
  return (
    <Wrapper>
      <AntdTable
        columns={columns({
          control,
          setValue,
          watch,
          getValues,
          data: data?.category_config as any,
        })}
        dataSource={data?.category_config}
      />
    </Wrapper>
  );
};

export default RbacRoleTable;
