import { QueryClient } from "@tanstack/react-query";
import { IGroup, TStatuses, UpdateLabelPages } from "types";
import { LABEL_PODO } from "../constants";

export const updateContactLabel = ({
  newData,
  queryClient,
  apiKey,
  page,
}: {
  newData: any;
  apiKey: string;
  queryClient: QueryClient;
  page: UpdateLabelPages;
}) => {
  switch (page) {
    case UpdateLabelPages.GROUP_VIEW:
      return updateGroupView({
        newData,
        queryClient,
        apiKey,
      });
    default:
    case UpdateLabelPages.REGULAR:
    case UpdateLabelPages.PODO:
      return updateListLabel({
        newData,
        queryClient,
        apiKey,
      });
  }
};

export const removeContactLabel = ({
  user_id,
  queryClient,
  apiKey,
  type,
  page,
}: {
  user_id: string;
  apiKey: string;
  type: TStatuses;
  queryClient: QueryClient;
  page: UpdateLabelPages;
}) => {
  if (page === UpdateLabelPages.GROUP_VIEW) {
    removeGroupViewLabel({
      user_id,
      queryClient,
      apiKey,
      type,
    });
  }
  if (page === UpdateLabelPages.REGULAR) {
    removeListLabel({
      user_id,
      queryClient,
      apiKey,
      type,
    });
  }
  if (page === UpdateLabelPages.PODO) {
    if (type == LABEL_PODO) {
      removePodo({
        apiKey,
        queryClient,
        user_id,
      });
    } else {
      removeListLabel({
        user_id,
        queryClient,
        apiKey,
        type,
      });
    }
  }
};

export const updateListLabel = ({
  newData,
  queryClient,
  apiKey,
}: {
  newData: any;
  apiKey: string;
  queryClient: QueryClient;
}) => {
  queryClient.setQueriesData([apiKey], (oldData: any) => {
    const data = oldData as any;
    return {
      ...data,
      list: data?.list?.map((e: any) => {
        if (e?.user?.id == newData?.user?.id) {
          return {
            ...e,
            user: {
              ...e.user,
              userLabels: newData?.user?.userLabels,
            },
          };
        }
        return e;
      }),
    };
  });
};

export const removeListLabel = ({
  user_id,
  queryClient,
  apiKey,
  type,
}: {
  user_id: string;
  apiKey: string;
  type: TStatuses;
  queryClient: QueryClient;
}) => {
  queryClient.setQueriesData([apiKey], (oldData: any) => {
    const data = oldData as any;
    return {
      ...data,
      list: data?.list?.map((e: any) => {
        if (e?.user?.id == user_id) {
          return {
            ...e,
            user: {
              ...e.user,
              userLabels: e.user.userLabels?.filter(
                (label: { type: number }) => label.type !== type
              ),
            },
          };
        }
        return e;
      }),
    };
  });
};

export const updateGroupView = ({
  newData,
  queryClient,
  apiKey,
}: {
  newData: any;
  apiKey: string;
  queryClient: QueryClient;
}) => {
  queryClient.setQueriesData([apiKey], (oldData: any) => {
    const data = oldData as IGroup;
    return {
      ...data,
      allContacts: data?.allContacts?.map((e: any) => {
        if (e?.user?.id == newData?.user?.id) {
          return {
            ...e,
            user: {
              ...e.user,
              userLabels: newData?.user?.userLabels,
            },
          };
        }
        return e;
      }),
    };
  });
};

export const removeGroupViewLabel = ({
  user_id,
  queryClient,
  apiKey,
  type,
}: {
  user_id: string;
  apiKey: string;
  type: TStatuses;
  queryClient: QueryClient;
}) => {
  queryClient.setQueriesData([apiKey], (oldData: any) => {
    const data = oldData as IGroup;
    return {
      ...data,
      allContacts: data?.allContacts?.map((e: any) => {
        if (e?.user?.id == user_id) {
          return {
            ...e,
            user: {
              ...e.user,
              userLabels: e.user.userLabels?.filter(
                (label: { type: number }) => label.type !== type
              ),
            },
          };
        }
        return e;
      }),
    };
  });
};

export const removePodo = ({
  user_id,
  queryClient,
  apiKey,
}: {
  user_id: string;
  apiKey: string;
  queryClient: QueryClient;
}) => {
  queryClient.setQueriesData([apiKey], (oldData: any) => {
    const data = oldData as any;
    return {
      ...data,
      list: data?.list.filter((e: any) => e?.user?.id !== user_id),
    };
  });
};
