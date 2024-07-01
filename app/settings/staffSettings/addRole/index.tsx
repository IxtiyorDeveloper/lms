import React, { FC, useEffect, useMemo, useState } from "react";
import { CreateWrapper, CardWrapper, Flex, LastButtonWrapper } from "./style";
import {
  ActionModal,
  AntdTable,
  Button,
  DeleteSvg,
  ErrorLabel,
  Input,
  MySelect,
  PlusEx,
  UploadFile,
} from "components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateRoleSchema } from "validation/rbac";
import { bgColors } from "styles/theme";
import ShiftModal from "./components/shiftModal";
import { COLUMNS } from "./tableStr";
import {
  DIRECTOR_DEGREE,
  HEAD_DEGREE,
  STAFF_DEGREE,
} from "constants/department";
import moment from "moment";
import { minutesToHhmm } from "utils/toHourMinute";
import { useGetOneRole, useRoleUpdate, useSaveRole } from "hooks/useRole";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { SHIFT_BASED } from "constants/shift";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { DATE_FORMAT_HH_mm } from "constants/dates";
import { ROLE_DEFAULT_ROUTES, RbacRoleDocumentEnum } from "constants/role";
import RedBadgeTitle from "components/common/redBadgeTitle";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import ProjectTabs from "./components/tab";

export type ShiftDepartmentModal = "shiftCreateModal" | "deleteMethod";

