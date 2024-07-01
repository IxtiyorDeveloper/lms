import {
  ActivateUserSvg,
  AddUserSvg,
  ArrowBigSvg,
  EditSvg,
  SquareXSvg,
} from "components";
import moment from "moment";
import { Flex } from "antd";
import { bgColors, textColors } from "styles/theme";
import { ActionInfoWrapper } from "./style";
import { StaffScenarios } from "constants/staff";
import { IStaffLifeCycle } from "types/staffSettings";
import { DATE_FORMAT_SHOW_MMMM_YYYY } from "constants/dates";

const ActionInfo = ({
  data,
  action,
}: {
  data: IStaffLifeCycle | undefined;
  action: StaffScenarios;
}) => {
  const elements = () =>
    ({
      // [CandidateAction.CALL]: (
      //   <ActionInfoWrapper bgColor={bgColors.midori}>
      //     <CallOutlineSvg width={16} height={16} color={bgColors.white} />
      //     <p>Call</p>
      //   </ActionInfoWrapper>
      // ),
      [StaffScenarios.CREATE_ADMIN]: (
        <ActionInfoWrapper bgColor={bgColors.midori}>
          <AddUserSvg color={bgColors.white} />
          <p>Staff created</p>
        </ActionInfoWrapper>
      ),
      [StaffScenarios.CANCEL_FIRE_STAFF]: (
        <ActionInfoWrapper bgColor={bgColors.primary} color={textColors.dark}>
          <ActivateUserSvg color={bgColors.dark} />
          <p>Cancel stopping</p>
        </ActionInfoWrapper>
      ),
      [StaffScenarios.UPDATE_ADMIN]: (
        <ActionInfoWrapper bgColor={bgColors.orange}>
          <EditSvg color={bgColors.white} width={14} height={14} />
          <p>Staff edited</p>
        </ActionInfoWrapper>
      ),
      [StaffScenarios.ACTIVATE_STAFF]: (
        <ActionInfoWrapper bgColor={bgColors.primary} color={textColors.dark}>
          <ActivateUserSvg color={bgColors.dark} width={16} height={16} />
          <p>Activate</p>
        </ActionInfoWrapper>
      ),
      [StaffScenarios.FIRE_STAFF]: (
        <ActionInfoWrapper bgColor={bgColors.pop} color={textColors.white}>
          <SquareXSvg color={bgColors.white} width={14} height={14} />
          <p>
            Dismissal: Stop date {">"}{" "}
            {moment(data?.data?.fired_date).format(DATE_FORMAT_SHOW_MMMM_YYYY)}
          </p>
        </ActionInfoWrapper>
      ),
      [StaffScenarios.REPOSITION_STAFF]: (
        <Flex align="center" gap={6}>
          <ActionInfoWrapper bgColor={bgColors.sadet} color={textColors.white}>
            <p>
              Work period:
              {` ${moment(data?.data?.work_period?.end_date).format(
                DATE_FORMAT_SHOW_MMMM_YYYY
              )} > ${moment(data?.data?.work_period?.start_date).format(
                DATE_FORMAT_SHOW_MMMM_YYYY
              )} `}
            </p>
          </ActionInfoWrapper>
          <ArrowBigSvg width={14} height={14} />
          <ActionInfoWrapper bgColor={bgColors.midori} color={textColors.white}>
            <p>
              Repositioned date:
              {` ${moment(data?.data?.rehired_date).format(
                DATE_FORMAT_SHOW_MMMM_YYYY
              )}`}
            </p>
          </ActionInfoWrapper>
        </Flex>
      ),
      // [StaffScenarios.SEND_SMS]: (
      //   <ActionInfoWrapper bgColor={bgColors.primary} color={textColors.dark}>
      //     <FilledSmsSvg width={14} height={14} color={bgColors.dark} />
      //     <p>SMS</p>
      //   </ActionInfoWrapper>
      // ),
    }[action]);

  return elements();
};

export default ActionInfo;
