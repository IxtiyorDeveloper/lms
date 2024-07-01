import React, { useEffect, useState } from "react";
import { Popover } from "antd";
import NextImage from "next/image";
import CallRequestNotificationsContent from "./comnponents/content";
import { useFirebase, useGetAllNotifications } from "hooks";
import { NotificationTopics } from "types/notification";
import { useSelector } from "react-redux";
import { IStore } from "store";

const CallRequestNotifications = () => {
  const user = useSelector((state: IStore) => state.user);

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newValue: boolean) => {
    setOpen(newValue);
  };

  const { data, isFetching } = useFirebase({
    collectionName: "notifications",
    slug: user?.user?.id,
  });

  const notification_exists = data?.[0]?.notification_exists;

  const params = useGetAllNotifications(
    {
      query_params: {
        topic: NotificationTopics.call_request,
        is_read: 0,
        "per-page": 5,
        view_level: 100,
      },
    },
    "callRequest_notifications"
  );

  const image = params?.data?.pages?.[0]?.notifications?.length
    ? "/header/callRequest.svg"
    : "/header/emptyCallRequest.svg";

  useEffect(() => {
    if (data && notification_exists) {
      params.refetch();
    }
  }, [isFetching]);

  return (
    <Popover
      getPopupContainer={(trigger) => trigger.parentElement as any}
      content={CallRequestNotificationsContent({ setOpen, params })}
      trigger="click"
      onOpenChange={handleOpenChange}
      open={open}
    >
      <NextImage
        src={image}
        alt="search"
        width="40"
        height="40"
        className="pointer"
      />
    </Popover>
  );
};

export default CallRequestNotifications;
