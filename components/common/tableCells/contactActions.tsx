import React from "react";
import {
  Attend,
  Block,
  Call,
  DeleteCircle,
  Mail,
  Qr,
  ReturnStudent,
  Stop,
  Transfer,
  TransferBack,
  Unban,
  Unblock,
  // Practicum,
  CheckPaper,
  SmsBlackList,
  Ielts,
} from "components";
import { studentDeleteType, TParams, TStatuses } from "types";
import { IconWrapper } from "./style";
import { toggleModal, useAppSelector } from "store";
import { useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";
import { CheckPermission, funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import Link from "next/link";
import { objToQueryString } from "utils/objectToQueryString";
import { toast } from "react-toastify";
import _ from "lodash";
import { CALL_QUERY_NAME } from "../../../constants";
import PaymentRequest from "components/elements/actions/paymentRequest";
import { IStationaryHistoryData, OneStudent } from "types/student";
import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
} from "constants/studentStatuses";
import GiveBook from "../../elements/actions/giveBook";
import GiveNotebook from "../../elements/actions/giveNotebook";
import env from "utils/env";
import { startCall } from "utils/call";
import { Tooltip } from "antd";

export enum UserType {
  user = "user",
  contact = "contact",
}
function replaceText(text: string) {
  // Replace underscores with spaces
  text = text.replace(/_/g, " ");

  // Replace camelCase with space before uppercase letters
  text = text.replace(/([a-z])([A-Z])/g, "$1 $2");

  return text;
}
const CellActions = ({
  groupContactId,
  data,
  size = "small",
  activeActions,
  queryKeys,
  extra,
  userType = UserType.contact,
  onlyChoices,
  student,
  deleteStudentType = studentDeleteType.stopping,
  stationaryHistory,
  className,
}: {
  groupContactId?: number;
  data?: any;
  size?: "small" | "medium";
  activeActions?: any;
  permissionActions?: TParams;
  stationaryHistory?: IStationaryHistoryData;
  queryKeys?: string[];
  extra?: { [key: string]: { [key: string]: any } } | { [key: string]: any };
  userType?: UserType;
  student?: OneStudent;
  onlyChoices?: TParams;
  deleteStudentType?: studentDeleteType;
  className?: string;
}) => {
  const status: TStatuses = data?.status;
  const id = groupContactId ?? data?.id;
  const userId = data?.user_id ?? data?.user?.id;
  const groupId = data?.group?.id || data?.groupId;
  const router = useRouter();
  const dispatch = useDispatch();

  const onCallButtonPress = (phone_number: string) => {
    try {
      // window.open(`tell:${phone_number}`, "_blank");
      startCall(`sip:${phone_number as string}@${env.pbxUrl}`);
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  const handleMoveTransfer = () => {
    if (data?.permissionActions?.can_work_balance) {
      return (
        <Link
          key={`transfer_${userId}_key`}
          href={`/transfer/${data?.user?.id}/${
            data?.group?.id || data?.groupId
          }/${data?.id}?action=transfer&${objToQueryString(
            data?.permissionActions,
          )}`}
        >
          <Transfer key={`${Math.random()}_${userId}_key`} size={size} />
        </Link>
      );
    } else {
      // if (onlyChoices?.move) {
      if (
        status?.toString() == NEW_STUDENT_ATTENDED ||
        status?.toString() == NEW_STUDENT_NOT_ATTENDED
      ) {
        return (
          <Link
            key={`transfer_${userId}_key`}
            href={`/transfer/${data?.user?.id}/${
              data?.group?.id || data?.groupId
            }/${data?.id}?action=move&${objToQueryString(
              data?.permissionActions,
            )}`}
          >
            <Transfer key={`${Math.random()}_${userId}_key`} size={size} />
          </Link>
        );
      } else {
        return (
          <Transfer
            key={`${Math.random()}_${userId}_key`}
            size={size}
            onClick={() =>
              dispatch(
                toggleModal({
                  key: "moveTransfer",
                  data: {
                    open: true,
                    data: {
                      moveUrl: `/transfer/${data?.user?.id}/${
                        data?.group?.id || data?.groupId
                      }/${data?.id}?action=move&${objToQueryString(
                        data?.permissionActions,
                      )}`,
                      transferUrl: `/transfer/${data?.user?.id}/${
                        data?.group?.id || data?.groupId
                      }/${data?.id}?action=transfer&${objToQueryString(
                        data?.permissionActions,
                      )}`,
                      queryKeys: queryKeys,
                      permissionActions: data.permissionActions,
                      student: data,
                    },
                  },
                }),
              )
            }
          />
        );
      }
    }
  };
  const elements: TParams = {
    qr: <Qr size={size} key={`qr_${userId}_key`} />,
    // sms: <Mail size={size} />,
    call: (
      <Call
        size={size}
        key={`call_${userId}_key`}
        onClick={onCallButtonPress}
        value={data?.user?.userPhones || []}
      />
    ),
    stop: (
      <Stop
        key={`stop_${userId}_key`}
        size={size}
        onClick={() =>
          dispatch(
            toggleModal({
              key: "stopping",
              data: {
                open: true,
                data: {
                  id: id,
                  status: status,
                  queryKeys: queryKeys,
                  student: data,
                  permissionActions: data?.permissionActions,
                },
              },
            }),
          )
        }
      />
    ),
    new_student_stop: (
      <Stop
        key={`new_student_stop_${userId}_key`}
        size={size}
        onClick={() =>
          dispatch(
            toggleModal({
              key: "new_students_stop",
              data: {
                open: true,
                data: {
                  id: id,
                  status: status,
                  queryKeys: queryKeys,
                  permissionActions: data?.permissionActions,
                  student: data,
                },
              },
            }),
          )
        }
      />
    ),
    book: (
      <GiveBook
        key={`book_${userId}_key`}
        size={size}
        data={stationaryHistory?.["100"]}
        userId={userId}
        queryKeys={queryKeys}
      />
    ),
    notebook: (
      <GiveNotebook
        key={`notebook_${userId}_key`}
        size={size}
        data={stationaryHistory?.["200"]}
        userId={userId}
        queryKeys={queryKeys}
      />
    ),
    ...(funcCheckPermission([COMPONENTS_VIEWS.can_transfer_student])
      ? {
          transfer: handleMoveTransfer(),
        }
      : { transfer: <></> }),
    attend: (
      <Attend
        key={`attend_${userId}_key`}
        size={size}
        onClick={() =>
          dispatch(
            toggleModal({
              key: "attend",
              data: {
                open: true,
                data: {
                  id: id,
                  type: "add",
                  queryKeys: queryKeys,
                  student: data,
                },
              },
            }),
          )
        }
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
            }),
          )
        }
      />
    ),
    transfer_back: (
      <TransferBack
        key={`transfer_back_${userId}_key`}
        size={size}
        onClick={() =>
          dispatch(
            toggleModal({
              key: "transferBack",
              data: {
                open: true,
                data: {
                  id: data?.id,
                  queryKeys: queryKeys,
                  student: data,
                },
              },
            }),
          )
        }
      />
    ),
    activate: (
      <ReturnStudent
        key={`activate_${userId}_key`}
        onClick={() =>
          dispatch(
            toggleModal({
              key: "returnModal",
              data: {
                open: true,
                data: {
                  user_id: userId,
                  group_id: groupId,
                  id: id,
                  group_contact_id: id,
                  queryKeys: queryKeys,
                  permissionActions: data.permissionActions,
                  student: data,
                  status,
                },
              },
            }),
          )
        }
        size={size}
      />
    ),
    waiting_list_delete: (
      <DeleteCircle
        key={`waiting_list_delete_${userId}_key`}
        size={size}
        onClick={() => {
          dispatch(
            toggleModal({
              key: "deleteModal",
              data: {
                data: {
                  groupContactId: id,
                  type: studentDeleteType.regular,
                  id: userId,
                  queryKeys: queryKeys,
                  fields: extra?.["delete"],
                  student: data,
                },
                open: true,
              },
            }),
          );
        }}
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
                  student: data,
                  id: userId,
                  groupContactId: id,
                  type: deleteStudentType,
                  isFromStudentProfile: extra?.["isFromStudentProfile"],
                  queryKeys: queryKeys,
                  fields: extra?.delete,
                },
                open: true,
              },
            }),
          );
        }}
      />
    ),
    account_block: (
      <Block
        key={`account_block_${userId}_key`}
        size={size}
        onClick={() =>
          dispatch(
            toggleModal({
              key: "block",
              data: {
                data: {
                  id: id,
                  queryKeys: queryKeys,
                  student: data,
                },
                open: true,
              },
            }),
          )
        }
      />
    ),
    account_unblock: (
      <Unblock
        key={`account_unblock_${userId}_key`}
        size={size}
        onClick={() =>
          dispatch(
            toggleModal({
              key: "unblock",
              data: {
                data: {
                  id: id,
                  queryKeys: queryKeys,
                  student: data,
                },
                open: true,
              },
            }),
          )
        }
      />
    ),
    attend_back: (
      <Attend
        key={`attend_back_${userId}_key`}
        size={size}
        onClick={() =>
          dispatch(
            toggleModal({
              key: "attend",
              data: {
                open: true,
                data: {
                  student: data,
                  id: id,
                  type: "remove",
                  queryKeys: queryKeys,
                },
              },
            }),
          )
        }
        value={true}
      />
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
                  id,
                  filter: UserType.user === userType ? "student" : "contact",
                  sent_field_name:
                    UserType.user === userType ? "user_id" : "id",
                },
                open: true,
              },
            }),
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
                  id,
                  filter: UserType.user === userType ? "student" : "contact",
                  sent_field_name:
                    UserType.user === userType ? "user_id" : "id",
                },
                open: true,
              },
            }),
          );
        }}
      />
    ),
    paymentRequest: (
      <PaymentRequest
        key={`sms_${userId}_key`}
        size={size}
        onClick={() => {
          dispatch(
            toggleModal({
              key: "paymentRequest",
              data: {
                data: {
                  student: student,
                  id: id,
                  queryKeys: queryKeys,
                },
                open: true,
              },
            }),
          );
        }}
      />
    ),
    practicum: <Ielts size="medium" userId={userId} />,
    checkPaper: (
      <CheckPaper
        key={`check_${userId}_action`}
        size="medium"
        onClick={() =>
          router.replace({
            pathname: Router.pathname,
            query: { ...router.query, user_id: userId, firstEntrance: "true" },
          })
        }
      />
    ),
    smsBlackList: (
      <CheckPermission
        permission={[COMPONENTS_VIEWS.can_create_sms_black_list]}
      >
        <SmsBlackList
          key={`sms_black_list_${userId}_action`}
          size="medium"
          onClick={() =>
            router.replace({
              pathname: Router.pathname,
              query: { ...router.query, user_id: userId, smsBlackList: "true" },
            })
          }
        />
      </CheckPermission>
    ),
  };

  return (
    <IconWrapper className={className}>
      {Object.entries(activeActions ?? {})
        ?.map(([key, value]) => ({ key, value }))
        ?.map((item) => {
          if (item.value) {
            return (
              <Tooltip
                destroyTooltipOnHide
                title={replaceText(item.key)}
                key={item.key}
              >
                <div>{elements[item.key]}</div>
              </Tooltip>
            );
          }
        })}
    </IconWrapper>
  );
};

export default CellActions;
