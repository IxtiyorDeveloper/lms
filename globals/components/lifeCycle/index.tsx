import React from "react";
import { AntdModal } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { Wrapper } from "./style";
import { useLifeCycleView } from "hooks";
import dynamic from "next/dynamic";
import { Spin } from "antd";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

const createArrayOfObjects: any = (data: { [x: string]: any }, prefix = "") => {
  const result = [];

  for (const key in data) {
    const value = data[key];

    if (typeof value === "object" && value !== null) {
      result.push(...createArrayOfObjects(value, prefix + key + "."));
    } else {
      result.push({ key: prefix + key, value });
    }
  }

  return result;
};
const LifeCycleModal = () => {
  const dispatch = useDispatch();
  const {
    lifeCycle: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const {
    data: lifeCycle,
    isLoading,
    isPreviousData,
  } = useLifeCycleView({
    query_params: {
      id: data?.user_id,
      expand: "data",
    },
  });
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "lifeCycle",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
    >
      <Spin spinning={isLoading || isPreviousData}>
        <Wrapper>
          <div className="">More info</div>
          <ReactJson
            src={lifeCycle}
            style={{ wordWrap: "break-word", maxWidth: "100%" }}
            collapseStringsAfterLength={100}
          />
        </Wrapper>
      </Spin>
    </AntdModal>
  );
};

export default LifeCycleModal;
