// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//@ts-ignore
import window from "global/window";

// const persister = createSyncStoragePersister({
//   storage: window.localStorage,
// });
const SyncStoragePersister: FC<{ client: QueryClient; children: any }> = ({
  children,
  client,
}) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default SyncStoragePersister;
