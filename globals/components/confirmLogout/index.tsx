import React from "react";
import { ActionModal, LogOutSvg } from "components";
import { bgColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { IStore, resetModals, toggleModal } from "store";
import { useCookies } from "react-cookie";
import { LAST_ACTION_TIME_NAME, MAIN_TOKEN_NAME } from "constants/tokenNames";
import Cookies from "js-cookie";

const ConfirmLogout = () => {
  const dispatch = useDispatch();
  const [_, _1, removeCookie] = useCookies();

  const {
    confirmLogout: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "confirmLogout",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const onDeleteSubmit = () => {
    dispatch(resetModals());
    const clear = async () => {
      removeCookie(MAIN_TOKEN_NAME);
      Cookies.remove(MAIN_TOKEN_NAME);
      Cookies.remove(LAST_ACTION_TIME_NAME);
      return true;
    };
    // Router.push("/login");

    clear().finally(() => {
      window?.location && window?.location?.reload();
    });
  };

  const stylesLogout = {
    transform: "scale(2.7)",
    padding: "14px 0 4px 0",
  };

  return (
    <ActionModal
      control={control}
      handleSubmit={handleSubmit}
      handleClose={() => handleClose()}
      open={open}
      onSubmit={onDeleteSubmit}
      blurColor={bgColors.pop}
      label="Reason *"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      icon={
        <div style={stylesLogout}>
          <LogOutSvg color={bgColors.pop} />
        </div>
      }
      text={
        data?.fields?.content || (
          <div>
            <p> Are you sure to Logout?</p>
          </div>
        )
      }
      submitButtonText="Confirm"
    />
  );
};

export default ConfirmLogout;
