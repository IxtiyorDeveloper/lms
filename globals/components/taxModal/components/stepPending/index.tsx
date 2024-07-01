import React from "react";
import { Wrapper } from "./style";
import { Button } from "antd";
import Spin from "antd/lib/spin";
import { useWsDisConnect } from "hooks/useCheck";
import { setCheckUser } from "store";
import { useDispatch } from "react-redux";
import { taxLocalIpInputName, taxLocalStorageName } from "../../index";

const StepPending = () => {
  const dispatch = useDispatch();
  const disConnect = useWsDisConnect({
    onSuccess: () => {
      dispatch(setCheckUser({ ip: undefined, port: 8888, branch: null }));
      window.localStorage.removeItem(taxLocalIpInputName);
      setTimeout(() => {
        window.localStorage.removeItem(taxLocalStorageName);
      }, 0);
    },
  });
  return (
    <Wrapper>
      <div className="spin">
        <Spin spinning size="large" />
      </div>
      <div className="cancel">
        <Button onClick={() => disConnect.mutate()}>Cancel</Button>
      </div>
    </Wrapper>
  );
};

export default StepPending;
