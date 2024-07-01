import React, { FC } from "react";
import { Wrapper } from "./style";
import { Button, FilesSvg, MailSvg } from "components";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { bgColors } from "styles/theme";
import { useRouter } from "next/router";
import { CallSvg } from "@jasurbekyuldashov/lms-web-icons";

const MessageFilter: FC<{ previous_place: number }> = ({ previous_place }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Wrapper>
      <CheckPermission permission={[COMPONENTS_VIEWS.can_export_phone_list]}>
        <Button
          icon={<FilesSvg width={20} height={20} color={bgColors.black} />}
          onClick={() => {
            dispatch(
              toggleModal({
                key: "redListDownload",
                data: {
                  data: {
                    filter: "archive",
                    search: { ...router.query, previous_place },
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
                    filter: "archive",
                    search: { ...router.query, previous_place },
                  },
                  open: true,
                },
              }),
            );
          }}
        />
      </CheckPermission>
      <CheckPermission permission={[COMPONENTS_VIEWS.can_send_sms]}>
        <Button
          icon={<MailSvg width={20} height={20} color={bgColors.black} />}
          onClick={() => {
            dispatch(
              toggleModal({
                key: "groupSms",
                data: {
                  data: {
                    filter: "archive",
                    search: { ...router.query, previous_place },
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
