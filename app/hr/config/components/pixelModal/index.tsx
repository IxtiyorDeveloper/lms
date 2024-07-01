import { Spin } from "antd";
import { useEffect } from "react";
import { PixelType } from "./type";
import { bgColors } from "styles/theme";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { validationErrorHandler } from "utils";
import { AntdModal, Button, Input } from "components";
import { useGetPixelData, usePixelFormSave } from "hooks";

import { FooterWrap, FormWrapper } from "./style";

const PixelModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { data, isLoading } = useGetPixelData(open);

  const pixelSave = usePixelFormSave({
    onSuccess: () => {
      hanldeClose();
      toast.success("Pixel saved");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const { control, handleSubmit, reset, setValue } = useForm();

  const hanldeClose = () => {
    setOpen(false);
    reset();
  };

  const onFInish = (data: any) => {
    pixelSave.mutate({
      list: Object.entries(data)?.map(([key, value]) => ({
        key,
        value,
        value_type: "string",
      })),
    });
  };

  useEffect(() => {
    if (data && !isLoading) {
      data?.list?.forEach((item: any) => {
        setValue(item.key, item.value);
      });
    }
  }, [data]);

  return (
    <AntdModal
      centered
      open={open}
      onCancel={hanldeClose}
      title="Edit pixel"
      width={520}
    >
      <Spin spinning={isLoading}>
        <FormWrapper onSubmit={handleSubmit(onFInish)}>
          <Input
            type="textarea"
            label="Facebook header"
            placeholder="Type here..."
            control={control}
            name={PixelType.FACEBOOK_HEADER}
          />
          <Input
            type="textarea"
            control={control}
            label="Facebook body"
            placeholder="Type here..."
            name={PixelType.FACEBOOK_BODY}
          />

          <FooterWrap>
            <Button onClick={hanldeClose} bgColor={bgColors.wildSand}>
              Cancel
            </Button>
            <Button type="submit" buttonLoading={pixelSave.isLoading}>
              Save
            </Button>
          </FooterWrap>
        </FormWrapper>
      </Spin>
    </AntdModal>
  );
};

export default PixelModal;
