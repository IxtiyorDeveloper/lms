import { toast } from "react-toastify";
import { TNotificationContent } from "types/notification";
import NotificationContent from "./content";

export const handleNotifications = ({
  hotNotifications,
}: {
  hotNotifications: TNotificationContent | undefined;
}) => {
  toast(() => <NotificationContent hotNotifications={hotNotifications} />, {
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
