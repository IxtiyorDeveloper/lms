import * as React from "react";
import { Content } from "./style";
import { AntdModal, AntdTable } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useGroupExamData } from "hooks";
import Columns from "./column";
import moment from "moment/moment";
import { Spin } from "antd";
import { expand } from "app/academic-resource/exam-list/groupInside/expand";

const PassedStudentsResultModal = () => {
  const dispatch = useDispatch();

  const {
    passedStudents: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const { data: groupData, isLoading } = useGroupExamData({
    id: data?.data?.id,
    expand: expand,
    month: moment().month(),
    year: moment().year(),
  });

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "passedStudents",
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
      width={820}
      title={`${data?.data?.group?.name} Passed Students`}
    >
      <Spin spinning={isLoading}>
        <Content>
          <div className="border">
            <AntdTable columns={Columns(groupData)} dataSource={[]} />
          </div>
        </Content>
      </Spin>
    </AntdModal>
  );
};
export default PassedStudentsResultModal;
