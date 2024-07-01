import { Flex, Affix } from "antd";
import { Button, Segmented } from "components";
import { toggleModal } from "store/slices";
import ExamExercises from "./components/exercises";
import Speaking from "./components/speaking";
import Writing from "./components/writing";
import { ModalWrapper } from "./style";
import { EXAM_PARTS, EXAM_PROCESS, EXAMINATION_PART } from "constants/exam";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IStore } from "store";
import { bgColors } from "styles/theme";
import Overal from "./components/overal";
import ModalHeader from "./components/header";
import { IMockExamDataGroupStudents } from "types/exam/exam";

const StudentMockExamResultModal = () => {
  const dispatch = useDispatch();
  const {
    studentMockExamResult: { data: storeData, open },
  } = useSelector((state: IStore) => state.modals);

  const progress = storeData?.progress || 0;
  const data = (storeData?.data as IMockExamDataGroupStudents) || {};
  const mock = data?.studentProfile?.mockExam;
  const profile = data?.studentProfile;

  const main = mock?.dataResult?.paper?.find((i) => i.type === EXAM_PARTS.MAIN);
  const speaking = mock?.dataResult?.paper?.find(
    (i) => i.type === EXAM_PARTS.SPEAKING
  );

  const grammar = main?.components?.find(
    (com) => com.type == EXAMINATION_PART.GRAMMAR
  );
  const vocabulary = main?.components?.find(
    (com) => com.type == EXAMINATION_PART.VOCABULARY
  );
  const reading = main?.components?.find(
    (com) => com.type == EXAMINATION_PART.READING
  );
  const listening = main?.components?.find(
    (com) => com.type == EXAMINATION_PART.LISTENING
  );
  const writing = main?.components?.find(
    (com) => com.type == EXAMINATION_PART.WRITING
  );

  const tabs = [
    {
      value: `${EXAMINATION_PART.GRAMMAR}`,
      label: <div>Grammar</div>,
      children: <ExamExercises data={grammar} />,
    },
    {
      value: `${EXAMINATION_PART.VOCABULARY}`,
      label: <div>Vocabulary</div>,
      children: <ExamExercises data={vocabulary} />,
    },
    {
      value: `${EXAMINATION_PART.READING}`,
      label: <div>Reading</div>,
      children: <ExamExercises data={reading} />,
    },
    {
      value: `${EXAMINATION_PART.WRITING}`,
      label: <div>Writing</div>,
      children: <Writing data={writing} />,
    },
    {
      value: `${EXAMINATION_PART.LISTENING}`,
      label: <div>Listening</div>,
      children: <ExamExercises data={listening} />,
    },
    {
      value: `${EXAMINATION_PART.SPEAKING}`,
      label: <div>Speaking</div>,
      children: <Speaking data={speaking} mock />,
    },
  ];

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "studentMockExamResult",
        data: { open: false, data: {} },
      })
    );
  };

  const status = {
    "0": EXAM_PROCESS.FAIL,
    "1": EXAM_PROCESS.SUCCESS,
  };

  return (
    <ModalWrapper
      destroyOnClose
      footer={null}
      closeIcon={false}
      title="Mock exam result"
      width={730}
      open={open}
      onOk={handleClose}
      onCancel={handleClose}>
      <ModalHeader
        progress={progress}
        avatar={profile?.avatar}
        level={profile?.level_name}
        first_name={profile?.first_name}
        last_name={profile?.last_name}
        status={status[`${mock?.passed ?? "0"}`]}
      />

      <Overal
        components={[
          ...(main?.components || []),
          ...(speaking?.components || []),
        ]}
      />
      {/* <Affix offsetTop={0}> */}
        <Segmented
          block
          options={tabs}
          initValue={`${EXAMINATION_PART.GRAMMAR}`}
        />
      {/* </Affix> */}

      <Flex
        justify="flex-end"
        style={{
          marginTop: 24,
        }}>
        <Button bgColor={bgColors.wildSand} onClick={handleClose}>
          Cancel
        </Button>
      </Flex>
    </ModalWrapper>
  );
};

export default StudentMockExamResultModal;
