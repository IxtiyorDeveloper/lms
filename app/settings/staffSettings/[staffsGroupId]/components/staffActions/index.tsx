import { TParams } from "types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import React, { useMemo } from "react";
import {
  Call,
  DismissAction,
  EditAction,
  Mail,
  RepositionAction,
  ReturnStudent,
  TransferBack,
} from "components";
import { toggleModal, useAppSelector } from "store";
import Link from "next/link";
import { IconWrapper } from "./style";
import _ from "lodash";
import { toast } from "react-toastify";
import { CALL_QUERY_NAME } from "../../../../../../constants";
import { TransferBackSvg } from "@jasurbekyuldashov/lms-web-icons";
import env from "utils/env";
import { startCall } from "utils/call";

const StaffAction = ({
  data,
  size = "small",
  activeActions,
  queryKeys,
  status,
  extra,
}: {
  groupContactId?: number;
  status?: number;
  data?: any;
  size?: "small" | "medium";
  activeActions?: TParams;
  permissionActions?: TParams;
  queryKeys?: string[];
  extra?: { [key: string]: { [key: string]: any } } | { [key: string]: any };
}) => {
  const user = data?.user;
  const userId = data?.user_d ?? data?.user?.id ?? data?.id;
  const dispatch = useDispatch();
  const onCallButtonPress = (phone_number: string) => {
    try {
      // window.open(
      //   `${router.asPath}${
      //     _.isEmpty(router.query) ? "?" : "&"
      //   }${CALL_QUERY_NAME}=${phone_number}`,
      //   "_blank"
      // );
      startCall(`sip:${phone_number as string}@${env.pbxUrl}`);
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  const elements: TParams = useMemo(() => {
    return {
      call: (
        <Call
          size={size}
          key={`call_${userId}_key`}
          onClick={onCallButtonPress}
          value={(data?.user?.userPhones ?? data?.userPhones) || []}
        />
      ),
      edit: (
        <Link
          href={{
            pathname: `/settings/staff-settings/edit-member/${userId}`,
            query: { status },
          }}
        >
          <EditAction size={size} />
        </Link>
      ),
      sms: (
        <Mail
          key={`mail_${userId}_key`}
          size={size}
          onClick={() => {
            dispatch(
              toggleModal({
                key: "selfSms",
                data: {
                  data: {
                    user_id: userId,
                    filter: "student",
                    sent_field_name: "user_id",
                  },
                  open: true,
                },
              })
            );
          }}
        />
      ),
      activate: (
        <ReturnStudent
          key={`activate_${userId}_key`}
          size={size}
          onClick={() => {
            dispatch(
              toggleModal({
                key: "staffCreate",
                data: {
                  data: {
                    userId,
                    user,
                    allData: data,
                  },
                  open: true,
                },
              })
            );
          }}
        />
      ),
      dismissal: (
        <DismissAction
          key={`dismissal_${userId}_key`}
          size={size}
          onClick={() => {
            dispatch(
              toggleModal({
                key: "dismissStaff",
                data: {
                  data: {
                    ...data,
                  },
                  open: true,
                },
              })
            );
          }}
        />
      ),
      reposition: (
        <RepositionAction
          key={`reposition_${userId}_key`}
          size={size}
          onClick={() => {
            dispatch(
              toggleModal({
                key: "repositionStaff",
                data: {
                  data: {
                    ...data,
                  },
                  open: true,
                },
              })
            );
          }}
        />
      ),
      ["cancel-dismissal"]: (
        <ReturnStudent
          key={`activate_${userId}_key`}
          size={size}
          onClick={() => {
            dispatch(
              toggleModal({
                key: "cancelDismassal",
                data: {
                  data: {
                    user_id: userId,
                    user,
                  },
                  open: true,
                },
              })
            );
          }}
        />
      ),
      ["cancel-reposition"]: (
        <TransferBack
          key={`cancelReposition_${userId}_key`}
          size={size}
          onClick={() => {
            dispatch(
              toggleModal({
                key: "cancelReposition",
                data: {
                  data: {
                    user_id: userId,
                    user,
                  },
                  open: true,
                },
              })
            );
          }}
        />
      ),
    };
  }, [extra, userId, data]);

  return (
    <IconWrapper onClick={(e) => e.stopPropagation()}>
      {Object.entries(activeActions ?? {})
        ?.map(([key, value]) => ({ key, value }))
        ?.map((item) => {
          if (item.value) {
            return elements[item.key];
          }
        })}
    </IconWrapper>
  );
};

export default StaffAction;
