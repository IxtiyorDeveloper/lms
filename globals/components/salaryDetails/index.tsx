import * as React from "react";
import { AntdModal, Button, CircleImage, Staff } from "components";
import {
  ModalTitle,
  ButtonWrapper,
  UserInfo,
  PersonalInfo,
  PhotoWrapper,
  Flex,
  List,
} from "./style";
import { bgColors, textColors } from "styles/theme";
import { Spin, Tooltip } from "antd";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { useDispatch, useSelector } from "react-redux";
import { IStore, setSalary, toggleModal } from "store";
import { SalaryEnums, TAssignment } from "types";
import { useGiveSalary } from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { giveSalaryClient } from "utils/updateSalaryInfo";
import { ISalaryMain } from "../../../types/finance/salary";

const SalaryDetailsModal = () => {
  const dispatch = useDispatch();
  const {
    salaryDetails: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const copiedData: TAssignment = data?.row as any;

  const roleData: ISalaryMain = data?.data;

  const { data: mainSalary } = useSelector((state: IStore) => state.salary);
  const handleCloseAndDispatch = async () => {
    dispatch(
      setSalary(
        giveSalaryClient({
          assignmentId: copiedData?.id,
          mainSalary,
        }),
      ),
    );
  };
  const giveSalary = useGiveSalary({
    onSuccess: async () => {
      await toast.success("Success");
      await handleCloseAndDispatch();
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "salaryDetails",
        data: {
          data: {
            row: copiedData,
          },
          open: false,
        },
      }),
    );
  };

  const agg = (data as { row: TAssignment })?.row?.salaryComponents;

  const fixed = agg?.filter((item) => item.type === SalaryEnums.FIXED_SALARY);
  const kpi = agg?.filter((item) => item.type === SalaryEnums.KPI);
  const bonus = agg?.filter((item) => item.type === SalaryEnums.BONUS);

  const actualSalary = (data as { row: TAssignment })?.row;

  const full_name = copiedData?.receiver?.userProfile?.firstname
    ? copiedData?.receiver?.userProfile?.firstname +
      " " +
      copiedData?.receiver?.userProfile?.lastname
    : "-";
  const image = copiedData?.receiver?.userProfile?.avatar;
  const handleGive = () => {
    handleClose();
    giveSalary.mutate({
      query_params: {
        id: copiedData?.id,
      },
    });
  };
  const department_name = roleData?.department?.name;

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
    >
      <Spin spinning={false}>
        <ModalTitle>Salary Details</ModalTitle>
        <Flex>
          <UserInfo>
            <PhotoWrapper>
              <CircleImage src={image} width={80} height={80} />
            </PhotoWrapper>
            <PersonalInfo>
              <p>{full_name}</p>
              <p>{roleData?.role?.name}</p>
            </PersonalInfo>
          </UserInfo>
          <div className="department">
            <Staff color={textColors.yourShadow} />
            <Tooltip destroyTooltipOnHide title={department_name}>
              <p className="d_name">{department_name}</p>
            </Tooltip>
          </div>
        </Flex>
        <List>
          <ul>
            <li className="main">
              <span className="title">Total Salary</span>
              <span className="grotesk">
                {toCurrencyFormat(+actualSalary?.total_salary)}
              </span>
            </li>
            <li>
              <span className="title-l">Fixed</span>
              <span className="grotesk">
                {" "}
                {toCurrencyFormat(
                  fixed?.reduce((acc, curr) => {
                    return acc + curr?.value;
                  }, 0),
                )}
              </span>
            </li>
            <li className="kpi">
              <span className="title-l">KPI</span>
              <span className="grotesk">
                {" "}
                {toCurrencyFormat(
                  kpi?.reduce((acc, curr) => {
                    return acc + curr?.value;
                  }, 0),
                )}
              </span>
            </li>
            <li>
              <span className="title-l">Bonus</span>
              <span className="grotesk">
                {" "}
                {toCurrencyFormat(
                  bonus?.reduce((acc, curr) => {
                    return acc + curr?.value;
                  }, 0),
                )}
              </span>
            </li>
            <li className="penalty">
              <span className="title-l">Penalty</span>
              <span className="grotesk">
                {!!actualSalary?.penalty
                  ? `-${toCurrencyFormat(actualSalary?.penalty)}`
                  : toCurrencyFormat(0)}
              </span>
            </li>
            <li>
              <span className="title-l">Avans</span>
              <span className="grotesk">
                {toCurrencyFormat(+actualSalary?.avans)}
              </span>
            </li>
            <li>
              <span className="title-l">Card</span>
              <span className="grotesk">
                {toCurrencyFormat(+actualSalary?.card)}
              </span>
            </li>
            <li>
              <span className="title-l">Cash</span>
              <span className="grotesk">
                {toCurrencyFormat(+actualSalary?.cash)}
              </span>
            </li>
          </ul>
        </List>
        <ButtonWrapper>
          <Button
            onClick={handleClose}
            textColor={textColors.yourShadow}
            bgColor={bgColors.wildSand}
          >
            Cancel
          </Button>
          <Button
            textColor={textColors.white}
            bgColor={bgColors.midori}
            type="submit"
            buttonLoading={giveSalary.isLoading}
            onClick={() => handleGive()}
          >
            Give Salary
          </Button>
        </ButtonWrapper>
      </Spin>
    </AntdModal>
  );
};

export default SalaryDetailsModal;
