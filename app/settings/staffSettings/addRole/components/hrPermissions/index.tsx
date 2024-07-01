import React, { FC, useEffect } from "react";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { useHrRbacSave, useRbacPermissions } from "hooks";
import RbacRoleTable from "./components/table";
import Permissions from "../permissions";
import { useForm } from "react-hook-form";
import { LastButtonWrapper } from "../../style";
import { Button } from "components";
import { IRole } from "types";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { groupBy, map, uniqBy } from "lodash";
import { PERMISSION_TYPE_LOCAL } from "constants/permissionTypes";
import { checkCanEdit } from "../utils/checkCanEdit";

const HrPermissions: FC<{ dataOne?: IRole }> = ({ dataOne }) => {
  const router = useRouter();
  const { control, watch, setValue, setError, getValues, handleSubmit } =
    useForm();

  const { isLoading, data } = useRbacPermissions({
    query_params: {
      role_id: router.query.roleId,
    },
    project: "hr-v2",
  });

  useEffect(() => {
    setValue(
      "permissions",
      data?.permissions.map((e) => e.permission),
    );
  }, [data]);

  const save = useHrRbacSave({
    onSuccess: () => {
      toast.success("Saved");
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
        if (key.includes("stage_")) {
          let stage = key.replace("stage_", "");
          const stages: any = [];
          map(value, (obj, key1) => {
            if (key1.includes("values_")) {
              let id = key1.replace("values_", "");
              map(obj, (bool, key2) => {
                if (key2.includes("id")) {
                  let stageId = key2.replace("id_", "");
                  stages.push({
                    id: stageId,
                    vacancy_id: id,
                    stage,
                    is_checked: bool ? "1" : "0",
                  });
                }
              });
              result.push(...stages);
            }
          });
        }
      });
      save.mutate({
        body: {
          role_id: router.query.roleId,
          type: dataOne?.type,
          name: dataOne?.name,
          vacancyList: map(
            groupBy(
              uniqBy(result, (e) => e?.id),
              "vacancy_id",
            ),
            (value, key) => {
              return {
                id: key,
                vacancyCandidateStages: value,
              };
            },
          ),
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

export default HrPermissions;
