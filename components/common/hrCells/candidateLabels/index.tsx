import moment from "moment/moment";
import { IconWrapper } from "./style";
import { toast } from "react-toastify";
import { ICandidate, TStatuses } from "types";
import { useQueryClient } from "@tanstack/react-query";
import { ACTION_CALL, ACTION_R_CALL, MEETING } from "constants/labels";
import { CallRequest, LifeCycleLabel, NotAnswered, Paint } from "components";
import {
  useCallRequestCandidate,
  useChangeColorCandidate,
  useNotAnsweredCandidate,
} from "hooks";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MMM_HH_mm,
  DATE_FORMAT_YYYY_MM_DD_HH_mm,
} from "constants/dates";
import { toggleModal } from "store";
import { updateList } from "./updateList";
import { useDispatch } from "react-redux";
import { validationErrorHandler } from "utils";
import { ACTION_CALL_BACK } from "constants/lifeCycle";
import Meeting from "components/elements/labels/meeting";
import { CandidateStatus } from "constants/hr";
import { UserLabel } from "types/userLabel";
import { hrRowColors } from "constants/colors";

const CandidateLabels = ({
  data,
  queryKeys = [],
  size = "small",
  className,
  isSelectableNoneColor = false,
}: {
  status?: TStatuses;
  data?: ICandidate;
  queryKeys?: string[];
  size?: "medium" | "small";
  className?: string;
  tableKey?: string;
  isSelectableNoneColor?: boolean;
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const id = data?.id;
  const isCandidate =
    data?.status === CandidateStatus.APPLICANT ? "Applicant" : "Candidate-";

  const labelPermissions = data?.labelPermissions ?? {};
  const candidateLabels = data?.candidateLabels;

  const notAnswer = candidateLabels?.find?.((e) => e.type === ACTION_R_CALL);

  const callRequest = candidateLabels?.find((e) => e.type === ACTION_CALL);
  const meeting = candidateLabels?.find((e) => e.type === MEETING);

  const paintObject = !isSelectableNoneColor
    ? {
        isOpen: data?.color,
        colored: !!data?.color,
      }
    : {};

  const notAnswered = useNotAnsweredCandidate({
    onSuccess: (newData: ICandidate) => {
      toast.success(`Action changed`);
      queryClient.invalidateQueries({
        queryKey: [queryKeys],
      });
      updateList({
        queryKeys,
        queryClient,
        newData,
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const callRequestLabel = useCallRequestCandidate({
    onSuccess: (newData: ICandidate) => {
      toast.success(`Action changed`);
      updateList({
        queryKeys,
        queryClient,
        newData,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys,
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const changeColor = useChangeColorCandidate({
    onSuccess: (newData: ICandidate) => {
      toast.success(`${isCandidate} color changed`);
      updateList({
        queryKeys,
        queryClient,
        newData,
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onSubmitChangeColor = (id?: number, color?: string) => {
    changeColor.mutate({ id, color });
  };

  const handleClickCallBack = (action: number, date: Date | null) => {
    if (action === ACTION_CALL_BACK) {
      callRequestLabel.mutate({
        id,
        datetime: date
          ? moment(new Date(date)).format(DATE_FORMAT_YYYY_MM_DD_HH_mm)
          : null,
      });
    }
    if (action === ACTION_R_CALL) {
      notAnswered.mutate({
        id,
        date: date
          ? moment(new Date(date)).format(DATE_FORMAT_YYYY_MM_DD_HH_mm)
          : null,
      });
    }
  };

  const elements = {
    call_request: (
      <CallRequest
        key={`call_request_${id}_key`}
        createdBy={callRequest?.createdBy?.fullName}
        isOpen={!!callRequest}
        size={size}
        label={
          callRequest &&
          moment(callRequest.datetime, DATE_FORMAT_CREATED_AT).format(
            DATE_FORMAT_DD_MMM_HH_mm
          )
        }
        onChange={(date) => {
          handleClickCallBack(ACTION_CALL_BACK, date);
        }}
      />
    ),
    not_answered: (
      <NotAnswered
        key={`not_answered_${id}_key`}
        defaultValue={notAnswer as UserLabel | undefined}
        size={size}
        label={
          notAnswer &&
          moment(notAnswer.datetime, DATE_FORMAT_CREATED_AT).format(
            DATE_FORMAT_DD_MMM_HH_mm
          )
        }
        isOpen={!!notAnswer}
        onClick={() => handleClickCallBack(ACTION_R_CALL, new Date())}
      />
    ),

    change_color: (
      <Paint
        size={size}
        colors={hrRowColors}
        defaultColor={data?.color}
        key={`colour_change_${id}_key`}
        onSubmit={(color: string) => onSubmitChangeColor(id, color)}
        {...paintObject}
      />
    ),
    meeting: (
      <Meeting
        userId={id}
        size={size}
        meeting={meeting}
        isOpen={!!meeting}
        label={
          meeting &&
          moment(meeting.datetime, DATE_FORMAT_CREATED_AT).format(
            DATE_FORMAT_DD_MMM_HH_mm
          )
        }
        onClick={({ type, title }) => {
          dispatch(
            toggleModal({
              key: "meetingCandidateModal",
              data: {
                data: {
                  type,
                  title,
                  meeting,
                  candidate: data,
                },
                open: true,
              },
            })
          );
        }}
      />
    ),
    life_cycle: (
      <LifeCycleLabel
        key={`lifecycle_${id}_key`}
        size={size}
        onClick={() => {
          dispatch(
            toggleModal({
              key: "candidateLifecycle",
              data: {
                data: {
                  candidate: data,
                  queryKeys: queryKeys,
                },
                open: true,
              },
            })
          );
        }}
      />
    ),
  };

  return (
    <IconWrapper className={className}>
      <div className="label">
        {Object.entries(labelPermissions ?? {})
          ?.map(([key, value]) => ({ key, value }))
          ?.map((item, index) => {
            if (item.value) {
              return (
                <div key={index}>
                  {elements[item.key as keyof typeof elements]}
                </div>
              );
            }
          })}
      </div>
    </IconWrapper>
  );
};

export default CandidateLabels;
