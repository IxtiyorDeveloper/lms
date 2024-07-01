import React, { useEffect, useState } from "react";
import { AntdModal, Button, Input } from "components";
import { Buttons } from "./style";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const CreateRegionModal = () => {
  const { handleSubmit, reset, control } = useForm();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (router.query.createRegion === "true") {
      setOpen(true);
    }
  }, [router.query?.createCover]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      reset({});
      const query = router.query;
      delete query.createRegion;
      router.replace({
        pathname: router.pathname,
        query: query,
      });
    }, 100);
  };

  // const send = useCreateRegion({
  //   onSuccess: () => {
  //     toast.success("Created!");
  //     handleClose();
  //   },
  //   onError: (e: any) => {
  //     if (e.callStatus === 422) {
  //       const validationErrors = e.data.client_error.errors as any[];
  //       validationErrors.map((err) => {
  //         setError(err.field, { message: err.message });
  //       });
  //     } else {
  //       toast.error(e.data?.client_error?.exception?.message);
  //     }
  //   },
  // });

  const onSubmit = (data: any) => {};

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={340}>
      <Spin spinning={false}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="name"
            control={control}
            placeholder="Type here..."
            label="Create region name"
          />
          <Buttons>
            <Button onClick={handleClose} className="cancel">
              Cancel
            </Button>
            <Button type="submit" className="save">
              Send
            </Button>
          </Buttons>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default CreateRegionModal;
