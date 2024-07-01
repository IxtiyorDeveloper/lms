import React, { useEffect } from "react";
import { AntdModal, InternationLogo } from "components";
import { useDispatch, useSelector } from "react-redux";
import {
  IStore,
  setCheckUser,
  setTaxModalState,
  toggleModal,
  useAppSelector,
} from "store";
import { Wrapper } from "./style";
import Step1 from "./components/step1";
import StepConnected from "./components/stepConnected";
import StepPending from "./components/stepPending";
import { useWsConnect } from "hooks/useCheck";
import { toast } from "react-toastify";
// @ts-ignore
import window from "global/window";
import { IFileVariable } from "../../../types";

const DateNow = new Date().getDate().toString();

export const taxLocalStorageName = "tax_device_name";
export const taxLocalIpInputName = "tax_device_input_ip_name";

const AbsentModal = () => {
  const dispatch = useDispatch();

  const {
    taxModal: { open },
  } = useSelector((state: IStore) => state.modals);

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "taxModal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const user = useAppSelector((state) => state.check.user);

  const { isFetching, isSuccess, isError, error } = useWsConnect({
    body: {
      url: `ws://${user.ip}:${user.port || 8888}`,
      data: {
        id: `${DateNow}`,
        command: "Login",
        data: user.branch,
      },
    },
    enabled: !!user?.branch && !!user?.ip,
    onError: () => {
      toast.error("Check ip address");
      window.localStorage.removeItem(taxLocalStorageName);
      dispatch(setCheckUser({ ip: undefined, port: 8888, branch: null }));
    },
    onSuccess: () => {
      window.localStorage.setItem(
        taxLocalStorageName,
        JSON.stringify({
          url: `ws://${user.ip}:${user.port || 8888}`,
          data: {
            id: `${DateNow}`,
            command: "Login",
            data: user.branch,
          },
        })
      );
    },
  });

  useEffect(() => {
    dispatch(setTaxModalState(isSuccess));
  }, [isSuccess]);

  useEffect(() => {
    const values = window.localStorage.getItem(taxLocalStorageName);
    const newValues = values ? (JSON.parse(values) as IFileVariable) : null;
    if (!!newValues) {
      dispatch(
        setCheckUser({
          branch: {
            login: newValues.data.data?.login,
            password: newValues.data.data?.password,
          },
          ip: newValues.url.slice(
            newValues.url.lastIndexOf("/") + 1,
            newValues.url.lastIndexOf(":")
          ),
          port: parseInt(
            newValues.url.slice(
              newValues.url.lastIndexOf(":") + 1,
              newValues.url.length
            )
          ),
        })
      );
    }
  }, []);

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      padding="0"
    >
      <Wrapper>
        <div className="logo">
          <InternationLogo />
        </div>
        {!user.ip || isError ? (
          <Step1 />
        ) : isSuccess ? (
          <StepConnected />
        ) : isFetching ? (
          <StepPending />
        ) : (
          <Step1 />
        )}
      </Wrapper>
    </AntdModal>
  );
};

export default AbsentModal;
