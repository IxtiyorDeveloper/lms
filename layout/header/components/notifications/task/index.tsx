import React, { useEffect, useState } from "react";
import { Popover } from "antd";
import NextImage from "next/image";
import TaskNotificationsContent from "./comnponents/content";
import { useGetAllNotifications } from "hooks";
import { IFirebase, NotificationTopics } from "types/notification";
import { useSelector } from "react-redux";
import { IStore } from "store";
import { doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "utils/firebase";
const TaskNotifications = () => {
  const user = useSelector((state: IStore) => state.user);

  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<IFirebase | undefined>(
    undefined,
  );

  const handleOpenChange = (newValue: boolean) => {
    setOpen(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(
          firestore,
          "notifications",
          user?.user?.id?.toString() ?? "",
        );
        const unsubscribe = onSnapshot(docRef, (doc) => {
          const data = doc.data();
          setNotification(data as IFirebase);
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {}
    };

    fetchData();
  }, [firestore]);

  const params = useGetAllNotifications(
    {
      query_params: {
        topic: NotificationTopics.task,
        is_read: 0,
        "per-page": 5,
      },
    },
    "task_notifications",
  );

  const image = params?.data?.pages?.[0]?.notifications?.length
    ? "/header/task.svg"
    : "/header/emptyTask.svg";

  const notification_exists = notification?.notification_exists;

  useEffect(() => {
    if (notification_exists) {
      params.refetch();
    }
  }, [notification_exists]);

  return (
    <Popover
      getPopupContainer={(trigger) => trigger.parentElement as any}
      content={TaskNotificationsContent({ setOpen, params })}
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

export default TaskNotifications;
