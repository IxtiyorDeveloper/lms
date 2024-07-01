import React from "react";
import { Wrapper } from "./style";
import { NotificationSvg } from "components";
import { IAllNotifications, TNotificationContent } from "types/notification";
import Link from "next/link";
import { useGetNotification } from "hooks";
import { validationErrorHandler } from "utils";
import { useQueryClient } from "@tanstack/react-query";
import { InfiniteData } from "@tanstack/query-core";
import dayjs from "dayjs";
import { DATE_FORMAT_YYYY_MM_DD } from "../../../../../constants/dates";
import { task_initial_date } from "../../../../../constants/task";
import moment from "moment";

const TaskContent = ({
  hotNotifications,
}: {
  hotNotifications: TNotificationContent | undefined;
}) => {
  const queryClient = useQueryClient();
  const closeMutation = useGetNotification({
    onSuccess: () => {
      reduceNotifications();
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const handleClose = () => {
    closeMutation.mutate({
      query_params: {
        id: hotNotifications?.id,
      },
    });
  };
  const reduceNotifications = () => {
    queryClient.setQueriesData(["task_notifications"], (data) => {
      const firstData = data as InfiniteData<IAllNotifications> | undefined;
      return {
        ...firstData,
        pages: firstData?.pages?.map((page) => {
          return {
            ...page,
            notifications: page?.notifications?.filter((item) => {
              return item?.id !== hotNotifications?.id;
            }),
            total_count: +page?.total_count - 1,
          };
        }),
      };
    });
  };

  const endOfMonth = dayjs().endOf("month");

  const initial_date =
    hotNotifications?.meta_tags?.created_date ?? task_initial_date;

  const to_date = endOfMonth.format(DATE_FORMAT_YYYY_MM_DD);
  const from_date = moment(initial_date).format(DATE_FORMAT_YYYY_MM_DD);

  return (
    <Wrapper>
      <div className="iconWr">
        <NotificationSvg />
      </div>
      <div className="right">
        <Link
          className="title"
          href={`/tasks?userType=200&search=${hotNotifications?.model_id}&from_date=${from_date}&to_date=${to_date}`}
          // onClick={handleClose}
        >
          {hotNotifications?.title}
        </Link>
        <p className="description">{hotNotifications?.body}</p>
      </div>
    </Wrapper>
  );
};

export default TaskContent;
