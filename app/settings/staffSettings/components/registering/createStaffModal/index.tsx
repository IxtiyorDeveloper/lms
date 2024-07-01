import React, { useEffect, useState } from "react";
import {
  AntdModal,
  Button,
  DatePicker,
  Input,
  MySelect,
  UploadImage,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { Flex, ItemWrapper, Label, Title, Type, TypeWrapper } from "./style";
import { useFieldArray, useForm } from "react-hook-form";
import { useActivateStaff, useCreateStaff, useInitialData } from "hooks";
import { ALL_BRANCH, NO_BRANCH, WITH_BRANCH } from "constants/branch";
import { CreateStaffJobType } from "constants/settings";
import { toast } from "react-toastify";
import { types } from "./data";
import Buttons from "./buttons";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { ITypeStaffWorkingStatus } from "../../../../../../types/staffSettings";
import { useRouter } from "next/router";
import { validationErrorHandler } from "utils";
import { DeleteSvg, EyeSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";

const CreateStaffModal = () => {
  const [typeIndex, setTypeIndex] = useState(CreateStaffJobType.official);
  const { data: initialData } = useInitialData();

  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [disabledBranches, setDisabledBranches] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const branchOptions = initialData?.branches.map((branch) => {
    return { label: branch.name, value: branch.id };
  });

  const departmentOptions = initialData?.departments.map((branch) => {
    return { label: branch.name, value: branch.id };
  });

  const roleOptions = initialData?.roles.map((branch) => {
    return { label: branch.name, value: branch.id };
  });

  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    watch,
    setError,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "otherFiles",
  });

  const {
    staffCreate: { data, open },
  } = useSelector((store: IStore) => store.modals);

  const handleCancel = () => {
    reset();
    dispatch(
      toggleModal({
        key: "staffCreate",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const createStaff = useCreateStaff({
    onSuccess: () => {
      toast.success("Staff created");
      queryClient.invalidateQueries([queryKeys.registering_list_view]).then();
      handleCancel();
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        setError,
        showToast: false,
      });
    },
  });

  const activateStaff = useActivateStaff({
    onSuccess: () => {
      toast.success("Staff activated!");
      queryClient
        .invalidateQueries({
          queryKey: [queryKeys.assignment_list],
        })
        .then();
      handleCancel();
    },
    onError: (err) => {},
  });

  useEffect(() => {
    setValue("passport", data?.user?.passportFront);
    setValue("passport_back", data?.user?.passportBack);
  }, [data, open]);

  const userId = data?.userId;

  const onSubmit = (result: any) => {
    let baseObject = {
      passport_front_file_id:
        result?.passport?.file_storage_item_id || result?.passport,
      passport_back_file_id:
        result?.passport_back?.file_storage_item_id || result?.passport_back,
      job_type: +typeIndex,
      branch_type: +result?.branch_type,
      branch_ids: result?.branch_ids,
      role_id: +result?.role_id,
      shift_id: +result?.shift_id,
      department_id: result?.department_id,
      labor_contract_file_id: result?.labor_contract_file_id,
      username: result?.username,
      password: result?.password,
      other_file_ids: result?.otherFiles?.map((file: any) => file?.file),
    };

    let baseActive = {
      passport_front_file_id:
        result?.passport?.file_storage_item_id || result?.passport,
      passport_back_file_id:
        result?.passport_back?.file_storage_item_id || result?.passport_back,
      job_type: +typeIndex,
      branch_type: +result?.branch_type,
      branch_ids: result?.branch_ids,
      role_id: +result?.role_id,
      shift_id: +result?.shift_id,
      department_id: result?.department_id,
      labor_contract_file_id: result?.labor_contract_file_id,
      username: result?.username,
      password: result?.password,
      start_date: result?.start_date,
      other_file_ids: result?.otherFiles?.map((file: any) => file?.file),
    };

    if (typeIndex === CreateStaffJobType.official) {
      baseObject = {
        ...baseObject,
        job_application_file_id: result?.job_application_file_id,
        job_order_file_id: result?.job_order_file_id,
      } as any;

      baseActive = {
        ...baseActive,
        job_application_file_id: result?.job_application_file_id,
        job_order_file_id: result?.job_order_file_id,
      } as any;
    }

    if (typeIndex === CreateStaffJobType.selfEmployment) {
      baseObject = {
        ...baseObject,
        self_employment_file_id: result?.selfEmployment,
      } as any;
    }

    if (typeIndex === CreateStaffJobType.selfEmployment) {
      baseActive = {
        ...baseActive,
        self_employment_file_id: result?.selfEmployment,
      } as any;
    }

    if (Number(router.query?.status) === ITypeStaffWorkingStatus.ARCHIVED) {
      activateStaff.mutate({
        query_params: {
          id: userId,
        },
        body: baseActive,
      });
    } else {
      createStaff.mutate({
        query_params: {
          id: userId,
        },
        body: baseObject,
      });
    }
  };

  const handleOpenDocGenerate = (type: "ja" | "jo" | "lc") => {
    if (!!getValues("role_id")) {
      dispatch(
        toggleModal({
          key: "docGenerate",
          data: {
            data: {
              type,
              roleId: watch()?.role_id,
              passportNumber: data?.allData?.staff?.passport_number,
              passportGivenDate: data?.allData?.staff?.passport_given_date,
              passportExpireDate: data?.allData?.staff?.passport_expire_date,
              officialAddress: data?.allData?.staff?.official_address,
              passportGivenBy: data?.allData?.staff?.passport_given_by,
              director: initialData?.company?.detail?.director,
              fullName: `${data?.user?.userProfile?.firstname} ${
                data?.user?.userProfile?.lastname
              } ${
                data?.user?.userProfile?.middlename !== null
                  ? data?.user?.userProfile?.middlename
                  : ""
              }`,
              roleName: roleOptions?.filter(
                (opt) => opt.value === getValues("role_id")
              )[0]?.label,
            },
            open: true,
          },
        })
      );
    } else {
      toast.error("Role field is free!");
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "department_id") {
        setValue("role_id", undefined);
        setValue("shift_id", undefined);
      }

      if (name === "role_id") {
        setValue("shift_id", undefined);
      }

      if (type === "change" && name === "branch_type") {
        if (value?.branch_type === `${NO_BRANCH}`) {
          setDisabledBranches(true);
          setValue("branch_ids", undefined);
        }

        if (value?.branch_type === `${ALL_BRANCH}`) {
          setDisabledBranches(true);
          setValue(
            "branch_ids",
            branchOptions?.map((branch) => branch.value + "")
          );
        }

        if (value?.branch_type === `${WITH_BRANCH}`) {
          setDisabledBranches(false);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const profile = data?.user?.userProfile;
    setValue(
      "username",
      `${profile?.lastname.slice(0, 1)}.${profile?.firstname}`.toLowerCase()
    );
  }, [open, data]);

  return (
    <AntdModal width={580} open={open} onCancel={handleCancel} destroyOnClose>
      <Title>Create staff</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ItemWrapper>
          <Label>Work type</Label>
          <TypeWrapper>
            {initialData?.staffJobTypeList?.map((type, index) => {
              return (
                <Type
                  onClick={() => setTypeIndex(type.value)}
                  style={{
                    backgroundColor: types[index].background,
                    color: types[index].color,
                    opacity: typeIndex === type.value ? 1 : 0.5,
                  }}
                  key={type.value}
                >
                  {type.label}
                </Type>
              );
            })}
          </TypeWrapper>
        </ItemWrapper>
        <Flex>
          <ItemWrapper>
            <UploadImage
              accept={{
                "image/*": [],
                "application/pdf": [],
              }}
              height="70px"
              image={data?.user?.passportFront?.fileStorageItem?.full_url}
              frontDelete
              name="passport"
              clearError={clearErrors}
              control={control}
              setValue={setValue}
              label="Passport / ID Card"
            />
          </ItemWrapper>
          <ItemWrapper>
            <UploadImage
              image={data?.user?.passportBack?.fileStorageItem?.full_url}
              accept={{
                "image/*": [],
                "application/pdf": [".pdf"],
              }}
              frontDelete
              height="70px"
              clearError={clearErrors}
              name="passport_back"
              control={control}
              setValue={setValue}
              label="Passport / ID Card Back"
            />
          </ItemWrapper>
        </Flex>
        {typeIndex === CreateStaffJobType.official ? (
          <>
            <Flex>
              <ItemWrapper>
                <UploadImage
                  accept={{
                    "image/*": [],
                    "application/pdf": [".pdf"],
                  }}
                  frontDelete
                  height="70px"
                  name="job_application_file_id"
                  error={errors?.job_application_file_id?.message}
                  control={control}
                  clearError={clearErrors}
                  setValue={setValue}
                  label="Job Application"
                />
              </ItemWrapper>
              <ItemWrapper>
                <UploadImage
                  accept={{
                    "image/*": [],
                    "application/pdf": [".pdf"],
                  }}
                  frontDelete
                  height="70px"
                  error={errors?.job_order_file_id?.message}
                  name="job_order_file_id"
                  control={control}
                  clearError={clearErrors}
                  setValue={setValue}
                  label="Job Order"
                />
              </ItemWrapper>
            </Flex>
          </>
        ) : null}
        <Flex>
          <ItemWrapper>
            <UploadImage
              accept={{
                "image/*": [],
                "application/pdf": [".pdf"],
              }}
              frontDelete
              height="70px"
              name="labor_contract_file_id"
              control={control}
              setValue={setValue}
              clearError={clearErrors}
              error={errors?.labor_contract_file_id?.message}
              label="Labor Contract"
            />
          </ItemWrapper>
          {typeIndex === CreateStaffJobType.selfEmployment && (
            <ItemWrapper>
              <UploadImage
                accept={{
                  "image/*": [],
                  "application/pdf": [".pdf"],
                }}
                height="70px"
                name="selfEmployment"
                control={control}
                clearError={clearErrors}
                frontDelete
                setValue={setValue}
                label="Self Employment"
              />
            </ItemWrapper>
          )}
        </Flex>
        <Flex style={{ justifyContent: "flex-end", marginBottom: "10px" }}>
          <Button onClick={append}>+ Other file</Button>
        </Flex>
        {fields.map((fields, index) => {
          const a =
            watch()?.otherFiles?.length > 0 &&
            watch()?.otherFiles[index]?.fileStorageItem?.full_url;

          return (
            <ItemWrapper>
              <UploadImage
                accept={{
                  "image/*": [],
                  "application/pdf": [".pdf"],
                  "application/vnd.ms-excel": [".xls"],
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    [".xlsx"],
                  "audio/*": [],
                  "video/*": [],
                  "application/msword": [".doc"],
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    [".docx"],
                }}
                height="70px"
                image={a}
                name={`otherFiles[${index}].file`}
                control={control}
                clearError={clearErrors}
                frontDelete
                setValue={setValue}
                label={`Other file ${index + 1}`}
              />
              {index !== 0 && (
                <Flex
                  onClick={() => remove(index)}
                  style={{ justifyContent: "flex-end", marginTop: "5px" }}
                >
                  <DeleteSvg />
                </Flex>
              )}
            </ItemWrapper>
          );
        })}
        <ItemWrapper>
          <MySelect
            name="branch_type"
            control={control}
            label="Branch Type"
            placeholder="Select"
            error={errors?.branch_type?.message}
            options={[
              { label: "No branch", value: `${NO_BRANCH}` },
              { label: "All branch", value: `${ALL_BRANCH}` },
              { label: "With branch", value: `${WITH_BRANCH}` },
            ]}
          />
        </ItemWrapper>
        <ItemWrapper>
          <MySelect
            name="branch_ids"
            control={control}
            disabled={disabledBranches}
            label="Branch"
            mode="multiple"
            placeholder="Select"
            options={branchOptions}
          />
        </ItemWrapper>
        {Number(router.query?.status) === ITypeStaffWorkingStatus.ARCHIVED ? (
          <ItemWrapper>
            <DatePicker
              name="start_date"
              control={control}
              label="Start date"
              placeholder="Select date"
            />
          </ItemWrapper>
        ) : null}
        <ItemWrapper>
          <MySelect
            error={errors?.department_id?.message}
            name="department_id"
            control={control}
            onChange={(v) => {
              const filteredRoles = initialData?.roles?.filter(
                (role) => role.department_id === v
              );
              setRoles(
                filteredRoles?.map((branch) => {
                  return { label: branch.name, value: branch.id };
                }) as any
              );
              setValue("department_id", v);
              clearErrors("department_id");
            }}
            label="Department"
            placeholder="Select"
            options={departmentOptions}
          />
        </ItemWrapper>
        <ItemWrapper>
          <MySelect
            name="role_id"
            error={errors?.role_id?.message}
            control={control}
            label="Role"
            onChange={(v) => {
              const filteredShifts = initialData?.shifts?.filter(
                (role) => +role.rbac_role_id === +v
              );
              setShifts(
                filteredShifts?.map((shift) => {
                  return { label: shift.name, value: shift.id };
                }) as any
              );
              setValue("role_id", v);
            }}
            placeholder="Select"
            options={roles}
          />
        </ItemWrapper>
        <ItemWrapper>
          <MySelect
            name="shift_id"
            control={control}
            label="Shift"
            placeholder="Select"
            options={shifts}
          />
        </ItemWrapper>
        <ItemWrapper>
          <Input
            autoComplete="off"
            name="username"
            error={errors?.username?.message}
            control={control}
            label="Login"
            placeholder="Type here..."
          />
        </ItemWrapper>
        <ItemWrapper>
          <Input
            type="input"
            name="password"
            style={
              {
                ...(!showPassword ? { WebkitTextSecurity: "disc" } : {}),
              } as any
            }
            control={control}
            error={errors?.password?.message}
            label="Password"
            placeholder="Type here..."
            suffix={
              <EyeSvg
                onClick={() => setShowPassword(!showPassword)}
                color={
                  showPassword ? bgColors.sceptreBlue : bgColors.brotherBlue
                }
                className="pointer"
              />
            }
          />
        </ItemWrapper>
        <Buttons
          handleOpenDocGenerate={handleOpenDocGenerate}
          handleCancel={handleCancel}
          createStaff={createStaff}
          activateStaff={activateStaff}
          typeIndex={typeIndex}
        />
      </form>
    </AntdModal>
  );
};
export default CreateStaffModal;
