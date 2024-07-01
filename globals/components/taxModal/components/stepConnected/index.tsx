import React from "react";
import { Wrapper } from "./style";
import { ConnectedSvg } from "components";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { setCheckUser, useAppSelector } from "store";
import { useTaxWs, useWsDisConnect } from "hooks/useCheck";
import { toast } from "react-toastify";

const StepConnected = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.check.user);

  const tax = useTaxWs({
    onSuccess: () => {
      toast.success("Success!");
    },
    onError: (err: any) => {
      toast.error("Something went wrong!");
    },
  });

  const disConnect = useWsDisConnect({
    onSuccess: () => {
      // window.localStorage.removeItem(taxLocalStorageName);
      dispatch(setCheckUser({ ip: undefined, port: 8888, branch: null }));
    },
  });

  return (
    <Wrapper>
      <div className="main">
        <div>
          <ConnectedSvg />
        </div>
        <div className="desc">Successfully connected</div>
      </div>
      <div className="action">
        <Button
          onClick={() => {
            tax.mutate({
              body: {
                url: `ws://${user.ip}:${user.port || 8888}`,
                data: {
                  id: `${Math.random()}`,
                  command: "PrintXReport",
                },
              },
            });
          }}
          className="green"
        >
          Print X report
        </Button>
        <Button onClick={() => disConnect.mutate()}>Disconnect</Button>
      </div>
    </Wrapper>
  );
};

export default StepConnected;
