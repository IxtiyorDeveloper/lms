import React from "react";
import { Wrapper } from "./style";
import { Button, MailSvg } from "components";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { CheckPermission } from "../../../../../../../utils";
import { COMPONENTS_VIEWS } from "../../../../../../../constants/permissions";
import { CallSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "../../../../../../../styles/theme";

const MessageFilter = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <Button
        onClick={() => {
          dispatch(
            toggleModal({
              key: "groupSms",
              data: {
                data: {
                  filter: "lost",
                  extra: {
                    tab_id: -700,
                  },
                },
                open: true,
              },
            }),
          );
        }}
      >
        <MailSvg width={20} height={20} />
      </Button>
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
                    filter: "lost",
                    extra: {
                      tab_id: -700,
                    },
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
