import { Flex, Spin, Timeline } from "antd";
import {
  AntdModal,
  AntdSwitch,
  Button,
  CircleImage,
  LoadingSvg,
  PhoneCell,
} from "components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IStore, toggleModal } from "store";
import { useCandidateLifecycle, useGetHRInitialData } from "hooks";
import {
  CandidateInfo,
  CandidateName,
  CandidateVacancy,
  Label,
  TimeLineWrapper,
} from "./style";
import { ICandidate } from "types";
import { Items } from "./items";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { CandidateHistoryType } from "constants/hr";
import moment from "moment";
import { DATE_FORMAT_DD_MM_YYYY } from "constants/dates";

const CandidateLifecycleModal = () => {
  const dispatch = useDispatch();
  const { control, reset, watch } = useForm();
  const {
    candidateLifecycle: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const candidate = data?.candidate as ICandidate;

  const { data: lifecycle, isLoading } = useCandidateLifecycle({
    query_params: {
      id: candidate?.id,
    },
    enabled: !!candidate?.id && open,
  });
  const { data: initialData } = useGetHRInitialData({
    enabled: open,
  });

  const handleClose = () => {
    reset();
    dispatch(
      toggleModal({
        key: "candidateLifecycle",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const lifecycleData = useMemo(() => {
    if (!watch("full_history")) {
      return lifecycle?.filter(
        (item) => item.type === CandidateHistoryType.MAIN
      );
    }
    return lifecycle;
  }, [lifecycle, watch("full_history")]);

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      width={1000}
      padding="24px 20px">
      <Spin spinning={isLoading}>
        <Flex justify="space-between" align="middle">
          <h4>Lifecycle</h4>
          <form>
            <Flex gap={10} align="center">
              <Label>Show full lifecycle</Label>
              <AntdSwitch control={control} name="full_history" />
            </Flex>
          </form>
        </Flex>

        <CandidateInfo>
          <Flex gap={16} align="middle">
            <CircleImage
              alt=""
              width={60}
              height={60}
              src={candidate?.candidateAvatar?.url ?? "/user.svg"}
            />

            <CandidateName>
              <h4>
                {candidate?.first_name} {candidate?.last_name} ({candidate?.age}
                )
              </h4>
              <Flex className="dob" align="center" gap={4}>
                <p>Date of birth:</p>
                <span>
                  {candidate?.dob &&
                    moment(candidate?.dob).format(DATE_FORMAT_DD_MM_YYYY)}
                </span>
              </Flex>
              <PhoneCell value={candidate?.candidatePhoneNumbers} />
            </CandidateName>
          </Flex>

          <CandidateVacancy>
            <LoadingSvg />

            {candidate?.vacancy?.title}
          </CandidateVacancy>
        </CandidateInfo>

        {!!lifecycleData?.length && (
          <TimeLineWrapper>
            <Timeline
              items={Items({
                data: lifecycleData,
                initialData,
              })}
            />
          </TimeLineWrapper>
        )}

        <Flex
          justify="flex-end"
          style={{
            marginTop: 40,
          }}>
          <Button bgColor={bgColors.wildSand} onClick={handleClose}>
            Cancel
          </Button>
        </Flex>
      </Spin>
    </AntdModal>
  );
};

export default CandidateLifecycleModal;
