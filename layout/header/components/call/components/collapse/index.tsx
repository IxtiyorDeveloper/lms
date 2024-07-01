import React, { useEffect, useMemo, useState } from "react";
import {
  Item,
  Items,
  MiniUserCardWrapper,
  UserStatusWrapper,
  Wrapper,
} from "./style";
import {
  ActivitySvg,
  Button,
  NewIncomingSvg,
  NewOutgoingSvg,
} from "components";
import { useOperatorHistory } from "hooks/useCall";
import _ from "lodash";
import moment from "moment";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_DD_MMM_YYYY,
} from "constants/dates";
import { useInView } from "react-intersection-observer";
import { useAppSelector } from "store";
import { IOperatorCallHistiry, StudentStat, StudentType } from "types";
import { ECallEventType } from "types/paymentList";
import { bgColors } from "styles/theme";
import { PhoneTypes } from "constants/phoneTypes";
import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRED_STUDENT,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";
import { toast } from "react-toastify";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function convertSecondsToTime(seconds: number) {
  const duration = moment.duration(seconds, "seconds");
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  const remainingSeconds = duration.seconds();

  return { hours, minutes, remainingSeconds };
}

const copyToClipboard = (phone: string | 0) => {
  if (!!phone)
    navigator.clipboard
      .writeText(phone)
      .then(() => {
        toast.info("Copied to clipboard");
      })
      .catch((err) => {
        toast.error(err.message);
      });
};

const directionTypeText = {
  100: "Answered",
  200: "Incall",
  300: "Local",
};

const eventTypeIcon = {
  100: <NewIncomingSvg color={bgColors.pop} />,
};

const directionTypeIcon = {
  200: <NewIncomingSvg />,
  100: <NewOutgoingSvg />,
  300: <></>,
};

const statusLabels = {
  [NEW_STUDENT_NOT_ATTENDED]: "Not attended",
  [NEW_STUDENT_ATTENDED]: "Attended",
  [STUDYING_STUDENT]: "Studying",
  [TRANSFERRING_STUDENT]: "Transferring",
  [TRANSFERRED_STUDENT]: "Transferred",
  [STOPPING_STUDENT]: "Stopping",
  unclear: "Unclear",
};

const identify = (user: any) => {
  if (+user?.type == StudentType.TYPE_BANNED) {
    return "Banned";
  }

  if (
    user?.status == StudentStat.STUDENT_WAITING ||
    user?.status == StudentStat.STUDENT_ARCHIVED
  ) {
    const obj = {
      [StudentStat.STUDENT_WAITING]: "Waiting",
      [StudentStat.STUDENT_ARCHIVED]: "Archived",
    };
    return obj[user?.status as keyof typeof obj];
  } else {
    return statusLabels[
      (user?.currentGroupContact?.status as keyof typeof statusLabels) ||
        user?.status
    ];
  }
};

type TUserType = "student" | "Staff" | "Lead" | "unknown";

