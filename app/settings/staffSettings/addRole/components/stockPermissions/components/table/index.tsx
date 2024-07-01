import React, { FC, useEffect } from "react";
import { AntdTable } from "components";
import { Columns } from "./columns";
import { IHrRbacPermissions } from "types";
import { Wrapper } from "./style";
import _ from "lodash";
import { getKeysWithPermission } from "./components/getKeysWithPermission";
import { checkFieldValue } from "./components/checkFieldValue";
import { checkMatchingValues } from "./components/checkMatchingValues";

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
  const category_permission = data?.category_permission;
  const watchAll = watch();

  useEffect(() => {
    if (category_permission) {
      let rowSwitch = {};
      for (let i = 0; i < category_permission?.length; i++) {
        const category = category_permission?.[i];
        const permissions = category?.permissions;
        for (let j = 0; j < permissions?.length; j++) {
          const permission = permissions?.[j];
          setValue(
            `p_${category?.id}_${permission?.permission}`,
            permission?.is_checked,
          );

          const prev =
            rowSwitch?.[
              `p_${permission?.permission as keyof typeof rowSwitch}`
            ] || true;

          rowSwitch = {
            ...rowSwitch,
            [`p_${permission?.permission}`]: prev && permission?.is_checked,
          };
        }
      }
      if (!_.isEmpty(rowSwitch)) {
        for (const [key, value] of Object.entries(rowSwitch)) {
          setValue(key, value);
        }
      }
    }
  }, [category_permission]);

  useEffect(() => {
    const subscription = watch((value: any, { name, type }: any) => {
      if (checkFieldValue({ str: name })) {
        const rowSwitch = getKeysWithPermission({ obj: value, name });
        const rowKey = name.replace(/_\d+_/, "_");
        setValue(rowKey, rowSwitch);
        const all = checkMatchingValues({ values: value });
        setValue(`stock_all`, all);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Wrapper>
      <AntdTable
        columns={Columns({
          control,
          setValue,
          watchAll,
          getValues,
          category_permission,
        })}
        dataSource={data?.category_permission}
      />
    </Wrapper>
  );
};

export default RbacRoleTable;
