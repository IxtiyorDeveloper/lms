import React from "react";
import {
  AntdModal,
  Button,
  GroupInterface,
  MySelect,
  TakeModal,
} from "components";
import { Content, Wrapper, Buttons } from "./style";
import { bgColors, textColors } from "styles/theme";
import { data, transferCapability } from "./data";
import { useRouter } from "next/router";
import { TStatuses } from "types";
import { useForm } from "react-hook-form";
import { CreateTakeModal } from "validation";
import { IStore, toggleModal } from "store";
import { useDispatch, useSelector } from "react-redux";
import { useChangeGroupState } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationErrorHandler } from "utils";
import { groupReasons } from "../../../static/group/reasons";

const TakeGroupModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    takeGroup: { data: reduxData, open },
  } = useSelector((state: IStore) => state.modals);
  const groupId = reduxData.id;

  const group = reduxData.group;

  const changeStateMutation = useChangeGroupState({
    onSuccess: () => {
      queryClient.invalidateQueries(reduxData.queryKeys);
      toast.success("Group changed");
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<{ state: string; closing_reason: string | number }>({
    resolver: yupResolver(CreateTakeModal),
  });

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "takeGroup",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };
  const onSubmit = (data: any) => {
    changeStateMutation.mutate({
      body: data,
      id: groupId,
    });
  };

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <form
        onSubmit={handleSubmit((data, event) => {
          event?.stopPropagation();
          onSubmit(data);
        })}
      >
        <Wrapper>
          <div className="title">Take group</div>
          <div className="mt20">
            <GroupInterface group={group} />
          </div>
          {watch("state") == "400" && (
            <div className="mt20">
              <MySelect
                control={control}
                name="closing_reason"
                label="Closing reason"
                options={groupReasons}
                placeholder="-"
                allowClear
                error={errors?.closing_reason?.message}
              />
            </div>
          )}
          <Content>
            <TakeModal
              name="state"
              control={control}
              data={data?.filter((item: { tabId: string | number }) => {
                return transferCapability[
                  router.query.tab_id as unknown as TStatuses
                ]?.some((status) => +status === +item.tabId);
              })}
              error={errors?.state?.message}
            />
          </Content>
          <Buttons>
            <Button
              style={{
                height: "44px",
                color: textColors.yourShadow,
                boxShadow: "inset 0 2px 6px rgba(252, 252, 253, 0.8)",
                backgroundColor: bgColors.wildSand,
              }}
              onClick={handleClose}
              className="cancel"
            >
              Cancel
            </Button>
            <Button
              style={{
                height: "44px",
                color: textColors.dark,
                boxShadow:
                  "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866",
              }}
              type="submit"
              className="save"
              buttonLoading={changeStateMutation.isLoading}
            >
              Save
            </Button>
          </Buttons>
        </Wrapper>
      </form>
    </AntdModal>
  );
};

export default TakeGroupModal;
