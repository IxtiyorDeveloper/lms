import { NextRouter } from "next/router";
import { ETaskStatus, IAllTasks, TaskUserType } from "types";
import { InfiniteData } from "@tanstack/query-core";
import dayjs from "dayjs";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";

export const generateQuery = ({
  router,
  userType,
}: {
  router: NextRouter;
  userType: TaskUserType;
}) => {
  const startOfMonth = dayjs().startOf("month");
  const endOfMonth = dayjs().endOf("month");
  return {
    user_type: userType || router.query?.user_type,
    search: router.query?.search,
    myself: null,
    category_id: router.query?.category_id,
    branch_id: router.query?.branch_id,
    // @ts-ignore
    supervisor_ids:
      typeof router.query?.supervisor_ids !== "string"
        ? router.query?.supervisor_ids?.map((t: string) => t?.split("__")[0])
        : router.query?.supervisor_ids?.split("__")[0],
    responsible_ids: router.query?.responsible_ids,
    from_date: router.query?.from_date
      ? router.query?.from_date
      : startOfMonth.format(DATE_FORMAT_YYYY_MM_DD),
    to_date: router.query?.to_date
      ? router.query?.to_date
      : endOfMonth.format(DATE_FORMAT_YYYY_MM_DD),
  };
};
export const handleFilterProcessing = ({
  switched,
  router,
}: {
  switched: boolean;
  router: NextRouter;
}) => {
  if (switched) {
    router
      .replace(
        {
          query: {
            ...router.query,
            processing: "true",
          },
        },
        undefined,
        { scroll: false }
      )
      .then();
  } else {
    delete router.query?.processing;
    router
      .replace(
        {
          query: {
            ...router.query,
          },
        },
        undefined,
        { scroll: false }
      )
      .then();
  }
};

export const generateLoadings = ({
  hasNextPageOpened,
  hasNextPageDone,
  hasNextPageChecked,
  hasNextPageRejected,
  isFetchingNextPageOpened,
  isFetchingNextPageDone,
  isFetchingNextPageChecked,
  isFetchingNextPageRejected,
}: {
  hasNextPageOpened?: boolean;
  hasNextPageDone?: boolean;
  hasNextPageChecked?: boolean;
  hasNextPageRejected?: boolean;
  isFetchingNextPageOpened?: boolean;
  isFetchingNextPageDone?: boolean;
  isFetchingNextPageChecked?: boolean;
  isFetchingNextPageRejected?: boolean;
}) => {
  return {
    [ETaskStatus.OPENED]: isFetchingNextPageOpened
      ? "Loading more..."
      : hasNextPageOpened
      ? "Load Newer"
      : "Nothing more to load",
    [ETaskStatus.DONE]: isFetchingNextPageDone
      ? "Loading more..."
      : hasNextPageDone
      ? "Load Newer"
      : "Nothing more to load",
    [ETaskStatus.CHECKED]: isFetchingNextPageChecked
      ? "Loading more..."
      : hasNextPageChecked
      ? "Load Newer"
      : "Nothing more to load",
    [ETaskStatus.REJECTED]: isFetchingNextPageRejected
      ? "Loading more..."
      : hasNextPageRejected
      ? "Load Newer"
      : "Nothing more to load",
  };
};

export const generateTabs = ({
  openedRef,
  doneRef,
  checkedRef,
  rejectedRef,
  openedTasks,
  doneTasks,
  checkedTasks,
  rejectedTasks,
}: {
  openedRef: (node?: Element | null | undefined) => void;
  doneRef: (node?: Element | null | undefined) => void;
  checkedRef: (node?: Element | null | undefined) => void;
  rejectedRef: (node?: Element | null | undefined) => void;
  openedTasks: InfiniteData<IAllTasks> | undefined;
  doneTasks: InfiniteData<IAllTasks> | undefined;
  checkedTasks: InfiniteData<IAllTasks> | undefined;
  rejectedTasks: InfiniteData<IAllTasks> | undefined;
}) => {
  return [
    {
      tab: 1,
      ref: openedRef,
      status: ETaskStatus.OPENED,
      total: openedTasks?.pages?.[0]?.total || 0,
      data: openedTasks?.pages,
    },
    {
      tab: 2,
      ref: doneRef,
      status: ETaskStatus.DONE,
      total: doneTasks?.pages?.[0]?.total || 0,
      data: doneTasks?.pages,
    },
    {
      tab: 3,
      ref: checkedRef,
      status: ETaskStatus.CHECKED,
      total: checkedTasks?.pages?.[0]?.total || 0,
      data: checkedTasks?.pages,
    },
    {
      tab: 4,
      ref: rejectedRef,
      status: ETaskStatus.REJECTED,
      total: rejectedTasks?.pages?.[0]?.total || 0,
      data: rejectedTasks?.pages,
    },
  ];
};
