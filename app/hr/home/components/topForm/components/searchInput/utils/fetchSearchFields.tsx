import { TParams } from "types";
import { toast } from "react-toastify";
import candidate from "api/hr/candidate";
import CandidateItem from "../candidate";

export const fetchSearchFields: (params: TParams) => Promise<any> = async (
  params
) => {
  const value = params?.query_params?.search;
  if (value?.length > 2)
    try {
      const res = await candidate.candidateList(params);
      const data = res?.data?.result;
      return data?.list?.map((item) => ({
        value: item?.id,
        label: <CandidateItem data={item} value={value} />,
        additional: item,
        labelShow: `${item.first_name} ${item.last_name}`,
      }));
    } catch (err: any) {
      toast.error(err?.message);
    }
};
