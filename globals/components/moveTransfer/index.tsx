import * as React from "react";
import {
  AntdModal,
  LittleShareOutlineSvg,
  MoveSvg,
  StudentCard,
  TakeModal,
} from "components";
import { Wrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { useEffect } from "react";
import { toggleModal, useAppSelector } from "store";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const MoveTransferModal = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const {
    moveTransfer: { open, data },
  } = useAppSelector((state) => state.modals);
  const handleClose = () =>
    dispatch(
      toggleModal({
        key: "moveTransfer",
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
        handleClose();
      } else if (state === 2) {
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
                title: "Move",
                color: textColors.sceptreBlue,
                svg: <MoveSvg color={bgColors.orange} height={50} width={50} />,
                styles: {
                  backgroundColor: bgColors.brilliance,
                  boxShadow: "inset 0 0 110px rgba(221, 250, 220, 0.5)",
                  borderRadius: "4px",
                },
                activeStyles: {
                  boxShadow: "inset 0 0 110px rgba(221, 250, 220, 0.9)",
                },
                href: data?.moveUrl,
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
                href: data?.transferUrl,
              },
            ]}
            error={errors?.state?.message}
          />
        </Wrapper>
      </form>
    </AntdModal>
  );
};
export default MoveTransferModal;
