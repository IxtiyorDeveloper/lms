import { TParams } from "../../types";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { firebase_app } from "utils/firebase";
import env from "utils/env";

export async function fetchDataBySlug(params?: TParams) {
  try {
    const firestore = getFirestore(firebase_app);

    const myCollection = collection(firestore, params?.collectionName);
    const q = query(myCollection, where("user_id", "==", params?.slug));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    throw error;
  }
}

export const useFirebase = (params?: TParams) => {
  return useQuery(
    [queryKeys.firebase_query, params],
    () => fetchDataBySlug(params),
    {
      enabled: !!params?.slug,
      refetchInterval: +env.notification_interval || 60000,
    }
  );
};
