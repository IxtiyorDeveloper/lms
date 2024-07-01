import React from "react";
import {
  AntdModal,
  Button,
  CheckBox,
  PaymentRequestSvg,
  PhoneNumberInput,
} from "components";
import { useForm } from "react-hook-form";
import { useCreatePaymentRequest } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { Buttons, RowWrapper, SvgWrapper, Wrapper } from "./style";
import { bgColors } from "styles/theme";
import { OneStudent } from "types/student";
import {
  HomePhone,
  MainPhone,
  OtherPhone,
  ParentsPhone,
} from "constants/phoneTypes";
import formatPhoneNumber from "utils/phoneNumberFormatter";
import Image from "next/image";
import { validatePhone } from "utils/validatePhone";
import { validationErrorHandler } from "utils";

const images = {
  [MainPhone]: {
    img: "/phone/active.png",
    name: "Main Phone",
  },
  [ParentsPhone]: {
    img: "/phone/parents.png",
    name: "Parents",
  },
  [HomePhone]: {
    img: "/phone/home.png",
    name: "Home",
  },
  [OtherPhone]: {
    img: "/phone/other.png",
    name: "Other",
  },
};
const PaymentRequest = () => {
  const dispatch = useDispatch();
  const {
    paymentRequest: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const queryKeys = data?.queryKeys;
  const id = data?.id;
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "paymentRequest",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const queryClient = useQueryClient();
  const paymentRequest = useCreatePaymentRequest({
    onSuccess: () => {
      toast.success("Student action changed");
      if (Array.isArray(queryKeys)) {
        for (let i = 0; i < queryKeys.length; i++) {
          queryClient.invalidateQueries({
            queryKey: queryKeys[i],
          });
        }
      } else {
        queryClient.invalidateQueries({
          queryKey: queryKeys,
        });
      }
      handleClose();
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const { phone, ...rest } = data;
    let phones: any = [];
    if (data)
      for (const [key, value] of Object.entries(rest)) {
        if (value) {
          phones = [...phones, key];
        }
      }
    if (validatePhone(phone)) {
      phones = [...phones, phone];
    }
    paymentRequest.mutate({
      query_params: {
        contact_id: id,
      },

      body: {
        phones,
      },
    });
  };
  const student: OneStudent = data?.student;
  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={340}
    >
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SvgWrapper>
            <div className="svg">
              <PaymentRequestSvg width={50} height={50} />
            </div>
            <div
              className="blur"
              style={{
                backgroundColor: bgColors.yourShadow,
              }}
            />
          </SvgWrapper>
          <p className="text">
            Are you sure to send sms for <br />
            payment request?
          </p>
          <div className="cards">
            {student?.user?.userPhones?.map((phone, index) => {
              return (
                <RowWrapper key={index}>
                  <div className="left">
                    <div className="icon">
                      <Image
                        src={images[phone.type as keyof typeof images]?.img}
                        alt={images[phone.type as keyof typeof images]?.name}
                        width={30}
                        height={30}
                      />
                    </div>
                    <div className="labels">
                      <p className="name">
                        {images[phone.type as keyof typeof images]?.name}
                      </p>
                      <p className="phone">
                        {formatPhoneNumber(phone?.phone_number)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <CheckBox
                      name={`${phone?.phone_number}`}
                      control={control}
                      className="checkBox"
                    />
                  </div>
                </RowWrapper>
              );
            })}
          </div>
          <div className="phone-wrapper">
            <PhoneNumberInput
              label="Phone"
              name={`phone`}
              control={control}
              placeholder="+998 (--) --- -- --"
            />
          </div>

          <Buttons>
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
              buttonLoading={paymentRequest?.isLoading}
            >
              Send
            </Button>
          </Buttons>
        </form>
      </Wrapper>
    </AntdModal>
  );
};

export default PaymentRequest;
