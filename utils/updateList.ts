import { QueryClient } from "@tanstack/react-query";

export const updateList = ({
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
      list: data?.list.map((e: any) => {
        if (e.id === newData.id) {
          return newData;
        }
        return e;
      }),
    };
  });
};
