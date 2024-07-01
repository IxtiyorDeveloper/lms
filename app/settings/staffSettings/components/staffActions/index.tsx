import { TParams } from "types";
import { useDispatch } from "react-redux";
import React, { useMemo } from "react";
import {
  Ban,
  Call,
  EditAction,
  Mail,
  ShareResumeAction,
  StaffCreateAction,
  StaffSms,
} from "components";
import { toggleModal, useAppSelector } from "store";
import Link from "next/link";
import { IconWrapper, Wrapper } from "./style";
import _ from "lodash";
import { toast } from "react-toastify";
import { Popover } from "antd";
import env from "utils/env";
import { startCall } from "utils/call";

const StaffAction = ({
  data,
  size = "small",
  activeActions,
  queryKeys,
  extra,
}: {
  groupContactId?: number;
  data?: any;
  size?: "small" | "medium";
  activeActions?: TParams;
  permissionActions?: TParams;
  queryKeys?: string[];
  extra?: { [key: string]: { [key: string]: any } } | { [key: string]: any };
}) => {
  const userId = data?.user_id ?? data?.user?.id ?? data?.id;
  const user = data?.user;
  const dispatch = useDispatch();
  const sip = useAppSelector((state) => state.sip.sip);

  const onCallButtonPress = (phone_number: string) => {
    try {
      // window.open(
      //   `${router.asPath}${
      //     _.isEmpty(router.query) ? "?" : "&"
      //   }${CALL_QUERY_NAME}=${phone_number}`,
      //   "_blank",
      // );
      startCall(`sip:${phone_number as string}@${env.pbxUrl}`);
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  const elements: TParams = useMemo(() => {
    return {
      share_file: (
        <Link href={`/settings/staff-settings/create-candidate/${userId}`}>
          <ShareResumeAction size="small" isFilled={data?.is_filled} />
        </Link>
      ),
      call: (
        <Call
          size={size}
          key={`call_${userId}_key`}
          onClick={onCallButtonPress}
          value={(data?.user?.userPhones ?? data?.userPhones) || []}
        />
      ),
      ban_manual: (
        <Ban
          key={`ban_${userId}_key`}
          size={size}
          onClick={() =>
            dispatch(
              toggleModal({
                key: "ban",
                data: {
                  open: true,
                  data: {
                    id: userId,
                    queryKeys: queryKeys,
                    student: data,
                  },
                },
              })
            )
          }
        />
      ),
      update: (
        <Link
          href={`/student/create-student?type=update&id=${userId}`}
          key={`update_${userId}_key`}
        >
          <EditAction size={size} />
        </Link>
      ),
      mail: (
        <Popover
          destroyTooltipOnHide
          placement="bottom"
          trigger="hover"
          content={() => (
            <Wrapper>
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
              <StaffSms
                key={`mail_staff_${userId}_key`}
                size={size}
                onClick={() => {
                  dispatch(
                    toggleModal({
                      key: "requestConfirmModal",
                      data: {
                        data: {
                          userId: userId,
                          userAvatar: user?.userProfile?.avatar,
                          userFullName: `${user?.userProfile?.firstname} ${user?.userProfile?.lastname}`,
                        },
                        open: true,
                      },
                    })
                  );
                }}
              />
            </Wrapper>
          )}
        >
          <div>
            <Mail key={`mail_${userId}_key1`} size={size} />
          </div>
        </Popover>
      ),
      create_staff: (
        <StaffCreateAction
          disabled={!data?.is_filled}
          key={`sms_${userId}_key`}
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
    };
  }, [extra, userId, data]);

  return (
    <IconWrapper>
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
