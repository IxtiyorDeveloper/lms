import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { IStore } from "store";
import { CALL_QUERY_NAME } from "constants/call";

const CallNumber = () => {
  const { query, push, pathname } = useRouter();
  const sip = useSelector((state: IStore) => state.sip.sip);
  useEffect(() => {
    if (
      sip.ref?.state?.sipStatus === "sipStatus/REGISTERED" &&
      query?.[CALL_QUERY_NAME]
    ) {
      // sip.ref?.startCall(
      //   `sip:${query?.[CALL_QUERY_NAME] as string}@${connectionConfig?.server}`
      // );
      push({
        pathname: pathname,
        query: {
          ...query,
          [CALL_QUERY_NAME]: undefined,
        },
      });
    }
  }, [query?.[CALL_QUERY_NAME], sip.ref?.state?.sipStatus]);

  return null;
};

export default CallNumber;
