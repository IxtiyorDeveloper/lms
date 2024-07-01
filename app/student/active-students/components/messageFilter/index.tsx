import React, { FC } from "react";
import { Wrapper } from "./style";
import { Button, FilesSvg, MailSvg } from "components";
import {
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { bgColors, textColors } from "styles/theme";
import { useRouter } from "next/router";
import { CallSvg } from "@jasurbekyuldashov/lms-web-icons";

interface IProps {
  status:
    | typeof STUDYING_STUDENT
    | typeof STOPPING_STUDENT
    | typeof TRANSFERRING_STUDENT;
}

const MessageFilter: FC<IProps> = ({ status }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Wrapper>
      <CheckPermission permission={[COMPONENTS_VIEWS.can_export_phone_list]}>
        <Button
          icon={<FilesSvg width={20} height={20} color={bgColors.black} />}
          style={{
            padding: "0 24px",
            color: textColors.blueGray,
            fontWeight: 700,
            borderRadius: 10,
            lineHeight: "20px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
          onClick={() => {
            dispatch(
              toggleModal({
                key: "redListDownload",
                data: {
                  data: {
                    filter: "contact",
                    search: { ...router.query, status },
                  },
                  open: true,
                },
              }),
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
                    filter: "contact",
                    search: { ...router.query, status },
                  },
                  open: true,
                },
              }),
            );
          }}
        />
      </CheckPermission>
      <CheckPermission permission={[COMPONENTS_VIEWS.can_send_sms_to_students]}>
        <Button
          icon={<MailSvg width={20} height={20} color={bgColors.black} />}
          style={{
            padding: "0 24px",
            color: textColors.blueGray,
            fontWeight: 700,
            borderRadius: 10,
            lineHeight: "20px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
          onClick={() => {
            dispatch(
              toggleModal({
                key: "groupSms",
                data: {
                  data: {
                    filter: "contact",
                    search: { ...router.query, status },
                  },
                  open: true,
                },
              }),
            );
          }}
        />
      </CheckPermission>
    </Wrapper>
  );
};

export default MessageFilter;
