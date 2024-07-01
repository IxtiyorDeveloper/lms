import React from "react";
import { Wrapper } from "./style";
import Link from "next/link";
import { IAllNotifications, TNotificationContent } from "types/notification";
import { generateLink } from "./utils/generateLink";
import { PhoneCell } from "components";
import { stopPropagation } from "utils/stopPropagation";
import { CallXIcon } from "@jasurbekyuldashov/lms-web-icons";
import { textColors } from "styles/theme";
import { useGetNotification } from "hooks";
import { validationErrorHandler } from "utils";
import { useQueryClient } from "@tanstack/react-query";
import { InfiniteData } from "@tanstack/query-core";

const CallRequestContent = ({
  hotNotifications,
  close,
}: {
  hotNotifications: TNotificationContent | undefined;
  close?: boolean;
}) => {
  const link = generateLink({ hotNotifications });
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
    queryClient.setQueriesData(["callRequest_notifications"], (data: any) => {
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
  return (
    <Wrapper onClick={stopPropagation}>
      <div className="topContent">
        <p className="title">{hotNotifications?.title}</p>
        {close && (
          <div className="close" onClick={handleClose}>
            <CallXIcon color={textColors.pop} />
          </div>
        )}
      </div>
      <p className="description">
        {hotNotifications?.body} with{" "}
        <Link href={link}> {hotNotifications?.full_name} </Link>
      </p>
      <div className="phone-wr">
        <PhoneCell value={hotNotifications?.user_phones} zIndex={11000} />
      </div>
    </Wrapper>
  );
};

export default CallRequestContent;
