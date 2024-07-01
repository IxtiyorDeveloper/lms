import React from "react";
import { Button, DatePicker, Input, UploadImage } from "components";
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
import { useDismissStaff } from "hooks";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import UserDetails from "../userDetails";

const DismissModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    dismissStaff: { data, open },
  } = useSelector((store: IStore) => store.modals);

  const { control, handleSubmit, setValue, reset } = useForm();

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "dismissStaff",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const handleDismiss = useDismissStaff({
    onSuccess: () => {
      toast.success("Successfully dismissed!");
      queryClient.invalidateQueries([queryKeys.assignment_list]).then();
      handleClose();
    },
    onError: (e: any) => {},
  });

  const onSubmit = (result: any) => {
    handleDismiss.mutate({
      query_params: { id: data?.user?.id },
      body: {
        reason: result?.reason,
        stopping_date: moment(new Date(result?.stoppingDate)).format(
          "DD-MM-YYYY"
        ),
        dismissal_application_file_id: result?.dismissalApplicationFile,
        dismissal_order_file_id: result?.dismissalOrderFile,
      },
    });
  };

  const handleOpenDocGenerate = (type: "da" | "do") => {
    dispatch(
      toggleModal({
        key: "dismissDocGenerate",
        data: {
          data: { ...data, fullName, type },
          open: true,
        },
      })
    );
  };

  const fullName = `${data?.user?.userProfile?.firstname} ${data?.user?.userProfile?.lastname}`;
  const hiredDate = moment(data?.staff?.hired_date).format("DD MMMM YYYY");

  return (
    <AntdModalWrapper
      padding="0"
      width={520}
      onCancel={handleClose}
      open={open}
    >
      <ModalHeader>
        <Title>Dismissal staff</Title>
        <DateInfo>
          <HealthMedicineSvg />
          <Info>H/D: {hiredDate}</Info>
        </DateInfo>
      </ModalHeader>
      <UserDetails data={data} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ItemWrapper>
          <DatePicker
            label="Stopping date"
            name="stoppingDate"
            control={control}
            placeholder="Select"
          />
        </ItemWrapper>
        <ItemWrapper>
          <Input
            label="Reason"
            name="reason"
            control={control}
            placeholder="Type here..."
            type="textarea"
            rows={3}
          />
        </ItemWrapper>
        {data?.staff?.job_type === null ||
        data?.staff?.job_type === CreateStaffJobType.official ? (
          <Flex className="last">
            <ItemWrapper className="file-item">
              <UploadImage
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
        <ButtonWrapper>
          <ButtonGroup>
            {data?.staff?.job_type === null ||
            data?.staff?.job_type === CreateStaffJobType.official ? (
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

export default DismissModal;
