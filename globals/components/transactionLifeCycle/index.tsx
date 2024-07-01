import React, { useRef, useState } from "react";
import { AntdModal, AntdTable } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { LifeCycleWrapper } from "./style";
import moment from "moment/moment";
import { DATE_FORMAT_MMMM_YYYY_MONTH_SELECT } from "constants/dates";
import Columns from "./columns";

const TransactionLifeCycle = () => {
  const [month, setMonth] = useState<string>(
    moment().format(DATE_FORMAT_MMMM_YYYY_MONTH_SELECT)
  );
  const audioRef = useRef<any>(null);
  const dispatch = useDispatch();
  const {
    transactionLifeCycle: { open, data },
  } = useSelector((state: IStore) => state.modals);

  // Function to pause the audio
  const pauseAudio = (id: string) => {
    const audio = document.getElementById(id) as HTMLAudioElement | null;
    if (audio) {
      audio.pause();
    }
  };
  const lifeCycle = data?.lifeCycles;
  const handleClose = () => {
    if (lifeCycle)
      for (let i = 0; i < lifeCycle?.length; i++) {
        pauseAudio(`life-cycle-audio-${i}`);
      }
    setMonth(moment().format(DATE_FORMAT_MMMM_YYYY_MONTH_SELECT));
    dispatch(
      toggleModal({
        key: "transactionLifeCycle",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width="60%"
      padding="2px"
    >
      <LifeCycleWrapper>
        <div className="top">
          <p className="title">Lifecycle</p>
        </div>
        <div className="lifecycle-table">
          <AntdTable
            dataSource={lifeCycle ?? []}
            columns={Columns({ audioRef })}
          />
        </div>
      </LifeCycleWrapper>
    </AntdModal>
  );
};

export default TransactionLifeCycle;
