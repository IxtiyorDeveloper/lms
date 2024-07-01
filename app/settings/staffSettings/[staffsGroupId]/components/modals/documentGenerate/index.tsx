import React, { useEffect, useRef, useState } from "react";
import { ButtonsWrapper, ItemWrapper, WrapperForm } from "./style";
import { AntdModal, Button, DatePicker, Input } from "components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import generatePDF, { Margin } from "react-to-pdf";
import Document from "./document";
import dayjs from "dayjs";
import { removeFreeSpaces } from "utils/stringMethods";
import moment from "moment";

const DocumentGenerate = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const targetRef = useRef(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const {
    docGenerate: { data, open },
  } = useSelector((store: IStore) => store.modals);

  const { control, handleSubmit, setValue, watch } = useForm();

  const handleCancel = () => {
    dispatch(
      toggleModal({
        key: "docGenerate",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  useEffect(() => {
    setValue("fullName", data?.fullName);
    setValue("role", data?.roleName);
    setValue("passportNumber", data?.passportNumber);
    setValue(
      "passportExpireDate",
      dayjs(moment(data?.passportExpireDate).format("DD-MM-YYYY"), "DD-MM-YYYY")
    );
    setValue(
      "passportGivenDate",
      dayjs(moment(data?.passportGivenDate).format("DD-MM-YYYY"), "DD-MM-YYYY")
    );
    setValue("officialAddress", data?.officialAddress);
    setValue("passportGivenBy", data?.passportGivenBy);
  }, [data]);

  const onSubmit = (result: any) => {
    setLoading(true);
    const file = `${data?.type?.toLocaleUpperCase()}-${removeFreeSpaces(
      watch()?.fullName
    )}.pdf`;
    if (footerRef.current) footerRef.current.style.position = "absolute";
    generatePDF(targetRef, {
      filename: file,
      page: { format: "letter", margin: Margin.MEDIUM },
    }).then(() => {
      setLoading(false);
      handleCancel();
    });
  };

  return (
    <AntdModal open={open} width={400} onCancel={handleCancel}>
      <WrapperForm onSubmit={handleSubmit(onSubmit)}>
        <ItemWrapper>
          <Input
            disabled
            name="fullName"
            label="Full Name"
            control={control}
            placeholder="Type here..."
          />
        </ItemWrapper>
        {data?.type === "lc" && (
          <>
            <ItemWrapper>
              <Input
                name="passportNumber"
                label="Passport Number"
                control={control}
                placeholder="Type here..."
              />
            </ItemWrapper>
            <ItemWrapper>
              <Input
                name="passportGivenBy"
                label="Passport Given By"
                control={control}
                placeholder="Type here..."
              />
            </ItemWrapper>
            <ItemWrapper>
              <DatePicker
                name="passportGivenDate"
                label="Passport Given Date"
                control={control}
                placeholder="Type here..."
              />
            </ItemWrapper>
            <ItemWrapper>
              <DatePicker
                name="passportExpireDate"
                label="Passport Expire"
                control={control}
                placeholder="Type here..."
              />
            </ItemWrapper>
            <ItemWrapper>
              <Input
                name="officialAddress"
                label="Official Address"
                control={control}
                placeholder="Type here..."
              />
            </ItemWrapper>
          </>
        )}
        <ItemWrapper>
          <Input
            disabled
            name="role"
            control={control}
            label="Position Name"
            placeholder="Type here..."
          />
        </ItemWrapper>
        <ItemWrapper>
          <DatePicker
            name="date"
            control={control}
            label="Date"
            placeholder="Select Date"
          />
        </ItemWrapper>
        <ButtonsWrapper>
          <Button onClick={handleCancel} className="btn-close">
            Cancel
          </Button>
          <Button buttonLoading={loading} type="submit">
            Generate
          </Button>
        </ButtonsWrapper>
      </WrapperForm>
      <Document
        type={data?.type}
        footerRef={footerRef}
        data={{
          roleName: watch()?.role,
          fullName: watch()?.fullName,
          passportNumber: watch()?.passportNumber,
          passportGivenBy: watch()?.passportGivenBy,
          passportGivenDate: watch()?.passportGivenDate,
          passportExpireDate: watch()?.passportExpireDate,
          officialAddress: watch()?.officialAddress,
        }}
        fullData={data}
        roleName={watch()?.role}
        fullName={watch()?.fullName}
        date={watch()?.date}
        targetRef={targetRef}
      />
    </AntdModal>
  );
};

export default DocumentGenerate;
