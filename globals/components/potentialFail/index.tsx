import React from "react";
import { AntdModal, Button, Input, StudentCard } from "components";
import { useForm } from "react-hook-form";
import { useAddPotential } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { Buttons, SvgWrapper, Wrapper } from "./style";
import { bgColors } from "styles/theme";
import { LABEL_POTENTIAL_FAIL } from "constants/labels";
import { yupResolver } from "@hookform/resolvers/yup";
import { BlockStudent } from "validation/actions";
import { validationErrorHandler } from "utils";
import { PotentialFailSvg } from "@jasurbekyuldashov/lms-web-icons";

const PotentialFailModal = () => {
  const dispatch = useDispatch();
  const {
    potentialFail: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const queryKeys = data?.queryKeys;
  const user = data?.user;
  const full_name =
    user?.userProfile?.firstname + " " + user?.userProfile?.lastname;
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "potentialFail",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const queryClient = useQueryClient();

  const addAction = useAddPotential({
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
      note: data?.note,
      type: LABEL_POTENTIAL_FAIL,
      id: user?.id,
    });
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
            <PotentialFailSvg
              width={50}
              height={50}
              color={bgColors.orangeJuice}
              secondColor={bgColors.orangeJuice}
            />
          </SvgWrapper>
          <p className="text">
            Adding {full_name} to <br />
            <span> ”Potential Fail”</span>
          </p>
          {data?.student && (
            <div className="card">
              <StudentCard data={data?.student} />
            </div>
          )}
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
                Please mark as "Potential fail" in case you consider this
                student may probably fail on next exam.
              </li>
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

export default PotentialFailModal;
