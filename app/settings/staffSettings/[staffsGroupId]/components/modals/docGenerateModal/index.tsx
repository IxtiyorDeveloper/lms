import React, { useRef, useState } from "react";
import { ButtonsWrapper, ItemWrapper, WrapperForm } from "./style";
import { AntdModal, Button, DatePicker, Input } from "components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import generatePDF, { Margin } from "react-to-pdf";
import Document from "./document";
import { removeFreeSpaces } from "utils/stringMethods";

const DocumentCreateModal = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const targetRef = useRef(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const {
    dismissDocGenerate: { data, open },
  } = useSelector((store: IStore) => store.modals);

  const { control, handleSubmit, watch } = useForm();

  const handleCancel = () => {
    dispatch(
      toggleModal({
        key: "dismissDocGenerate",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const fullName = data?.fullName;
  const roleName = data?.roleName;

  const onSubmit = (res: any) => {
    setLoading(true);
    const file = `${data?.type?.toLocaleUpperCase()}-${removeFreeSpaces(
      fullName
    )}.pdf`;
    if (footerRef.current) footerRef.current.style.position = "absolute";
    generatePDF(targetRef, {
      filename: file,
      page: { format: "letter", margin: Margin.MEDIUM },
    }).then(() => {
      setLoading(false);
      // handleCancel();
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
            value={fullName}
            control={control}
            placeholder="Type here..."
          />
        </ItemWrapper>
        <ItemWrapper>
          <Input
            disabled
            name="role"
            control={control}
            label="Position Name"
            value={roleName}
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
        data={data}
        fullName={fullName}
        date={watch()?.date}
        targetRef={targetRef}
      />
    </AntdModal>
  );
};

export default DocumentCreateModal;
