import globalSearch from "api/globalSearch";
import { TParams } from "types";
import { toast } from "react-toastify";
import { StudentSearchLabel } from "../../components";
import { getExamResultsStudents } from "../../hooks";
import StudentSearchLabelForOther from "../../globals/components/paymentV2Modal/components/balance/components/fromAnotherBalance/components/optionStudent";
import { LabelSlotSearchSelect, LabelSlotHoveredMonth } from "../../components";
import vacation from "../../api/staffSettings/vacation";
import moment from "moment";
import referral from "../../api/lead/referral";

export const fetchSearchFields: (params: TParams) => Promise<any> = async (
  params,
) => {
  if (params?.search?.length > 2 || !!params?.user_id)
    try {
      const res = await globalSearch.globalStudentSearch(params);
      const data = res?.data?.result;
      return data?.list?.map((item) => ({
        value: item?.user_id,
        label: <StudentSearchLabel props={item} />,
        additional: item,
        labelShow: params?.labelShow?.(item),
      }));
    } catch (err: any) {
      toast.error(err?.message);
    }
};

export const fetchSearchFieldsForStudentBalance = async (
  params: TParams,
): Promise<any> => {
  if (params?.search?.length > 2 || !!params?.user_id)
    try {
      const res = await getExamResultsStudents(params);
      return res?.list?.map((item) => ({
        value: item?.user?.id,
        label: <StudentSearchLabelForOther props={item} />,
        additional: item,
        labelShow: params?.labelShow?.(item),
      }));
    } catch (err: any) {
      toast.error(err?.message);
    }
};

export const slotOptionCreator = (
  dataVac: any,
  recommended_date: string,
  isForHover?: boolean,
  assignment?: any,
) => {
  const dataVacKeys = Object.keys(dataVac || {});
  let options: any[] = [];

  dataVacKeys.map((key) => {
    dataVac[key].map((val: any) => {
      const isAvailableForThisUser = moment(val?.from_date).isAfter(
        moment(recommended_date),
      );
      if (isAvailableForThisUser)
        options.push({
          ...val,
          slotMonth: key,
        });
    });
  });
  return options?.map((item) => ({
    value: item?.id,
    label: !isForHover ? (
      <LabelSlotSearchSelect data={item} />
    ) : (
      <LabelSlotHoveredMonth data={item} assignment={assignment} />
    ),
    additional: item,
  }));
};

export const fetchSearchVacationSlot: (
  params: TParams,
) => Promise<any> = async (params) => {
  try {
    const res = await vacation.getSlotsByPeriod({
      query_params: {
        ...params,
        branch_id: null,
      },
    });
    const dataVac = res?.data?.result;
    return slotOptionCreator(dataVac, params?.recommended_date);
  } catch (err: any) {
    toast.error(err?.message);
  }
};

export const fetchReferredStudents: (params: TParams) => Promise<any> = async (
  params,
) => {
  if (params?.query_params?.search?.length > 2 || !!params?.user_id)
    try {
      const res = await referral.referralPageData(params);
      const data = res?.data?.result;
      return data?.studentList?.map((item: any) => {
        return {
          value: item?.value,
          label: <div>{item.label}</div>,
          additional: item,
          labelShow: params?.labelShow?.(item),
        };
      });
    } catch (err: any) {
      toast.error(err?.message);
    }
};
