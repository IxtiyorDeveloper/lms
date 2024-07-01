import React, { FC, useEffect } from "react";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { useRbacPermissions, useTaskRbacSave } from "hooks";
import Permissions from "../permissions";
import { useForm } from "react-hook-form";
import { LastButtonWrapper } from "../../style";
import { Button } from "components";
import { IRole } from "types";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { PERMISSION_TYPE_LOCAL } from "constants/permissionTypes";
import RbacRoleTable from "./components/table";
import { checkCanEdit } from "../utils/checkCanEdit";

const TaskPermissions: FC<{ dataOne?: IRole }> = ({ dataOne }) => {
  const router = useRouter();
  const { control, watch, setValue, setError, getValues, handleSubmit } =
    useForm();

  const { isLoading, data } = useRbacPermissions({
    query_params: {
      role_id: router.query.roleId,
    },
    project: "stock",
    action: "admin_rbac_role_permissions",
  });

  useEffect(() => {
    setValue(
      "permissions",
      data?.permissions.map((e) => e.permission),
    );
  }, [data]);

  const save = useTaskRbacSave({
    onSuccess: () => {
      toast.success("Saved");
      // queryClient.invalidateQueries([queryKeys.admin_group_get_attendance]);
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        setError,
        showToast: true,
        formHookMainField: false,
      });
    },
  });

  const onSubmit = (roleData: any) => {
    checkCanEdit().then(() => {
      // const result: { [key: string]: any }[] = [];
      // map(roleData.vacancy_list.a, (value, key) => {
      //   const names: string[] = key.split("-");
      //   result.push({
      //     id: names[0],
      //     [names[1]]: value ? 1 : 0,
      //   });
      // });
      // const groupedData = groupBy(result, "id");
      //
      // const category_config = map(groupedData, (group) => {
      //   return mergeWith({}, ...group, (objValue: any, srcValue: any) => {
      //     if (isBoolean(objValue) && isBoolean(srcValue)) {
      //       return objValue && srcValue;
      //     }
      //   });
      // });
      let category_permission: any = [];
      const data_category_permission = (data as any)?.category_permission;

      if (data_category_permission) {
        for (let i = 0; i < data_category_permission?.length; i++) {
          const category = data_category_permission[i];

          let permissions: any = [];

          for (let j = 0; j < category?.permissions?.length; j++) {
            const permission = category?.permissions?.[j];

            const is_checked =
              roleData?.[`p_${category?.id}_${permission?.permission}`];
            permissions = [
              ...permissions,
              {
                permission: permission?.permission,
                is_checked,
              },
            ];
          }

          category_permission = [
            ...category_permission,
            {
              id: category?.id,
              name: category?.name,
              permissions,
            },
          ];
        }
      }

      save.mutate({
        project: "stock",
        action: "admin_rbac_save",
        version: null,
        body: {
          role_id: router.query.roleId,
          type: dataOne?.type,
          name: dataOne?.name,
          permissions: roleData.permissions.map((permission: string) => {
            return {
              permission: permission,
              type: PERMISSION_TYPE_LOCAL,
            };
          }),
          category_permission,
        },
      });
    });
  };

  return (
    <Spin spinning={isLoading}>
      <RbacRoleTable
        data={data}
        control={control}
        watch={watch}
        setValue={setValue}
        getValues={getValues}
      />
      <Permissions watch={watch} control={control} data={data} />
      <LastButtonWrapper>
        <Button onClick={handleSubmit(onSubmit)} buttonLoading={save.isLoading}>
          Save
        </Button>
      </LastButtonWrapper>
    </Spin>
  );
};

export default TaskPermissions;