export default function CollapseHistory() {
  const [isOpen, setIsOpen] = useState(false);

  const today = useMemo(() => {
    const r1 = moment();
    const r2 = moment().add(-1, "day");
    return {
      today: r1.format(DATE_FORMAT_DD_MMM_YYYY),
      yesterday: r2.format(DATE_FORMAT_DD_MMM_YYYY),
    };
  }, []);

  const userId = useAppSelector((state) => state.user?.user?.id);
  const { ref, inView } = useInView();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useOperatorHistory({
      query_params: {
        search: null,
        user_id: userId,
        expand: "clients",
      },
      enabled: isOpen,
    });

  useEffect(() => {
    inView && fetchNextPage();
  }, [inView]);

  const newData = useMemo(() => {
    const data1: any = [];
    data?.pages?.map((e) => e.list)?.map((e) => data1.push(...e));

    return _.groupBy(data1, (e) =>
      moment(e.created_at, DATE_FORMAT_CREATED_AT).format(
        DATE_FORMAT_DD_MMM_YYYY
      )
    );
  }, [data?.pages?.length]);

  return (
    <Wrapper isOpen={isOpen}>
      <div className="child">
        {isOpen && (
          <div>
            {_.map(newData, (value, key) => {
              return (
                <div className="item">
                  <div className="date-c">
                    <div className="date">
                      {key === today.today
                        ? "Today"
                        : key === today.yesterday
                          ? "Yesterday"
                          : key}
                    </div>
                  </div>
                  <Items>
                    {value.map((record: IOperatorCallHistiry) => {
                      const firstUser =
                        record.clients.students?.[0] ||
                        record.clients.staffs?.[0] ||
                        record.clients.leads?.[0];

                      const userType: TUserType = record.clients.students?.[0]
                        ? "student"
                        : record.clients.staffs?.[0]
                          ? "Staff"
                          : record.clients.leads?.[0]
                            ? "Lead"
                            : "unknown";

                      const len =
                        (record?.clients?.students || [])?.length +
                        (record?.clients?.leads || [])?.length +
                        (record?.clients?.staffs || [])?.length;

                      const { hours, minutes, remainingSeconds } =
                        convertSecondsToTime(record.duration);

                      const status =
                        userType === "student"
                          ? identify({
                              type: firstUser?.student_type,
                              status: firstUser?.student_status,
                              currentGroupContact: {
                                status:
                                  firstUser?.group_contact_status ||
                                  firstUser?.student_status,
                              },
                            } as any)
                          : userType;

                      return (
                        <Item>
                          <div className="flex">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              {record?.event === ECallEventType.call_end
                                ? directionTypeIcon[
                                    record.direction as keyof typeof directionTypeText
                                  ]
                                : eventTypeIcon[ECallEventType.call_missed]}
                              {record?.event === ECallEventType.call_missed
                                ? "Call missed"
                                : `${hours > 0 ? `${hours} h` : ""} ${minutes > 0 ? `${minutes} min` : ""} ${remainingSeconds > 0 ? `${remainingSeconds} sec` : ""}`}
                            </div>
                            <div
                              className="cursor"
                              onClick={() => copyToClipboard(record.callee)}
                            >
                              {(record.callee || "")?.length > 7
                                ? `(${record.callee.substr(0, 2)}) ${record.callee.substr(
                                    2,
                                    3
                                  )} ${record.callee.substr(5, 2)} ${record.callee.substr(
                                    7,
                                    2
                                  )} ${record.callee.substr(10, 2)}`
                                : record.callee}
                            </div>
                          </div>
                          <MiniUserCardWrapper
                            user={
                              {
                                ...firstUser,
                                type: firstUser?.student_type as any,
                                status: firstUser?.student_status,
                                numberType: firstUser?.type as any,
                              } as any
                            }
                            count={1}
                            style={{ marginTop: -4 }}
                          >
                            {firstUser ? (
                              <div className="statuses">
                                <div className="fullname">
                                  ({len}) {firstUser?.name}
                                </div>
                                <UserStatusWrapper
                                  status={status}
                                  className="status"
                                >
                                  {status}
                                </UserStatusWrapper>
                                <div className="numberType">
                                  {firstUser?.type
                                    ? PhoneTypes?.[
                                        +firstUser?.type as keyof typeof PhoneTypes
                                      ]
                                    : "Number type"}
                                </div>
                              </div>
                            ) : (
                              <div className="fullname">Unknown</div>
                            )}
                            <div className="called-time">
                              {moment(
                                record?.created_at,
                                DATE_FORMAT_CREATED_AT
                              ).format("hh:mm")}
                            </div>
                          </MiniUserCardWrapper>
                          {record.duration > 0 && (
                            <audio controls>
                              <source src={record.record} type="audio/mpeg" />
                            </audio>
                          )}
                        </Item>
                      );
                    })}
                  </Items>
                </div>
              );
            })}
            <div>
              <button
                ref={ref}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                    ? "Load Newer"
                    : "Loading more..."}
              </button>
            </div>
          </div>
        )}
      </div>
      <Button
        style={{
          height: "37px",
          width: "100%",
          padding: 0,
          margin: 0,
          marginTop: "16px",
          gap: "6px",
          background: "#353945",
          color: "#B1B5C4",
        }}
        icon={<ActivitySvg color="#B1B5C4" />}
        onClick={() => setIsOpen(!isOpen)}
      >
        Show history
      </Button>
    </Wrapper>
  );
}
