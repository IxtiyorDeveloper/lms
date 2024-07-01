import React from "react";
import { AntdModal, Button, Input, PodoSvg } from "components";
import { useForm } from "react-hook-form";
import { useAddLabelAllFailed } from "hooks";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { Buttons, SvgWrapper, Wrapper } from "./style";
import { bgColors } from "styles/theme";
import { LABEL_PODO } from "constants/labels";
import { yupResolver } from "@hookform/resolvers/yup";
import { BlockStudent } from "validation/actions";
import { validationErrorHandler } from "utils";
import { useRouter } from "next/router";

const LabelAllFailedToPodoModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    labelAllFailedToPodo: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const count = data?.count;

  const addAction = useAddLabelAllFailed({
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
  } = useForm<{ note: string }>({
    resolver: yupResolver(BlockStudent),
  });

  const onSubmit = (data: { note: string }) => {
    addAction.mutate({
      query_params: {
        note: data?.note,
        type: LABEL_PODO,
      },
      body: {
        search: router.query,
      },
    });
  };
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "labelAllFailedToPodo",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
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
            <PodoSvg width={50} height={50} color={bgColors.primary} />
          </SvgWrapper>
          <p className="text">
            Do you want to add {count} Students to <span>PODO</span>
          </p>
          <div className="form">
            <Input
              label="Reason"
              name="note"
              control={control}
              placeholder="Type here ..."
              type="textarea"
              rows={5}
              error={errors?.note?.message}
            />
          </div>
          <div className="definition">
            <ul>
              <li>
                *Podo - students who probably will not continue their studies or
                you are not sure that the student will continue their studies
                for various reasons:
              </li>
              <li>*student skips lessons</li>
              <li>*student is not active in classes</li>
              <li>*student does not do homework</li>
            </ul>
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
              buttonLoading={addAction?.isLoading}
            >
              Save
            </Button>
          </Buttons>
        </form>
      </Wrapper>
    </AntdModal>
  );
};

export default LabelAllFailedToPodoModal;
