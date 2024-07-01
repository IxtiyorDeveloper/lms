import React, { FC } from "react";
import { CreateStudentWrapper, StyledBox } from "./style";
import { Button, MailSvg, RedBadgeTitle } from "components";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { CallSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";

const CreateStudent: FC<{ count?: number }> = ({ count }) => {
  const dispatch = useDispatch();

  return (
    <CreateStudentWrapper>
      <RedBadgeTitle title="Birthday list" count={count} />
      <StyledBox>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_send_sms_to_waiting_list_students]}
        >
          <Button
            icon={<MailSvg />}
            onClick={() => {
              dispatch(
                toggleModal({
                  key: "groupSms",
                  data: {
                    data: {
                      filter: "student_birthday",
                    },
                    open: true,
                  },
                })
              );
            }}
          />
        </CheckPermission>
        <CheckPermission permission={[COMPONENTS_VIEWS.can_call_user]}>
          <Button
            icon={<CallSvg width={20} height={20} color={bgColors.white} />}
            style={{
              backgroundColor: bgColors.midori,
            }}
            onClick={() => {
              dispatch(
                toggleModal({
                  key: "autoCall",
                  data: {
                    data: {
                      filter: "student_birthday",
                    },
                    open: true,
                  },
                })
              );
            }}
          />
        </CheckPermission>
      </StyledBox>
    </CreateStudentWrapper>
  );
};

export default CreateStudent;
