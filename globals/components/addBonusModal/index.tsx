import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  AntdModal,
  Button,
  CircleImage,
  Input,
  InputNumber,
  MySelect,
} from "components";
import {
  ButtonWrapper,
  FormWrapper,
  ModalTitle,
  PersonalInfo,
  PhotoWrapper,
  UserInfo,
  Wrapper,
} from "./style";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useCreateSalaryComponent } from "hooks";
import { SalaryEnums, TAssignment } from "types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { IStore, setSalary, toggleModal } from "store";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddBonusInSalary } from "validation/finance/salary";
import { addSalaryComponent } from "utils/updateSalaryInfo";
import { validationErrorHandler } from "utils";
import { filterDuplicate } from "utils/filterDuplicate";
import { IRestructuredSalary, ISalaryMain } from "types/finance/salary";
import { joinRoles } from "./utils/joinRoles";
import { expand } from "constants/finance/salary";

const AddBonusModal = () => {
  const { data: mainSalary } = useSelector((state: IStore) => state.salary);

  const [assignment, setAssignment] = useState<{
    full_name: string;
    total_salary: number | string;
    role: string;
    image: any;
  }>({
    full_name: "",
    total_salary: 0,
    role: "",
    image: undefined,
  });

  const dispatch = useDispatch();
  const {
    addBonus: { data: reduxData, open },
  } = useSelector((state: IStore) => state.modals);

  const createSalaryComponent = useCreateSalaryComponent({
    onSuccess: () => {
      // queryClient.invalidateQueries(["admin-finance-salary-main-index"]);
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddBonusInSalary),
  });

  const handleClose = () => {
    reset({});
    setAssignment({
      full_name: "",
      total_salary: 0,
      role: "",
      image: undefined,
    });
    dispatch(
      toggleModal({
        key: "addBonus",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const makeOptions = (arr?: TAssignment[] | undefined) => {
    return arr?.map((item) => {
      const name = item?.receiver?.userProfile?.firstname
        ? item?.receiver?.userProfile?.firstname +
          " " +
          item?.receiver?.userProfile?.lastname
        : "no name";
      return {
        value: item?.id?.toString(),
        id: item?.id?.toString(),
        label: name,
      };
    });
  };

  const makeDepartments = (arr?: IRestructuredSalary[]) => {
    return arr?.map((item) => {
      const name = item?.name;
      return {
        value: item?.id,
        label: name,
      };
    });
  };

  const makeRoles = (arr?: ISalaryMain[] | undefined) => {
    return arr?.map((item) => {
      const name = item?.role?.name;
      return {
        value: item?.role?.id,
        label: name,
      };
    });
  };

  const restructuredSalary: IRestructuredSalary[] | undefined = useMemo(() => {
    let d: any = [];
    let sidebar: any = [];
    if (mainSalary) {
      for (let i = 0; i < mainSalary?.length; i++) {
        d = [...d, mainSalary[i]?.department];
      }
      const temp = filterDuplicate(d);
      for (let i = 0; i < temp?.length; i++) {
        const children = mainSalary?.filter(
          (p) => p?.department?.id === temp[i]?.id,
        );
        const childrenRoles = joinRoles({ children });
        sidebar = [
          ...sidebar,
          {
            ...temp[i],
            num: mainSalary
              ?.filter((p) => p?.department?.id === temp[i]?.id)
              ?.reduce((acc, curr) => {
                return acc + curr?.assignments?.length;
              }, 0),
            children: childrenRoles,
          },
        ];
      }
      return sidebar;
    }
  }, [mainSalary]);

  const roles = restructuredSalary?.find(
    (r) => r.id == watch("department"),
  )?.children;

  const assignments = roles?.find(
    (a) => a.role.id == watch("role"),
  )?.assignments;

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "department" && type === "change") {
        setValue("role", undefined);
        setValue("staff", undefined);
      }
      if (name === "role" && type === "change") {
        setValue("staff", undefined);
      }
      if (name === "staff" && type === "change") {
        const assignment = assignments?.find(
          (assign) => assign.id == value.staff,
        );
        setAssignment({
          full_name: assignment?.receiver?.userProfile?.firstname
            ? assignment?.receiver?.userProfile?.firstname +
              " " +
              assignment?.receiver?.userProfile?.lastname
            : "no name",
          total_salary: assignment?.total_salary ?? 0,
          role:
            roles?.find((role) => role.role.id == watch("role"))?.role?.name ??
            "",
          image: assignment?.receiver?.userProfile?.avatar,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, assignments, roles]);

  const onSubmit = (data: any) => {
    createSalaryComponent.mutate(
      {
        query_params: {
          salary_id: data?.staff,
          expand,
        },
        body: {
          type: SalaryEnums.BONUS,
          description: data?.description,
          value: data?.amount,
        },
      },
      {
        onSuccess: (result) => {
          handleClose();
          dispatch(
            setSalary(
              addSalaryComponent({
                assignmentId: assignments?.find(
                  (assigment) => assigment.id == data?.staff,
                )?.id,
                component: result,
                mainSalary,
              }),
            ),
          );
          toast.success("Success");
          reset({});
        },
      },
    );
  };

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
    >
      <ModalTitle>Add Bonus</ModalTitle>
      <UserInfo>
        <PhotoWrapper>
          <CircleImage src={assignment.image} width={80} height={80} />
        </PhotoWrapper>
        <PersonalInfo>
          <p>{assignment.full_name}</p>
          <p>{toCurrencyFormat(+assignment.total_salary)}</p>
          <p>{assignment.role ?? "-"}</p>
        </PersonalInfo>
      </UserInfo>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <Wrapper>
            <MySelect
              name="department"
              control={control}
              label="Department"
              options={makeDepartments(restructuredSalary)}
              error={errors?.department?.message}
            />
          </Wrapper>
          <Wrapper>
            <MySelect
              disabled={!watch("department")}
              name="role"
              control={control}
              label="Role"
              error={errors?.role?.message}
              options={makeRoles(roles)}
            />
          </Wrapper>
        </FormWrapper>
        <Wrapper paddingX={20}>
          <MySelect
            disabled={!watch("role")}
            name="staff"
            control={control}
            label="Staff"
            error={errors?.staff?.message}
            options={makeOptions(assignments)}
          />
        </Wrapper>
        <FormWrapper>
          <Wrapper>
            <InputNumber
              name="amount"
              label="Amount"
              control={control}
              suffix={<div className="suffix">UZS</div>}
              className="currency"
              error={errors?.amount?.message}
            />
          </Wrapper>
        </FormWrapper>
        <FormWrapper>
          <Wrapper>
            <Input
              name="description"
              label="Description"
              type="textarea"
              placeholder="Type here..."
              rows={5}
              control={control}
              className="currency"
              error={errors?.description?.message}
            />
          </Wrapper>
        </FormWrapper>
        <ButtonWrapper>
          <Button
            onClick={handleClose}
            textColor={textColors.yourShadow}
            bgColor={bgColors.wildSand}
          >
            Cancel
          </Button>
          <Button type="submit" buttonLoading={createSalaryComponent.isLoading}>
            Save
          </Button>
        </ButtonWrapper>
      </form>
    </AntdModal>
  );
};

export default AddBonusModal;
