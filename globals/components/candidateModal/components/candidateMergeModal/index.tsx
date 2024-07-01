import { AntdModal, Button, MergeSvg } from "components";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { Content, ModalBody } from "./style";
import { Flex } from "antd";
import { bgColors } from "styles/theme";
import { useDispatch } from "react-redux";
import Blur from "./blur";
import { ICandidate } from "types";

interface IProps {
  onSubmit?: any;
}

const CandidateMergeModal: FC<IProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();

  const {
    mergeCandidate: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const candidate = data?.candidate as ICandidate;

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "mergeCandidate",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const handleClick = () => {
    onSubmit?.({
      candidate,
    });
  };

  return (
    <AntdModal
      open={open}
      centered
      width={340}
      padding="20px"
      onCancel={handleClose}>
      <ModalBody>
        <Content>
          <div className="icon">
            <Blur />
            <MergeSvg
              width={50}
              height={50}
              color={bgColors.orange}
              className="merge_icon"
            />
          </div>
          Are you sure to merge them ?
        </Content>
        <Flex gap={10}>
          <Button
            bgColor={bgColors.wildSand}
            style={{
              width: "100%",
            }}
            onClick={handleClose}>
            No
          </Button>
          <Button
            style={{
              width: "100%",
            }}
            onClick={handleClick}>
            Yes
          </Button>
        </Flex>
      </ModalBody>
    </AntdModal>
  );
};

export default CandidateMergeModal;
