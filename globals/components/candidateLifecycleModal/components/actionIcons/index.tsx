import { CandidateAction } from "constants/hr";
import {
  AddUserCircleSvg,
  CallOutlineSvg,
  CallRequestSvg,
  ClosedCalendarSvg,
  ColoredNotRespondedSvg,
  CreateNoteSvg,
  EditSvg,
  FilledSmsSvg,
  MeetingSvg,
  MergeSvg,
  PaintSecondSvg,
  RepeatSvg,
} from "components";
import { IconWrapper } from "./style";
import { bgColors } from "styles/theme";

export const ActionIcons = ({ value }: { value: CandidateAction }) => {
  const elements = () =>
    ({
      [CandidateAction.ABS]: (
        <IconWrapper color={bgColors.primary}>
          <ClosedCalendarSvg color={bgColors.dark} />
        </IconWrapper>
      ),
      [CandidateAction.CALL]: (
        <IconWrapper color={bgColors.midori}>
          <CallOutlineSvg color={bgColors.white} />
        </IconWrapper>
      ),
      [CandidateAction.CALL_REQUEST]: (
        <IconWrapper color={bgColors.midori}>
          <CallRequestSvg color={bgColors.white} />
        </IconWrapper>
      ),
      [CandidateAction.CREATE]: (
        <IconWrapper color={bgColors.eucalyptus}>
          <AddUserCircleSvg color={bgColors.white} />
        </IconWrapper>
      ),
      [CandidateAction.EDIT]: (
        <IconWrapper color={bgColors.orange}>
          <EditSvg color={bgColors.white} />
        </IconWrapper>
      ),
      [CandidateAction.EDIT_COMMENT]: (
        <IconWrapper color={bgColors.pumpkin}>
          <CreateNoteSvg color={bgColors.white} />
        </IconWrapper>
      ),
      [CandidateAction.MOVE]: (
        <IconWrapper color={bgColors.blueGray}>
          <RepeatSvg color={bgColors.white} />
        </IconWrapper>
      ),
      [CandidateAction.NOT_ANSWERED]: (
        <IconWrapper color={bgColors.pop}>
          <ColoredNotRespondedSvg
            color={bgColors.white}
            width={20}
            height={20}
          />
        </IconWrapper>
      ),
      [CandidateAction.SEND_SMS]: (
        <IconWrapper color={bgColors.primary}>
          <FilledSmsSvg color={bgColors.dark} />
        </IconWrapper>
      ),
      [CandidateAction.SET_MEETING]: (
        <IconWrapper color={bgColors.deep}>
          <MeetingSvg color={bgColors.white} />
        </IconWrapper>
      ),
      [CandidateAction.CLEAR_MEETING]: (
        <IconWrapper color={bgColors.pop}>
          <MeetingSvg color={bgColors.white} />
        </IconWrapper>
      ),
      [CandidateAction.COLOR_CHANGED]: (
        <IconWrapper color={bgColors.deep}>
          <PaintSecondSvg color={bgColors.white} />
        </IconWrapper>
      ),
      [CandidateAction.MERGE]: (
        <IconWrapper color={bgColors.orange}>
          <MergeSvg color={bgColors.white} />
        </IconWrapper>
      ),
    }[value]);

  return elements();
};
