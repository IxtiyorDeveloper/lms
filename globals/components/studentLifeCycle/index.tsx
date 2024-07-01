import React, { useRef, useState } from "react";
import { AntdModal, AntdTable, Segmented, SelectMonth } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { LifeCycleWrapper } from "./style";
import moment from "moment/moment";
import { DATE_FORMAT_MMMM_YYYY_MONTH_SELECT } from "constants/dates";
import { useStudentCallHistory, useStudentLifeCycle } from "hooks";
import { getMonth } from "utils/getDates";
import Columns from "./columns";
import CallColumns from "app/student/[studentId]/components/callTable/columns";

export enum TabType {
  MAIN = "main",
  CALL = "call",
}

const StudentLifeCycle = () => {
  const [tab, setTab] = useState(TabType.MAIN);

  const [month, setMonth] = useState<string>(
    moment().format(DATE_FORMAT_MMMM_YYYY_MONTH_SELECT),
  );
  const audioRef = useRef<any>(null);
  const dispatch = useDispatch();
  const {
    archiveLifeCycle: { open, data },
  } = useSelector((state: IStore) => state.modals);

  // Function to pause the audio
  const pauseAudio = (id: string) => {
    const audio = document.getElementById(id) as HTMLAudioElement | null;
    if (audio) {
      audio.pause();
    }
  };
  const handleClose = () => {
    setTab(TabType.MAIN);
    if (lifeCycle)
      for (let i = 0; i < lifeCycle?.length; i++) {
        pauseAudio(`life-cycle-audio-${i}`);
      }
    setMonth(moment().format(DATE_FORMAT_MMMM_YYYY_MONTH_SELECT));
    dispatch(
      toggleModal({
        key: "archiveLifeCycle",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const date = getMonth({
    format: DATE_FORMAT_MMMM_YYYY_MONTH_SELECT,
    date: month,
  });

  const { data: callList, isLoading: callLoading } = useStudentCallHistory({
    id: data?.id,
    year: date?.year,
    month: date?.month,
    enabled: tab === TabType.CALL && open,
    expand: "createdBy.rbacAssignment.rbacRole",
  });

  const {
    data: lifeCycle,
    isInitialLoading: isLoading,
    isPreviousData,
  } = useStudentLifeCycle({
    month: date?.month,
    year: date?.year,
    user_id: data?.id,
  });

  const options = [
    {
      label: "Main",
      value: TabType.MAIN,
      children: (
        <AntdTable
          dataSource={lifeCycle ?? []}
          columns={Columns({ audioRef })}
          loading={isLoading || isPreviousData}
          scroll={{ y: 400 }}
        />
      ),
    },
    {
      label: "Call",
      value: TabType.CALL,
      children: (
        <AntdTable
          dataSource={callList ?? []}
          columns={CallColumns()}
          loading={callLoading}
          scroll={{ y: 400 }}
        />
      ),
    },
  ];

  return (
    <AntdModal open={open} onCancel={handleClose} width="60%" padding="2px">
      <LifeCycleWrapper>
        <div className="top">
          <p className="title">Lifecycle</p>
          <SelectMonth
            initValue={month}
            onChange={(e) => {
              setMonth(e);
            }}
          />
        </div>

        <div className="lifecycle-table">
          <Segmented
            options={options}
            initValue={tab}
            onChange={(e: any) => setTab(e)}
            // routerKey="config_type"
          />
        </div>
      </LifeCycleWrapper>
    </AntdModal>
  );
};

export default StudentLifeCycle;
