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
          stageList: data?.stageList,
          vacancyList: data?.vacancyList,
          setValue,
          watch,
          getValues,
        })}
        dataSource={data?.vacancyList}
      />
    </Wrapper>
  );
};

export default RbacRoleTable;
