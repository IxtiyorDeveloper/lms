import { Flex, Spin, Affix } from "antd";
import { Button, Segmented } from "components";
import { toggleModal } from "store/slices";
import ExamExercises from "./components/exercises";
import Speaking from "./components/speaking";
import Writing from "./components/writing";
import { ModalWrapper } from "./style";
import { EXAM_PARTS, EXAMINATION_PART } from "constants/exam";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IStore } from "store";
import { useGetExamPaper } from "hooks";
import { bgColors } from "styles/theme";
import Overal from "./components/overal";
import _ from "lodash";
import { getPercentageParseValue } from "utils/number";
import ModalHeader from "./components/header";

const StudentExamResultModal = () => {
  const dispatch = useDispatch();
  const {
    studentExamResult: { data: storeData, open },
  } = useSelector((state: IStore) => state.modals);

  const id = storeData?.id as number;

  const { data, isLoading } = useGetExamPaper({
    query_params: {
      id: id,
    },
    enabled: open && id,
  });

  const profile = data?.userProfile;
  const main = data?.paper?.find((i) => i.type === EXAM_PARTS.MAIN);
  const speaking = data?.paper?.find((i) => i.type === EXAM_PARTS.SPEAKING);

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
      children: <Speaking data={speaking} mock={false} />,
    },
  ];

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "studentExamResult",
        data: { open: false, data: {} },
      })
    );
  };

  const totalPoint = _.sum(
    (data?.scores || []).map((e) => {
      return e.max_point;
    })
  );
  const point = _.sum(
    (data?.scores || []).map((e) => {
      return e.point;
    })
  );
  const progress = getPercentageParseValue(point, totalPoint);

  return (
    <ModalWrapper
      destroyOnClose
      footer={null}
      closeIcon={false}
      title="Exam result"
      width={730}
      open={open}
      onOk={handleClose}
      onCancel={handleClose}>
      <Spin spinning={isLoading}>
        <ModalHeader
          progress={point}
          avatar={profile?.avatar}
          level={data?.level?.name}
          last_name={profile?.last_name}
          first_name={profile?.first_name}
          status={data?.status}
        />

        <Overal
          components={[
            ...(main?.components || []),
            ...(speaking?.components || []),
          ]}
        />

        {/* <Affix offsetTop={120}> */}
          <Segmented
            block
            options={tabs}
            initValue={`${EXAMINATION_PART.GRAMMAR}`}
          />
        {/* </Affix> */}
      </Spin>

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

export default StudentExamResultModal;
