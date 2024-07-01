import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { setVolume, useAppSelector } from "store";
import { Wrapper } from "./style";
import InputWithActions from "./components/input";
import CollapseHistory from "./components/collapse";
import { Slider } from "antd";
import { debounce } from "utils/debounce";
import { useDispatch } from "react-redux";
import { CallAction } from "layout/header/style";
import { bgColors } from "styles/theme";
import { CallSvg } from "@jasurbekyuldashov/lms-web-icons";

const Call = () => {
  const openInNewTab = () => {
    const width = 360;
    const height = 600;
    const left = screen.width / 2 - width / 2;
    const top = screen.height / 2 - height / 2;

    window.open(
      "/sip",
      "Inter Sip",
      `width=${width},height=${height},top=${top},left=${left}`,
    );
  };

  return (
    <div className="actions" onClick={openInNewTab} style={{ zIndex: 2000 }}>
      <CallAction
        background={bgColors.midori}
        boxShadow={"inset 0 3.05px 6.1px #70D088"}
      >
        <CallSvg width={15} height={15} />
      </CallAction>
    </div>
  );
  return <button onClick={openInNewTab}>open</button>;
};

export const CallDialer = () => {
  const dispatch = useDispatch();
  const operator = useAppSelector((state) => state.user?.user?.operator);
  const [volume, setVolumeState] = useState(70);
  const [ringtone, setRingtone] = useState(
    parseInt(localStorage.getItem("ringtone") || "80"),
  );

  useEffect(() => {
    dispatch(setVolume(volume));
  }, [volume]);

  const setStorage = useCallback(
    debounce((value: number) => {
      window.localStorage.setItem("ringtone", value.toString());
      window.dispatchEvent(new Event("ringtone"));
    }, 500),
    [],
  );

  useEffect(() => {
    setStorage(ringtone);
  }, [ringtone]);

  return (
    <Fragment>
      {operator && (
        <Wrapper>
          <div className="main">
            <div>
              Speaker
              <Slider
                defaultValue={volume}
                onChange={(e) => setVolumeState(e)}
              />
            </div>
            <div>
              Ringtone
              <Slider
                defaultValue={ringtone}
                onChange={(e) => setRingtone(e)}
              />
            </div>
            <InputWithActions />
            <CollapseHistory />
          </div>
        </Wrapper>
      )}
    </Fragment>
  );
};

export default Call;
