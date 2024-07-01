import React, { useState } from "react";
import { Button, DatePicker, MySelect, UploadImage } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import {
  AntdModalWrapper,
  ButtonGroup,
  ButtonWrapper,
  DateInfo,
  Flex,
  Info,
  ItemWrapper,
  ModalHeader,
  Title,
} from "./style";
import { HealthMedicineSvg } from "@jasurbekyuldashov/lms-web-icons";
import moment from "moment";
import { useForm } from "react-hook-form";
import { CreateStaffJobType } from "constants/settings";
import { toast } from "react-toastify";
import { useInitialData, useReposition } from "hooks";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import UserDetails from "../userDetails";
import { ALL_BRANCH, NO_BRANCH, WITH_BRANCH } from "constants/branch";
import dayjs from "dayjs";

const RepositionModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [roles, setRoles] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roleType, setRoleType] = useState({
    role1: "official",
    role2: "",
  });
  const { data: initialData } = useInitialData();

  const {
    repositionStaff: { data, open },
  } = useSelector((store: IStore) => store.modals);

  const { control, handleSubmit, setValue, reset, clearErrors } = useForm();

  const handleClose = () => {
    setRoleType({ role1: "", role2: "" });
    reset();
    dispatch(
      toggleModal({
        key: "repositionStaff",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const handleReposition = useReposition({
    onSuccess: () => {
      toast.success("Successfully repositioned!");
      queryClient.invalidateQueries([queryKeys.assignment_list]).then();
      queryClient.invalidateQueries([queryKeys.role_one]).then();
      handleClose();
    },
    onError: (e: any) => {},
  });

  /**
   * Bu submit qilishda 3 xil rolega qarab submit qiladi.
   * Misol uchun bizda officialdan non officialga o'tayotgan bo'lsa
   * unda bizga dismissal fayllar kerak boshqa xolatlarda esa kerak emas va hkz
   * **/
  const onSubmit = (result: any) => {
    let dataA = {
      job_application_file_id: undefined,
      job_order_file_id: undefined,
      dismissal_application_file_id: undefined,
      dismissal_order_file_id: undefined,
      job_reposition_order_file_id: undefined,
      self_employment_file_id: undefined,
      job_type: roleType?.role2,
      branch_type: result?.branchType,
      branch_ids: result?.branchIds?.map((n: string) => +n),
      role_id: result?.roleId,
      shift_id: result?.shiftId,
      department_id: result?.departmentId,
      labor_contract_file_id: result?.laborContractFile,
      // start_date: dayjs().format("YYYY-MM-DD"),
      start_date: result?.startDate,
      is_rehired: result?.refreshHireDate,
    };

    if (
      +roleType.role1 !== CreateStaffJobType.official &&
      +roleType.role2 === CreateStaffJobType.official
    ) {
      dataA.job_application_file_id = result?.jobApplicationFile as any;
      dataA.job_order_file_id = result?.jobOrderFile as any;
    }

    if (
      +roleType.role1 === CreateStaffJobType.official &&
      +roleType.role2 !== CreateStaffJobType.official
    ) {
      dataA.dismissal_application_file_id =
        result?.dismissalApplicationFile as any;
      dataA.dismissal_order_file_id = result?.dismissalOrderFile as any;
    }

    if (+roleType.role2 === CreateStaffJobType.selfEmployment) {
      dataA.self_employment_file_id = result?.certificateFileId as any;
    }

    if (
      +roleType.role1 === CreateStaffJobType.official &&
      +roleType.role2 === CreateStaffJobType.official
    ) {
      dataA.job_reposition_order_file_id =
        result?.jobOrderRepositionFile as any;
    }

    handleReposition.mutate({
      query_params: { id: data?.user_id },
      body: {
        ...dataA,
      },
    });
  };

  const branchOptions = initialData?.branches.map((branch) => {
    return { label: branch.name, value: branch.id };
  });

  const departmentOptions = initialData?.departments.map((branch) => {
    return { label: branch.name, value: branch.id };
  });

  const handleOpenDocGenerate = (
    type: "ja" | "jo" | "da" | "do" | "jor" | "lc"
  ) => {
    const passportNumber = data?.staff?.passport_number;
    const passportGivenDate = data?.staff?.passport_given_date;
    const passportExpireDate = data?.staff?.passport_expire_date;
    const officialAddress = data?.staff?.official_address;
    const passportGivenBy = data?.staff?.passport_given_by;

    if (type === "da" || type === "do") {
      dispatch(
        toggleModal({
          key: "dismissDocGenerate",
          data: {
            data: {
              ...data,
              fullName,
              type,
              roleName,
              roleId,
              passportNumber,
              passportGivenDate,
              passportExpireDate,
              officialAddress,
              passportGivenBy,
            },
            open: true,
          },
        })
      );
    } else {
      dispatch(
        toggleModal({
          key: "docGenerate",
          data: {
            data: {
              ...data,
              fullName,
              type,
              roleName,
              roleId,
              passportNumber,
              passportGivenDate,
              passportExpireDate,
              officialAddress,
              passportGivenBy,
            },
            open: true,
          },
        })
      );
    }
  };

  const fullName = `${data?.user?.userProfile?.firstname} ${data?.user?.userProfile?.lastname}`;
  const hiredDate = moment(data?.staff?.hired_date).format("DD MMMM YYYY");

  return (
    <AntdModalWrapper
      padding="0"
      width={600}
      onCancel={handleClose}
      open={open}
    >
      <ModalHeader>
        <Title>Reposition</Title>
        <DateInfo>
          <HealthMedicineSvg />
          <Info>H/D: {hiredDate}</Info>
        </DateInfo>
      </ModalHeader>
      <UserDetails
        data={data}
        type="reposition"
        roleType={roleType}
        setRoleType={setRoleType}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ItemWrapper>
          <MySelect
            label="Department"
            name="departmentId"
            control={control}
            onChange={(v) => {
              setValue("roleId", undefined);
              const filteredRoles = initialData?.roles?.filter(
                (role) => role.department_id === v
              );
              setRoles(
                filteredRoles?.map((branch) => {
                  return { label: branch.name, value: branch.id };
                }) as any
              );
              setValue("departmentId", v);
            }}
            placeholder="Select"
            options={departmentOptions}
          />
        </ItemWrapper>
        <ItemWrapper>
          <MySelect
            label="Role"
            name="roleId"
            control={control}
            onChange={(v) => {
              setValue("shiftId", undefined);
              const filteredShifts = initialData?.shifts?.filter(
                (role) => +role.rbac_role_id === +v
              );
              roles?.map((role: any) => {
                if (role.value === v) {
                  setRoleName(role.label);
                  setRoleId(role.value);
                }
              });
              setShifts(
                filteredShifts?.map((shift) => {
                  return { label: shift.name, value: shift.id };
                }) as any
              );
              setValue("roleId", v);
            }}
            placeholder="Select"
            options={roles}
          />
        </ItemWrapper>
        <ItemWrapper>
          <MySelect
            label="Shift"
            name="shiftId"
            control={control}
            placeholder="Select"
            options={shifts}
          />
        </ItemWrapper>
        <ItemWrapper>
          <MySelect
            label="Branch type"
            name="branchType"
            control={control}
            placeholder="Select"
            options={[
              { label: "No branch", value: `${NO_BRANCH}` },
              { label: "All branch", value: `${ALL_BRANCH}` },
              { label: "With branch", value: `${WITH_BRANCH}` },
            ]}
          />
        </ItemWrapper>
        <ItemWrapper>
          <MySelect
            label="Branch(es)"
            name="branchIds"
            mode="multiple"
            control={control}
            placeholder="Select"
            options={branchOptions}
          />
        </ItemWrapper>
        <ItemWrapper>
          <DatePicker
            label="Start date"
            name="startDate"
            control={control}
            placeholder="Select"
          />
        </ItemWrapper>
        <ItemWrapper>
          <MySelect
            label="Refresh hire date"
            name="refreshHireDate"
            control={control}
            options={[
              { label: "Yes", value: 1 },
              { label: "No", value: 2 },
            ]}
            placeholder="Select"
          />
        </ItemWrapper>
        {+roleType.role1 === CreateStaffJobType.official &&
        +roleType.role2 !== CreateStaffJobType.official ? (
          <Flex>
            <ItemWrapper className="file-item">
              <UploadImage
                frontDelete
                height="90px"
                accept={{
                  "image/*": [],
                  "application/pdf": [".pdf"],
                }}
                name="dismissalApplicationFile"
                control={control}
                setValue={setValue}
                label="Dismissial Application"
              />
            </ItemWrapper>
            <ItemWrapper className="file-item">
              <UploadImage
                frontDelete
                height="90px"
                accept={{
                  "image/*": [],
                  "application/pdf": [".pdf"],
                }}
                name="dismissalOrderFile"
                control={control}
                setValue={setValue}
                label="Dismissial Order"
              />
            </ItemWrapper>
          </Flex>
        ) : null}
        {+roleType.role1 === CreateStaffJobType.official &&
        +roleType.role2 === CreateStaffJobType.official ? (
          <Flex>
            <ItemWrapper className="file-item">
              <UploadImage
                frontDelete
                height="90px"
                accept={{
                  "image/*": [],
                  "application/pdf": [".pdf"],
                }}
                name="jobOrderRepositionFile"
                control={control}
                setValue={setValue}
                label="Job Order Reposition"
              />
            </ItemWrapper>
          </Flex>
        ) : null}
        {+roleType.role1 !== CreateStaffJobType.official &&
        +roleType.role2 === CreateStaffJobType.official ? (
          <Flex>
            <ItemWrapper className="file-item">
              <UploadImage
                frontDelete
                height="90px"
                accept={{
                  "image/*": [],
                  "application/pdf": [".pdf"],
                }}
                name="jobApplicationFile"
                control={control}
                setValue={setValue}
                label="Job Application"
              />
            </ItemWrapper>
            <ItemWrapper className="file-item">
              <UploadImage
                frontDelete
                height="90px"
                accept={{
                  "image/*": [],
                  "application/pdf": [".pdf"],
                }}
                name="jobOrderFile"
                control={control}
                setValue={setValue}
                label="Job Order"
              />
            </ItemWrapper>
          </Flex>
        ) : null}
        {+roleType.role2 === CreateStaffJobType.selfEmployment ? (
          <ItemWrapper>
            <UploadImage
              frontDelete
              height="90px"
              accept={{
                "image/*": [],
                "application/pdf": [".pdf"],
              }}
              name="certificateFileId"
              control={control}
              setValue={setValue}
              label="Upload Certificate"
            />
          </ItemWrapper>
        ) : null}
        <ItemWrapper>
          <UploadImage
            frontDelete
            height="90px"
            accept={{
              "image/*": [],
              "application/pdf": [".pdf"],
            }}
            name="laborContractFile"
            control={control}
            clearError={clearErrors}
            setValue={setValue}
            label="Labor contract"
          />
        </ItemWrapper>
        <ButtonWrapper>
          <ButtonGroup>
            <>
              {+roleType.role1 === CreateStaffJobType.official &&
              +roleType.role2 === CreateStaffJobType.official ? (
                <Button
                  onClick={() => handleOpenDocGenerate("jor")}
                  className="btn-secondary"
                >
                  Generate (JOR)
                </Button>
              ) : null}
              {data?.staff?.job_type === CreateStaffJobType.official &&
              +roleType.role2 === CreateStaffJobType.nonOfficial ? (
                <>
                  <Button
                    onClick={() => handleOpenDocGenerate("da")}
                    className="btn-secondary"
                  >
                    Generate (DA)
                  </Button>
                  <Button
                    onClick={() => handleOpenDocGenerate("do")}
                    className="btn-secondary"
                  >
                    Generate (DO)
                  </Button>
                </>
              ) : null}
              {data?.staff?.job_type === CreateStaffJobType.official &&
              +roleType.role2 === CreateStaffJobType.selfEmployment ? (
                <>
                  <Button
                    onClick={() => handleOpenDocGenerate("da")}
                    className="btn-secondary"
                  >
                    Generate (DA)
                  </Button>
                  <Button
                    onClick={() => handleOpenDocGenerate("do")}
                    className="btn-secondary"
                  >
                    Generate (DO)
                  </Button>
                </>
              ) : null}
              {+roleType.role1 !== CreateStaffJobType.official &&
              +roleType.role2 === CreateStaffJobType.official ? (
                <>
                  <Button
                    onClick={() => handleOpenDocGenerate("ja")}
                    className="btn-secondary"
                  >
                    Generate (JA)
                  </Button>
                  <Button
                    onClick={() => handleOpenDocGenerate("jo")}
                    className="btn-secondary"
                  >
                    Generate (JO)
                  </Button>
                </>
              ) : null}
              <Button
                onClick={() => handleOpenDocGenerate("lc")}
                className="btn-secondary"
              >
                Generate (LC)
              </Button>
            </>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={handleClose} className="btn-secondary">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </ButtonGroup>
        </ButtonWrapper>
      </form>
    </AntdModalWrapper>
  );
};

export default RepositionModal;
