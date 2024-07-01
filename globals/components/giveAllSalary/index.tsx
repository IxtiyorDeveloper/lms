import React from "react";
import { AntdModal, Button, Input } from "components";
import { useForm } from "react-hook-form";
import { useGiveAllSalary } from "hooks";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import {
  Buttons,
  Content,
  Line,
  SubContent,
  WarningWrapper,
  Wrapper,
} from "./style";
import { bgColors } from "styles/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationErrorHandler } from "utils";
import { GiveAllSalary } from "validation/finance/salary";
import { getMonthAndYear } from "utils/getFormattedDate";
import { ISalaryMain } from "types/finance/salary";
import WarningComponent from "../../../components/common/warningComponent";

const GiveAllSalaryModal = () => {
  const dispatch = useDispatch();

  const { month, year } = getMonthAndYear();

  const {
    giveAllSalary: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const salaryMain: ISalaryMain[] | undefined = data?.main;
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "giveAllSalary",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const giveAllSalary = useGiveAllSalary({
    onSuccess: () => {
      toast.success("Added to queue. Please wait and refresh later");
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string }>({
    resolver: yupResolver(GiveAllSalary),
  });

  const onSubmit = (data: { password: string }) => {
    let assignment_ids: any = [];
    if (salaryMain) {
      for (let i = 0; i < salaryMain?.length; i++) {
        const assignments = salaryMain?.[i]?.assignments;
        for (let j = 0; j < assignments?.length; j++) {
          if (!assignments[j]?.isGiven)
            assignment_ids = [...assignment_ids, assignments[j]?.id];
        }
      }
    }
    giveAllSalary.mutate({
      body: {
        assignment_ids,
        password: data?.password,
        month,
        year,
      },
    });
  };

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          {/*<WarningWrapper>*/}
          {/*  <div className="circle">*/}
          {/*    <XMoreInfoIcon color={bgColors.white} />*/}
          {/*  </div>*/}
          {/*  <p className="text">*/}
          {/*    You must confirm this action with your password*/}
          {/*  </p>*/}
          {/*</WarningWrapper>*/}
          <WarningComponent text="You must confirm this action with your password" />
          <Line />
          <Content>
            <Input
              label="Password"
              name="password"
              control={control}
              placeholder="Type here ..."
              rows={5}
              error={errors?.password?.message}
              type="password"
            />
          </Content>
          <Buttons>
            <SubContent>
              <Button
                className="cancel"
                onClick={handleClose}
                bgColor={bgColors.whiteSmoke}
                style={{ width: "100%" }}
              >
                Cancel
              </Button>
              <Button
                style={{ width: "100%" }}
                className="save"
                type="submit"
                buttonLoading={giveAllSalary?.isLoading}
              >
                Confirm action
              </Button>
            </SubContent>
          </Buttons>
        </Wrapper>
      </form>
    </AntdModal>
  );
};

export default GiveAllSalaryModal;
