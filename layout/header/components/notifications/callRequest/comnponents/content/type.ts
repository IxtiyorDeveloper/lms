import { IAllNotifications } from "types/notification";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

export interface Type {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  params: UseInfiniteQueryResult<IAllNotifications, unknown>;
}