const CreateRole: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = useForm<any>({
    resolver: yupResolver(CreateRoleSchema),
    defaultValues: {
      permissions: [],
    },
  });

  const {
    control: shiftControl,
    handleSubmit: shiftHandleSubmit,
    formState: { errors: shiftErrors },
    reset: shiftReset1,
    setError: setShiftError,
    watch: shiftWatch,
    setValue: setShiftValue,
    getValues,
  } = useForm();

  const {
    control: deleteControl,
    handleSubmit: deleteHandleSubmit,
    reset: deleteReset1,
  } = useForm();

  const save =
    router.query.type === "update"
      ? useRoleUpdate({
          onSuccess: () => {
            toast.success("Role update");
            queryClient.invalidateQueries({
              queryKey: [queryKeys.department_list],
            });
            // router.back();
          },
          onError: (err) => {
            validationErrorHandler({
              err,
              showToast: false,
              setError,
              formHookMainField: false,
            });
          },
        })
      : useSaveRole({
          onSuccess: () => {
            toast.success("Role saved");
            queryClient.invalidateQueries({
              queryKey: [queryKeys.department_list],
            });
            // router.back();
          },
          onError: (err) => {
            validationErrorHandler({
              err,
              showToast: false,
              setError,
              formHookMainField: false,
            });
          },
        });

  const onSubmitRole = (roleData: any) => {
    save.mutate({
      id: router.query["roleId"],
      department_id: router.query["dep_id"],
      degree: roleData.degree,
      name: roleData.name,
      default_route: roleData.default_route,
      privacy_policy_file_id: roleData.privacy_policy?.file_storage_item_id,
      rules_and_contracts_file_id:
        roleData.rules_and_contracts?.file_storage_item_id,
      shift_type: SHIFT_BASED,
      shifts: data.map((e: any) => {
        return {
          id: e.id || null,
          name: e.name,
          days: e.key,
        };
      }),
      // application_roles: roleData.application_roles,
      // permissions: roleData.permissions.map((permission: string) => {
      //   return {
      //     permission: permission,
      //     type: PERMISSION_TYPE_LOCAL,
      //   };
      // }),
    });
  };
  const onSubmit = (data: any) => {
    if (!data.shift_name) {
      setShiftError("shift_name", { message: "Shift name is required" });
    }
    let newData: any[];
    newData = [];
    for (let i = 0; i < 7; i++) {
      let key;
      let start_time;
      let m_start_time;
      let end_time;
      let m_end_time;
      if (data[`${i + 1}`]) {
        key = i + 1;
        if (!data[`pickerfrom${i}`]) {
          setShiftError(`pickerfrom${i}`, { message: "Time is required" });
        } else {
          start_time = data[`pickerfrom${i}`].format(DATE_FORMAT_HH_mm);
          m_start_time = moment(start_time, DATE_FORMAT_HH_mm);
        }
        if (!data[`pickerto${i}`]) {
          setShiftError(`pickerto${i}`, { message: "Time is required" });
        } else {
          end_time = data[`pickerto${i}`].format(DATE_FORMAT_HH_mm);
          m_end_time = moment(end_time, DATE_FORMAT_HH_mm);
        }
      }
      !!key &&
        !!start_time &&
        !!end_time &&
        newData.push({
          week_day: key,
          start_time,
          end_time,
          minutes: m_end_time && m_end_time.diff(m_start_time, "minutes"),
        });
    }

    if (!!data.shift_name) {
      if (newData.length > 0) {
        // @ts-ignore
        setData((prevState: any[]) => {
          let hours: number = 0;
          if (newData.length > 0) {
            newData.map((item) => {
              hours += item.minutes;
            });
          }
          hours -= newData.length * 60;
          if (data.type === "update") {
            return prevState.map((item) => {
              return item.token === data.token
                ? {
                    ...item,
                    name: data.shift_name,
                    working_days: newData.length,
                    working_hours: minutesToHhmm(hours),
                    action: "action",
                    key: newData,
                    id: item.id,
                  }
                : item;
            });
          } else
            return [
              ...prevState,
              {
                name: data.shift_name,
                working_days: newData.length,
                working_hours: minutesToHhmm(hours),
                action: "action",
                key: newData,
                token: Math.random(),
              },
            ];
        });
        shiftReset1();
        handleClose("shiftCreateModal");
      } else {
        setShiftError("times", { message: "Times are required" });
      }
    }
  };
  const [modals, setModals] = useState({
    shiftCreateModal: false,
    deleteMethod: {
      isOpen: false,
      id: "",
    },
  });

  const handleClose = (type: ShiftDepartmentModal) => {
    switch (type) {
      case "shiftCreateModal":
        shiftReset1();
        return setModals({
          ...modals,
          shiftCreateModal: false,
        });
      case "deleteMethod":
        return setModals({
          ...modals,
          deleteMethod: {
            isOpen: false,
            id: "",
          },
        });
    }
  };
  const handleOpen = (type: ShiftDepartmentModal, id?: number) => {
    switch (type) {
      case "shiftCreateModal":
        shiftReset1();
        return setModals({
          ...modals,
          shiftCreateModal: true,
        });
      case "deleteMethod":
        return setModals({
          ...modals,
          deleteMethod: {
            isOpen: true,
            id: JSON.stringify(id),
          },
        });
    }
  };

  const [data, setData] = useState([]);
  const onDeleteSubmit = () => {
    setData(
      data.filter((e) => {
        return JSON.stringify(e) !== modals.deleteMethod.id;
      })
    );
    handleClose("deleteMethod");
  };

  const { data: dataOne, isSuccess } = useGetOneRole({
    staffsGroupId: router.query?.["roleId"],
    type: router.query.type || "add",
  });

  const pp = dataOne?.documents?.find(
    (i) => i.type == RbacRoleDocumentEnum.PRIVACY_POLICY
  );
  const rc = dataOne?.documents?.find(
    (i) => i.type == RbacRoleDocumentEnum.RULES_AND_CONTRACTS
  );

  useEffect(() => {
    reset();
    shiftReset1();
    deleteReset1();
    if (isSuccess && router.query.type === "update") {
      setValue("name", dataOne?.name);
      setValue("degree", dataOne?.degree);
      setValue("default_route", `${dataOne?.default_route}`);
      setValue("privacy_policy", pp);
      setValue("rules_and_contracts", rc);

      setData(
        // @ts-ignore
        dataOne?.shifts.map((e) => {
          let minutes = 0;
          let key = e.days.map((item) => {
            let a = moment(item.end_time, DATE_FORMAT_HH_mm).diff(
              moment(item.start_time, DATE_FORMAT_HH_mm),
              "minutes"
            );
            minutes += a;
            return {
              week_day: item.week_day,
              start_time: item.start_time,
              end_time: item.end_time,
              minutes: a,
            };
          });
          return {
            name: e.name,
            id: e.id,
            working_days: e.days.length,
            working_hours: minutesToHhmm(minutes),
            action: "action",
            key,
            token: Math.random(),
          };
        })
      );
    }
    return () => {
      queryClient.invalidateQueries([queryKeys.role_one]);
      reset();
      shiftReset1();
      deleteReset1();
    };
  }, [dataOne?.permissions, router.query?.type]);

  const handleClickEditShift = (key: any) => {
    shiftReset1();
    handleOpen("shiftCreateModal");
    setShiftValue("shift_name", key.name);
    setShiftValue("type", "update");
    setShiftValue("token", key.token);
    setShiftValue("id", key.id);
    for (let i = 0; i < 6; i++) {
      setShiftValue(`${key.key[i]?.week_day}`, true);
      setShiftValue(
        `pickerfrom${key.key[i]?.week_day - 1}`,
        dayjs(key.key[i]?.start_time, DATE_FORMAT_HH_mm)
      );
      setShiftValue(
        `pickerto${key.key[i]?.week_day - 1}`,
        dayjs(key.key[i]?.end_time, DATE_FORMAT_HH_mm)
      );
    }
  };

  const onSuccess = ({ data, name }: { data: any; name: string }) => {
    setValue(name, {
      file_storage_item_id: data?.id,
      name: data?.name,
      full_url: data?.full_url,
    });
  };

  const ppFile = useMemo(() => {
    return router.query.type === "update"
      ? {
          file_storage_item_id: pp?.fileStorageItem?.id,
          name: pp?.fileStorageItem?.name,
          full_url: pp?.fileStorageItem?.full_url,
        }
      : undefined;
  }, [pp]);

  const rcFile = useMemo(() => {
    return router.query.type === "update"
      ? {
          file_storage_item_id: pp?.fileStorageItem?.id,
          name: rc?.fileStorageItem?.name,
          full_url: rc?.fileStorageItem?.full_url,
        }
      : undefined;
  }, [rc]);

  return (
    <CreateWrapper>
      <form onSubmit={handleSubmit(onSubmitRole)}>
        <CardWrapper>
          <div className="title">
            <RedBadgeTitle
              title={`${
                router.query.type === "update" ? "Update" : "Create"
              } role`}
            />
          </div>
          <Flex>
            <Input
              name="name"
              control={control}
              placeholder="Type here..."
              label="Name"
              error={errors?.name?.message}
            />
          </Flex>
          <Flex>
            <MySelect
              name="degree"
              control={control}
              placeholder="Select"
              label="Degree"
              options={[
                { label: "Director", value: DIRECTOR_DEGREE },
                { label: "Head", value: HEAD_DEGREE },
                { label: "Staff", value: STAFF_DEGREE },
              ]}
              error={errors?.degree?.message}
            />
          </Flex>
          <Flex>
            <MySelect
              name="default_route"
              control={control}
              placeholder="Select"
              label="Default route"
              options={ROLE_DEFAULT_ROUTES}
              error={errors?.default_route?.message}
            />
          </Flex>
          <Flex>
            <AntdTable
              columns={COLUMNS({ handleOpen, handleClickEditShift })}
              dataSource={data}
            />
          </Flex>

          <Flex>
            <UploadFile
              name="rules_and_contracts"
              label="Rules and contracts"
              control={control}
              setValue={setValue}
              error={errors?.rulesAndContracts?.message}
              onSuccess={(data) =>
                onSuccess({ data, name: "rules_and_contracts" })
              }
              file={rcFile}
              className="file-wrapper"
              text="Upload file"
              height="76px"
            />

            <UploadFile
              name="privacy_policy"
              label="Privacy police"
              control={control}
              setValue={setValue}
              error={errors?.privacyPolicy?.message}
              file={ppFile}
              className="file-wrapper"
              text="Upload file"
              height="76px"
              onSuccess={(data) => onSuccess({ data, name: "privacy_policy" })}
            />
          </Flex>
          <Button onClick={() => handleOpen("shiftCreateModal")}>
            <PlusEx /> &nbsp; Shifts
          </Button>
          <ErrorLabel error={errors?.shifts?.message} />
        </CardWrapper>
        <LastButtonWrapper>
          <Button type="submit" buttonLoading={save?.isLoading}>
            Save
          </Button>
        </LastButtonWrapper>

        {router.query.type == "update" && <ProjectTabs dataOne={dataOne} />}
      </form>
      <ShiftModal
        handleClose={() => handleClose("shiftCreateModal")}
        open={modals.shiftCreateModal}
        onSubmit={onSubmit}
        handleSubmit={shiftHandleSubmit}
        control={shiftControl}
        errors={shiftErrors}
        watch={shiftWatch}
        getValues={getValues}
        reset={shiftReset1}
      />
      <ActionModal
        handleSubmit={deleteHandleSubmit}
        handleClose={() => handleClose("deleteMethod")}
        open={modals.deleteMethod.isOpen}
        onSubmit={onDeleteSubmit}
        blurColor={bgColors.pop}
        label="Reason *"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1), inset 0px 4px 6px #F87C84"
        icon={<DeleteSvg width={50} height={50} />}
        text={
          <div>
            <p>Are you sure ?</p>
            <p>This property will be deleted for everyone</p>
          </div>
        }
        control={deleteControl}
      />
    </CreateWrapper>
  );
};

export default CreateRole;
