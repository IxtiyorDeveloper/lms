import React, { useMemo } from "react";
import {
  BackToWaiting,
  Ban,
  Call,
  DeleteCircle,
  FirstLessonAction,
  Mail,
  RecommendedAction,
  Unban,
  EditAction,
} from "components";
import Link from "next/link";
import { studentDeleteType, TParams } from "types";
import { IconWrapper } from "../style";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { toast } from "react-toastify";
import { generateRecommendationData } from "./utils";
import env from "utils/env";
import { startCall } from "utils/call";

const CellActions = ({
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
  const router = useRouter();
  const dispatch = useDispatch();

  const onCallButtonPress = (phone_number: string) => {
    try {
      startCall(`sip:${phone_number as string}@${env.pbxUrl}`);
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  const elements: TParams = useMemo(() => {
    return {
      student_add: (
        <RecommendedAction
          size="small"
          onClick={() =>
            dispatch(
              toggleModal({
                key: "addToGroupModal",
                data: {
                  data: generateRecommendationData({ extra }),
                  open: true,
                },
              })
            )
          }
        />
      ),
      call: (
        <Call
          size={size}
          key={`call_${userId}_key`}
          onClick={onCallButtonPress}
          value={(data?.user?.userPhones ?? data?.userPhones) || []}
        />
      ),
      unban: (
        <Unban
          key={`unban_${userId}_key`}
          size={size}
          onClick={() =>
            dispatch(
              toggleModal({
                key: "unban",
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
      delete: (
        <DeleteCircle
          key={`delete_${userId}_key`}
          size={size}
          onClick={() => {
            dispatch(
              toggleModal({
                key: "deleteModal",
                data: {
                  data: {
                    type: studentDeleteType.regular,
                    id: userId,
                    queryKeys: queryKeys,
                    fields: extra?.["delete"],
                    student: data,
                  },
                  open: true,
                },
              })
            );
          }}
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
      ban: (
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
      ...(funcCheckPermission([COMPONENTS_VIEWS.can_add_contact_to_group])
        ? {
            recommendation: (
              <Link
                href={`/student/recommendation/${userId}`}
                key={`recommendation_${userId}_key`}
              >
                <RecommendedAction size={size} />
              </Link>
            ),
          }
        : {
            recommendation: <></>,
          }),
      back_to_waiting_list: (
        <Link
          href={`/student/create-student?type=update&id=${userId}&back_to_waiting_list=true`}
          key={`back_to_waiting_list_${userId}_key`}
        >
          <BackToWaiting
            size={size}
            key={`back_to_waiting_list_${userId}_key`}
          />
        </Link>
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
      sms: (
        <Mail
          key={`sms_${userId}_key`}
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
      first_lesson: (
        <FirstLessonAction
          key={`first_lesson_${userId}_key`}
          size={size}
          onClick={() =>
            router.replace({
              pathname: Router.pathname,
              query: { ...router.query, user_id: userId, firstLesson: "true" },
            })
          }
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

export default CellActions;
