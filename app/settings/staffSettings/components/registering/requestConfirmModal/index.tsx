import React from "react";
import { AntdModal, Button, CircleImage } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { ButtonsWrapper, FullNameWrapper, Wrapper } from "./style";
import { useSendRequest } from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";

export const RequestConfirmModal = () => {
  const dispatch = useDispatch();

  const {
    requestConfirmModal: { data, open },
  } = useSelector((store: IStore) => store.modals);

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "requestConfirmModal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const sendRequest = useSendRequest({
    onSuccess: () => {
      toast.success("Request send!");
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleSubmit = () => {
    sendRequest.mutate({
      query_params: {
        id: data?.userId,
      },
    });
  };

  return (
    <AntdModal centered width={340} open={open} onCancel={handleClose}>
      <Wrapper>
        <CircleImage
          src={{
            children: data?.userAvatar?.children,
            full_url: data?.userAvatar?.full_url,
          }}
          width={50}
          height={50}
        />
        <FullNameWrapper>{data?.userFullName}</FullNameWrapper>
        <p>
          Are you sure <br /> to send info request to this candidate ?
        </p>
      </Wrapper>
      <ButtonsWrapper>
        <Button
          onClick={handleClose}
          style={{ width: "100%" }}
          className="btn-cancel"
        >
          Cancel
        </Button>
        <Button
          buttonLoading={sendRequest.isLoading}
          onClick={handleSubmit}
          style={{ width: "100%" }}
          className="btn-send"
        >
          Send
        </Button>
      </ButtonsWrapper>
    </AntdModal>
  );
};
