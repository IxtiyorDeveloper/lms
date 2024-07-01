import {
  ActivateUserSvg,
  AddUserCircleSvg,
  ColoredNotRespondedSvg,
  CreateNoteSvg,
  EditSvg,
  RepeatSvg,
  SquareXSvg,
  UserCirculateSvg,
} from "components";
import { IconWrapper } from "./style";
import { bgColors } from "styles/theme";
import { StaffScenarios } from "constants/staff";

export const ActionIcons = ({ value }: { value: StaffScenarios }) => {
  const elements = () =>
    ({
      // [CandidateAction.CALL]: (
      //   <IconWrapper color={bgColors.midori}>
      //     <CallOutlineSvg color={bgColors.white} />
      //   </IconWrapper>
      // ),
      // [StaffScenarios.SEND_SMS]: (
      //   <IconWrapper color={bgColors.primary}>
      //     <FilledSmsSvg color={bgColors.dark} />
      //   </IconWrapper>
      // ),
      [StaffScenarios.CREATE_ADMIN]: (
        <IconWrapper color={bgColors.eucalyptus}>
          <AddUserCircleSvg color={bgColors.white} />
        </IconWrapper>
      ),
      [StaffScenarios.UPDATE_ADMIN]: (
        <IconWrapper color={bgColors.orange}>
          <EditSvg color={bgColors.white} />
        </IconWrapper>
      ),
      [StaffScenarios.ACTIVATE_STAFF]: (
        <IconWrapper color={bgColors.primary}>
          <ActivateUserSvg />
        </IconWrapper>
      ),
      [StaffScenarios.FIRE_STAFF]: (
        <IconWrapper color={bgColors.pop}>
          <SquareXSvg color={bgColors.white} />
        </IconWrapper>
      ),
      [StaffScenarios.REPOSITION_STAFF]: (
        <IconWrapper color={bgColors.royal}>
          <UserCirculateSvg color={bgColors.white} width={20} height={20} />
        </IconWrapper>
      ),
      [StaffScenarios.CANCEL_FIRE_STAFF]: (
        <IconWrapper color={bgColors.primary}>
          <ActivateUserSvg color={bgColors.dark} width={20} height={20} />
        </IconWrapper>
      ),
    }[value]);

  return elements();
};
