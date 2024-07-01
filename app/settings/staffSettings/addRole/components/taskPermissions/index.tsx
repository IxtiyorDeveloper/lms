import React, { FC, useEffect } from "react";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { useRbacPermissions, useTaskRbacSave } from "hooks";
import RbacRoleTable from "./components/table";
import Permissions from "../permissions";
import { useForm } from "react-hook-form";
import { LastButtonWrapper } from "../../style";
import { Button } from "components";
import { IRole } from "types";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { groupBy, isBoolean, map, mergeWith } from "lodash";
import { PERMISSION_TYPE_LOCAL } from "constants/permissionTypes";
import { checkCanEdit } from "../utils/checkCanEdit";

const TaskPermissions: FC<{ dataOne?: IRole }> = ({ dataOne }) => {
  const router = useRouter();
  const { control, watch, setValue, setError, getValues, handleSubmit } =
    useForm();

  const { isLoading, data } = useRbacPermissions({
    query_params: {
      role_id: router.query.roleId,
    },
    project: "task",
    version: "v2",
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
      const result: { [key: string]: any }[] = [];
      map(roleData.vacancy_list.a, (value, key) => {
        const names: string[] = key.split("-");
        result.push({
          id: names[0],
          [names[1]]: value ? 1 : 0,
        });
      });
      const groupedData = groupBy(result, "id");

      const category_config = map(groupedData, (group) => {
        return mergeWith({}, ...group, (objValue: any, srcValue: any) => {
          if (isBoolean(objValue) && isBoolean(srcValue)) {
            return objValue && srcValue;
          }
        });
      });

      save.mutate({
        project: "task",
        version: "v2",
        action: "admin_rbac_save",
        body: {
          role_id: router.query.roleId,
          type: dataOne?.type,
          name: dataOne?.name,
          category_config,
          permissions: roleData.permissions.map((permission: string) => {
            return {
              permission: permission,
              type: PERMISSION_TYPE_LOCAL,
            };
          }),
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
        <Button onClick={handleSubmit(onSubmit)} buttonLoading={false}>
          Save
        </Button>
      </LastButtonWrapper>
    </Spin>
  );
};

export default TaskPermissions;
