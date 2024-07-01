import * as React from "react";
import {
  AntdModal,
  LittleShareOutlineSvg,
  StudentCard,
  TakeModal,
  UserRoundSvg,
} from "components";
import { Wrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { useEffect } from "react";
import { store, toggleModal, useAppSelector } from "store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const TransferModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const {
    returnModal: { open, data },
  } = useAppSelector((state) => state.modals);
  const handleClose = () =>
    dispatch(
      toggleModal({
        key: "returnModal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  const onSubmit = () => {};
  useEffect(() => {
    const subscription = watch(({ state }) => {
      if (state === 1) {
        dispatch(
          toggleModal({
            key: "continueModal",
            data: {
              open: true,
              data: store.getState().modals.returnModal.data,
            },
          })
        );
        handleClose();
      } else if (state === 2) {
        const data = store.getState().modals.returnModal.data;
        router.push({
          pathname: `/transfer/${data?.user_id}/${data?.group_id}/${data?.group_contact_id}`,
          query: {
            action: "transfer",
            ...(data?.permissionActions || {}),
          },
        });
        handleClose();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper style={{ padding: 0 }}>
          <div className="mt10 mb10">
            <StudentCard data={data?.student} />
          </div>
          <TakeModal
            name="state"
            control={control}
            data={[
              {
                tabId: 1,
                title: "Continue",
                color: textColors.sceptreBlue,
                svg: (
                  <UserRoundSvg
                    color={bgColors.orange}
                    height={50}
                    width={50}
                  />
                ),
                styles: {
                  backgroundColor: bgColors.brilliance,
                  boxShadow: "inset 0 0 50px rgba(253, 191, 118, 0.2)",
                  borderRadius: "4px",
                },
                activeStyles: {
                  boxShadow: "inset 0 0 110px rgba(253, 191, 118, 0.5)",
                },
              },
              {
                tabId: 2,
                title: "Transfer",
                color: textColors.sceptreBlue,
                svg: (
                  <LittleShareOutlineSvg
                    color={bgColors.deep}
                    height={50}
                    width={50}
                  />
                ),
                styles: {
                  backgroundColor: bgColors.brilliance,
                  boxShadow: "inset 0 0 50px rgba(191, 209, 255, 0.2)",
                  borderRadius: "4px",
                },
                activeStyles: {
                  boxShadow: "inset 0 0 110px rgba(191, 209, 255, 0.5)",
                },
              },
            ]}
            error={errors?.state?.message}
          />
        </Wrapper>
      </form>
    </AntdModal>
  );
};
export default TransferModal;
