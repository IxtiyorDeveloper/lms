import React from "react";
import {
  AntdModal,
  Button,
  ComplaintSvg,
  Input,
  UploadImage,
} from "components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { bgColors } from "styles/theme";
import { Buttons, Content, ContentHeader } from "./style";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useCreateComplaint } from "hooks/useComplaint";
import { ComplaintSchema } from "validation/complaint";
import _ from "lodash";
import { validationErrorHandler } from "utils";

const ComplaintModal = () => {
  const dispatch = useDispatch();
  const {
    complaint: { open, data },
  } = useSelector((state: IStore) => state.modals);
  const user = useSelector((state: IStore) => state.user?.user);

  const createComplaint = useCreateComplaint({
    onSuccess: () => {
      toast.success("Success");
      handleClose();
      reset({});
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(ComplaintSchema),
  });
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "complaint",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const onSubmit = (data: any) => {
    createComplaint.mutate({
      body: {
        app_key: "lms_web",
        topic: "app_bug",
        comment: data?.description,
        fullname:
          user?.userProfile?.firstname + " " + user?.userProfile?.lastname,
        user_id: user?.id,
        medias_url: [data?.media].filter((e) => _.isObject(e)),
      },
    });
  };

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      padding="2px"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <ContentHeader>
            <ComplaintSvg color={bgColors.white} />
            <p>Complaint</p>
          </ContentHeader>
          <div className="forms">
            <UploadImage
              name="media"
              control={control}
              setValue={setValue}
              isNecessaryAllFields
              watch={watch("media")}
              action="create"
            />
            <Input
              name="description"
              control={control}
              label="Description"
              placeholder="Type here..."
              type="textarea"
              rows={6}
              error={errors?.description?.message}
            />
          </div>
        </Content>
        <Buttons>
          <div className="buttons">
            <Button
              className="cancel"
              onClick={handleClose}
              style={{
                backgroundColor: bgColors.wildSand,
                width: "100%",
              }}
            >
              Cancel
            </Button>
            <Button
              className="save"
              type="submit"
              buttonLoading={createComplaint?.isLoading}
              style={{
                width: "100%",
              }}
            >
              Save
            </Button>
          </div>
        </Buttons>
      </form>
    </AntdModal>
  );
};

export default ComplaintModal;
