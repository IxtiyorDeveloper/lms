import { useSelector } from "react-redux";
import { IStore } from "store";
import { useFirebase, useHotNotifications } from "hooks";
import { useEffect } from "react";
import { handleNotifications } from "../handleNotifications";

export const useNotifications = () => {
  const user = useSelector((state: IStore) => state.user?.user?.id);

  const { data, isFetching } = useFirebase({
    collectionName: "notifications",
    slug: user,
  });

  const notification_exists = data?.[0]?.notification_exists;

  const { data: hotNotifications, refetch } = useHotNotifications({
    refetch: notification_exists,
    query_params: {
      topic: ["task", "call_request"],
      "per-page": 3,
      page: 1,
    },
  });

  useEffect(() => {
    if (hotNotifications?.notifications?.length) {
      for (let i = 0; i < hotNotifications?.notifications?.length; i++) {
        const singleNotification = hotNotifications?.notifications[i];
        const audio = new Audio(
          "https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7"
        );
        audio.play();
        handleNotifications({ hotNotifications: singleNotification });
      }
    }
  }, [hotNotifications]);

  useEffect(() => {
    if (data && notification_exists) {
      refetch();
    }
  }, [isFetching]);
};
