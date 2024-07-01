import React, { FC, useEffect } from "react";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { useLmsRbacSave, useRbacPermissions } from "hooks";
import Permissions from "../permissions";
import ApplicationTokens from "../applicationToken";
import { useForm } from "react-hook-form";
import { Button } from "components";
import { LastButtonWrapper } from "../../style";
import { PERMISSION_TYPE_LOCAL } from "constants/permissionTypes";
import { IRole } from "types";
import { funcCheckPermission, validationErrorHandler } from "utils";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PROJECT_LMS } from "../../../../../../constants";
import { checkCanEdit } from "../utils/checkCanEdit";

const LmsPermissions: FC<{ dataOne?: IRole }> = ({ dataOne }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { control, watch, handleSubmit, setError, setValue } = useForm();

  const { isLoading, data } = useRbacPermissions({
    query_params: {
      role_id: router.query.roleId,
    },
    project: PROJECT_LMS,
  });

  useEffect(() => {
    setValue(
      "permissions",
      dataOne?.permissions.map((e) => e.permission),
    );
    setValue(
      "application_roles",
      dataOne?.application_roles.map((e) => ({
        application_key: e.application_key,
        role: e.role,
      })),
    );
  }, []);

  const save = useLmsRbacSave({
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
      save.mutate({
        body: {
          role_id: router.query.roleId,
          application_roles: roleData.application_roles,
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
      <Permissions control={control} watch={watch} data={data} />
      <ApplicationTokens control={control} />
      <LastButtonWrapper>
        <Button onClick={handleSubmit(onSubmit)} buttonLoading={save.isLoading}>
          Save
        </Button>
      </LastButtonWrapper>
    </Spin>
  );
};

export default LmsPermissions;
