import {
  AddUserSvg,
  ArrowBigSvg,
  CallOutlineSvg,
  CallRequestSvg,
  ClosedCalendarSvg,
  ColoredNotRespondedSvg,
  CreateNoteSvg,
  EditSvg,
  FilledSmsSvg,
  MeetingSvg,
  MergeSvg,
  PaintSvg,
} from "components";
import moment from "moment";
import { Flex } from "antd";
import { InitialDataHR } from "types";
import { CandidateAction, CandidateStatus } from "constants/hr";
import { bgColors, textColors } from "styles/theme";
import { ILifecycleOptions } from "types/lifeCycle";
import { ActionInfoWrapper } from "./style";
import Color from "./color";

const ActionInfo = ({
  data,
  action,
  initialData,
}: {
  data: ILifecycleOptions | undefined;
  initialData: InitialDataHR | undefined;
  action: CandidateAction;
}) => {
  const stages = initialData?.stageList;

  const oldColor =
    stages?.find((item) => item.value === data?.old_attributes?.stage)?.color ??
    Color({ status: data?.old_attributes?.status });

  const newColor =
    stages?.find((item) => item.value === data?.new_attributes?.stage)?.color ??
    Color({ status: data?.new_attributes?.status });

  const elements = () =>
    ({
      [CandidateAction.ABS]: (
        <ActionInfoWrapper bgColor={bgColors.primary} color={textColors.dark}>
          <ClosedCalendarSvg color={bgColors.dark} width={16} height={16} />
          <p>Absent</p>
        </ActionInfoWrapper>
      ),
      [CandidateAction.CALL]: (
        <ActionInfoWrapper bgColor={bgColors.midori}>
          <CallOutlineSvg width={16} height={16} color={bgColors.white} />
          <p>Call</p>
        </ActionInfoWrapper>
      ),
      [CandidateAction.CALL_REQUEST]: (
        <ActionInfoWrapper bgColor={bgColors.midori}>
          <CallRequestSvg width={14} height={14} color={bgColors.white} />
          <p>Call request</p>
        </ActionInfoWrapper>
      ),
      [CandidateAction.CREATE]: (
        <ActionInfoWrapper bgColor={bgColors.midori}>
          <AddUserSvg color={bgColors.white} />
          <p>Candidate created</p>
        </ActionInfoWrapper>
      ),
      [CandidateAction.EDIT]: (
        <ActionInfoWrapper bgColor={bgColors.orange}>
          <EditSvg color={bgColors.white} width={14} height={14} />
          <p>Candidate edited</p>
        </ActionInfoWrapper>
      ),
      [CandidateAction.EDIT_COMMENT]: (
        <ActionInfoWrapper bgColor={bgColors.pumpkin}>
          <CreateNoteSvg color={bgColors.white} width={14} height={14} />
          <p>Comment changed</p>
        </ActionInfoWrapper>
      ),
      [CandidateAction.MOVE]: (
        <Flex align="center" gap={6}>
          <ActionInfoWrapper
            bgColor={oldColor}
            color={
              oldColor?.includes(bgColors.purpleCrystal)
                ? textColors.dark
                : textColors.white
            }>
            <p>
              {data?.old_status}
              {data?.old_status && data?.old_stage && " > "}
              {data?.old_stage}
            </p>
          </ActionInfoWrapper>
          <ArrowBigSvg width={14} height={14} />
          <ActionInfoWrapper
            bgColor={newColor}
            color={
              newColor?.includes(bgColors.purpleCrystal)
                ? textColors.dark
                : textColors.white
            }>
            <p>
              {data?.new_status}
              {data?.new_status && data?.new_stage && " > "}
              {data?.new_stage}
            </p>
          </ActionInfoWrapper>
        </Flex>
      ),
      [CandidateAction.NOT_ANSWERED]: (
        <ActionInfoWrapper bgColor={bgColors.pop}>
          <ColoredNotRespondedSvg
            color={bgColors.white}
            width={14}
            height={14}
          />
          <p>Not answered</p>
        </ActionInfoWrapper>
      ),
      [CandidateAction.SEND_SMS]: (
        <ActionInfoWrapper bgColor={bgColors.primary} color={textColors.dark}>
          <FilledSmsSvg width={14} height={14} color={bgColors.dark} />
          <p>SMS</p>
        </ActionInfoWrapper>
      ),
      [CandidateAction.SET_MEETING]: (
        <ActionInfoWrapper bgColor={bgColors.deep}>
          <MeetingSvg width={16} height={16} color={bgColors.white} />
          <p>
            Meeting (
            {data?.new_meeting &&
              moment(data?.new_meeting.datetime).format("YYYY-MM-DD | HH:mm")}
            )
          </p>
        </ActionInfoWrapper>
      ),
      [CandidateAction.CLEAR_MEETING]: (
        <ActionInfoWrapper bgColor={bgColors.pop}>
          <MeetingSvg width={16} height={16} color={bgColors.white} />
          <p>
            Cancelled Meeting (
            {data?.old_meeting &&
              moment(data?.old_meeting.datetime).format("YYYY-MM-DD | HH:mm")}
            )
          </p>
        </ActionInfoWrapper>
      ),
      [CandidateAction.COLOR_CHANGED]: (
        <Flex align="center" gap={6}>
          <ActionInfoWrapper bgColor={bgColors.deep}>
            <PaintSvg width={16} height={16} color={bgColors.white} />
            <p>Color changed</p>
          </ActionInfoWrapper>
        </Flex>
      ),
      [CandidateAction.MERGE]: (
        <Flex align="center" gap={6}>
          <ActionInfoWrapper bgColor={bgColors.orange}>
            <MergeSvg width={16} height={16} color={bgColors.white} />
            <p>Candidate merged</p>
          </ActionInfoWrapper>
        </Flex>
      ),
    }[action]);

  return elements();
};

export default ActionInfo;
