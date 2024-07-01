import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import pageData from "api/pageData";
import { IGCPageData, TCompany, TParams } from "types";
import React, { useMemo } from "react";
import moment from "moment";
import groupContact from "api/groupContact";
import { DATE_FORMAT_HH_mm, DATE_FORMAT_HH_mm_ss } from "constants/dates";
import _ from "lodash";
import { LeavingCategoryEnums } from "types/leavingCategory";
import { ADDED_BY } from "constants/contactResponsibles";
import { Cookies } from "react-cookie";
import { MAIN_TOKEN_NAME } from "constants/tokenNames";
import LangWrapper from "components/common/langWrapper";
import { queryKeys } from "constants/queryKeys";
import { IOption } from "../../components/common/select/type";

const userLabels = {
  waitingStudentLabels: {
    "100": "Start date",
    "400": "Call request",
    "500": "Not answered",
    "1000": "No label",
  },
  newStudentLabels: {
    "200": "Coming",
    "300": "Will pay",
    "400": "Call request",
    "500": "Not answered",
    "1000": "No label",
  },
  activeStudentLabels: {
    "200": "Coming",
    "300": "Will pay",
    "400": "Call request",
    "500": "Not answered",
    "600": "Podo",
    "800": "Red List",
    "1000": "No label",
    "1100": "Fallible",
  },
  archivedStudentLabels: {
    "400": "Call request",
    "500": "Not answered",
    "700": "Color change",
    "1000": "No label",
  },
  podoStudentLabels: {
    "300": "Will pay",
    "400": "Call request",
    "500": "Not answered",
    "800": "Red List",
    "1000": "No label",
    "1100": "Fallible",
  },
  redListStudentLabels: {
    "300": "Will pay",
    "400": "Call request",
    "500": "Not answered",
    "600": "Podo",
    "1000": "No label",
    "1100": "Fallible",
  },
};

export const getCompanyInitialData = async (
  params?: TParams,
): Promise<TCompany> => {
  try {
    const res = await pageData.getCompanyInitialData(params);
    return res.data.result as TCompany;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err.response;
  }
};

export const getGCPageData = async (): Promise<IGCPageData> => {
  try {
    const res = await groupContact.groupContactPageData();
    return res.data.result as IGCPageData;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err.response;
  }
};

export const useGCPageData = (enabled?: boolean) => {
  return useQuery([queryKeys.gc_page_data], () => getGCPageData(), {
    staleTime: Infinity,
    enabled,
  });
};
export const getPageData = async (): Promise<TCompany> => {
  try {
    const res = await pageData.getCompanyInitialData({
      expand:
        "departments,roles,restudyConfigConstant,leadUsers,smsServices,projectListByPermission,services,leadLeavingCategories,allBranches,admins,holidays,rooms,userLabels,products,transactionUsers,userBranchIds,sourceEnums,companyEnums,companyEnums.assignmentTypes,attendanceEnums,staffEnums,incomeUsers,teachers,supports,levels,sources,groupTypes,days,group_types,groups,times,groupContactEnums,systemEnums,leavingCategoryEnums,administrators,shifts,stoppingCategories,courses,stoppedByUsers,branches,balanceStatuses,financeEnums,lifeCycles,staffs.userProfile.avatar.children,regions,sms,productAndServiceEnums,levelRecommendationConstant,lead,leadSources,redListCountConstant",
    });
    return res.data.result;
  } catch (err: any) {
    toast.error(err.data?.client_error?.exception?.message);
    throw err.response;
  }
};
export const usePageData = (enabled?: boolean) => {
  const cookie = new Cookies();
  return useQuery([queryKeys.page_data], () => getPageData(), {
    staleTime: 1800000,
    enabled: !!cookie.get(MAIN_TOKEN_NAME) && enabled,
    cacheTime: 99999999,
  });
};
export const usePageDataMemo = () => {
  const { data, ...args } = usePageData(true);

  return useMemo(() => {
    const teachers = data?.teachers
      ? [
          { firstname: "No teacher", lastname: "", id: -1 },
          ...(data?.teachers || []),
        ]
      : ([] as any);
    return {
      args: args,
      isFetching: args.isFetching,
      restudyConfigConstant: data?.restudyConfigConstant,
      course: data?.courses?.map((e) => {
        return {
          label: e.name,
          value: `${e.id}`,
        };
      }),
      smsServices: data?.smsServices?.map((e) => {
        return {
          label: e.name,
          value: `${e.id}`,
        };
      }),
      leadLeavingCategories: data?.leadLeavingCategories?.map((e) => {
        return {
          label: e.name,
          value: `${e.id}`,
        };
      }),
      services: data?.services,
      level: {
        options: data?.levels
          .filter((e) => !e.parent_id)
          .map((item) => {
            return {
              label: item.name,
              value: `${item.id}`,
              subLevel: item?.children
                .filter((e) => e?.parent_id === item.id)
                .map((e) => {
                  return {
                    label: e.name,
                    value: `${e.id}`,
                  };
                }),
            };
          }),
      },
      flatLevels: data?.levels
        ?.map((l) =>
          l?.children?.map((sub) => ({
            value: sub?.id,
            label: `${l?.name} / ${sub?.name}`,
          })),
        )
        ?.flat(),
      groupType: data?.groupTypes.map((e) => {
        return {
          label: e.name,
          value: `${e.id}`,
        };
      }),
      leadUsers: data?.leadUsers.map((e) => {
        return {
          label: `${e.firstname || ""} ${e.lastname || ""}`,
          value: `${e.id}`,
        };
      }),
      days: data?.days.map((e) => {
        return {
          label: e.name,
          value: `${e.id}`,
          lessonWeekDayIndexes: e?.lessonWeekDayIndexes,
        };
      }),
      time: data?.times.map((e) => {
        return {
          label: moment(e.time, DATE_FORMAT_HH_mm_ss).format(DATE_FORMAT_HH_mm),
          value: `${e.id}`,
          type: e.type,
        };
      }),
      shifts: data?.shifts.reduce(function (r, a) {
        r[a.rbac_role_id] = r[a.rbac_role_id] || [];
        r[a.rbac_role_id].push({
          label: a.name,
          value: a.id,
          role_id: a.rbac_role_id,
        });
        return r;
      }, Object.create(null)),
      source: data?.sources.map((e) => {
        return {
          title: e.name,
          id: `${e.id}`,
          value: `${e.id}`,
          iconFile: e.iconFile,
        };
      }),
      sms: data?.sms,
      branch: data?.branches.map((e) => {
        return {
          label: e.name,
          value: `${e.id}`,
        };
      }),
      allBranches: data?.allBranches?.map((e) => {
        return {
          label: e.name,
          value: `${e.id}`,
        };
      }),
      projectListByPermission: data?.projectListByPermission?.map((e) => {
        return {
          label: e.label,
          value: e.value,
        };
      }),
      branchByRegion: (regionId: any) =>
        data?.branches
          .filter((e) => (e.region_id as any) == regionId)
          .map((e) => {
            return {
              label: e.name,
              value: `${e.id}`,
            };
          }),
      lang: _.map(data?.systemEnums?.locales, (val, key) => {
        return {
          value: key,
          label: <LangWrapper val={val} value={key} />,
        };
      }),
      groupForm: _.map(data?.staffEnums?.groupForms, (val, key) => {
        return {
          value: key,
          label: val,
        };
      }),
      phone: data?.systemEnums?.phone_number?.types.map((e) => {
        return {
          ...e,
          value: `${e.value}`,
        };
      }),
      sourceSelect: data?.sources.map((e) => {
        return {
          label: e.name,
          value: `${e.id}`,
        };
      }),
      leadSourceSelect: data?.leadSources.map((e) => {
        return {
          label: e.name,
          value: `${e.id}`,
          key: e.key,
          type: e.type,
        };
      }),
      room: data?.rooms?.map((e) => {
        return {
          label: e.name,
          value: e.id,
          branch_id: e.branch_id,
        };
      }),
      teacher: teachers?.map((e: any) => {
        return {
          label: e.firstname + " " + e.lastname,
          value: e?.id,
          group_types: e?.group_types,
        };
      }) as (IOption & { group_types: string[] })[],
      supervisor: () => {
        let array: any[] = [];
        data?.teachers?.map((teacher) => array.push(teacher));
        data?.supports?.map((support) => array.push(support));
        return array?.map((e) => {
          return {
            label: e.firstname + " " + e.lastname,
            value: e?.id,
          };
        });
      },
      companyEnums: data?.companyEnums,
      teachers: data?.teachers,
      support: data?.supports?.map((e) => {
        return {
          label: e.firstname + " " + e.lastname,
          value: e?.id,
        };
      }),
      day: data?.days?.map((e) => {
        return {
          label: e.name,
          value: e.id,
        };
      }),
      regions: data?.regions?.map((e) => {
        return {
          label: e.name,
          value: e.id,
        };
      }),
      leavingCategoryEnums: _.map(
        data?.leavingCategoryEnums?.types,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      stoppingCategories: data?.stoppingCategories
        ?.filter(
          (category) =>
            category.type.toString() ==
            LeavingCategoryEnums.STOPPING.toString(),
        )
        ?.map((e) => {
          return {
            label: e.name,
            value: e.id,
          };
        }),
      transferringCategories: data?.stoppingCategories
        ?.filter(
          (category) =>
            category.type.toString() ==
            LeavingCategoryEnums.TRANSFERRING.toString(),
        )
        ?.map((e) => {
          return {
            label: e.name,
            value: e.id,
          };
        }),
      stoppedByUsers: data?.stoppedByUsers?.map((e) => {
        return {
          label: e?.firstname + " " + e.lastname,
          value: e.id,
        };
      }),
      incomeUsers: data?.incomeUsers?.map((e) => {
        return {
          label: e.firstname + " " + e.lastname,
          value: e.id,
        };
      }),
      balanceStatuses: Object?.entries(data?.balanceStatuses ?? {})?.map(
        (item) => {
          return {
            label: item[1] as any,
            value: item[0] as any,
          };
        },
      ),
      staffs: data?.staffs?.map((e) => {
        return {
          label: e?.firstname + " " + e.lastname,
          value: e.id,
          avatar: e.avatar,
        };
      }),
      payment: _.map(data?.financeEnums?.payment, (val, key) => {
        return {
          value: key,
          label: val,
        };
      }),
      incomePaymentTypes: _.map(
        data?.financeEnums?.incomePaymentTypes,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      incomePaymentTypesWithBalance: _.map(
        data?.financeEnums?.incomePaymentTypesWithBalance,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      incomeTypes: _.map(data?.financeEnums?.incomeTypes, (val, key) => {
        return {
          value: key,
          label: val,
        };
      }),
      productAndServiceIncomeProductTypeEnum: _.map(
        data?.financeEnums?.productAndServiceIncomeProductTypeEnum,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      productTypes: _.map(
        data?.financeEnums?.productEnums?.types,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      productStatuses: _.map(
        data?.financeEnums?.productEnums?.statuses,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      productViewLevels: _.map(
        data?.financeEnums?.productEnums?.viewLevels,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      sellPlaces: _.map(
        data?.financeEnums?.productEnums?.sellPlaces,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      pricingTypeLabels: _.map(
        data?.financeEnums?.productEnums?.pricingTypeLabels,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      processTypeLabels: _.map(
        data?.financeEnums?.productEnums?.processTypeLabels,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      expenseEnums: _.map(data?.financeEnums?.expenseEnums, (val, key) => {
        return {
          value: key,
          label: val,
        };
      }),
      paymentForms: _.map(
        data?.financeEnums?.expenseEnums?.paymentForms,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      incomeGroupedPaymentTypesMOT: _.map(
        data?.financeEnums?.incomeGroupedPaymentTypes?.MOT,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      incomeGroupedPaymentTypesBANK: _.map(
        data?.financeEnums?.incomeGroupedPaymentTypes?.BANK,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      staffEnumsKeys: _.map(data?.staffEnums?.keys, (val, key) => {
        return {
          value: key,
          label: val,
        };
      }),
      staffEnumsGroupForms: _.map(data?.staffEnums?.groupForms, (val, key) => {
        return {
          value: key,
          label: val,
        };
      }),
      attendanceEnumsAbsentLabels: _.map(
        data?.attendanceEnums?.absentLabels,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      attendanceEnumsPaymentStatuses: _.map(
        data?.attendanceEnums?.paymentStatuses,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      companyEnumsHolidayTypes: _.map(
        data?.companyEnums?.holiday?.types,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      companyEnumsHolidayNotifyTypes: _.map(
        data?.companyEnums?.holiday?.notifyTypes,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      groupContactEnumsStatusesActive: _.map(
        data?.groupContactEnums?.statuses?.active,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      groupContactEnumsStatusesAll: _.map(
        data?.groupContactEnums?.statuses?.all,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      groupContactEnumsStudyStatuses: _.map(
        data?.groupContactEnums?.statuses?.studyStatuses,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      productAndServiceEnums: data?.productAndServiceEnums,
      sourceEnumsUsingPlaces: _.map(
        data?.sourceEnums?.usingPlaces,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      ageDiff: data?.systemEnums?.student,
      userBranchIds: data?.userBranchIds,
      transactionUsers: data?.transactionUsers.map((e) => {
        return {
          label: `${e.firstname} ${e.lastname}`,
          value: `${e.id}`,
        };
      }),
      ownAllBranches: data?.allBranches
        .filter((obj) => data?.userBranchIds.includes(obj.id))
        .map((e) => {
          return {
            label: e.name,
            value: `${e.id}`,
          };
        }),
      ownBranches: data?.branches
        .filter((obj) => data?.userBranchIds.includes(obj.id))
        .map((e) => {
          return {
            label: e.name,
            value: `${e.id}`,
          };
        }),
      products: data?.products,
      waitingStudentLabels: _.map(
        data?.userLabels?.waitingStudentLabels ||
          userLabels.waitingStudentLabels,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      newStudentLabels: _.map(
        data?.userLabels?.newStudentLabels || userLabels.newStudentLabels,
        (val, key) => {
          return {
            value: key,
            label: val,
            disabled: true,
          };
        },
      ),
      redListStudentLabels: _.map(
        data?.userLabels?.redListStudentLabels ||
          userLabels.redListStudentLabels,
        (val, key) => {
          return {
            value: key,
            label: val,
            disabled: true,
          };
        },
      ),
      podoStudentLabels: _.map(
        data?.userLabels?.podoStudentLabels || userLabels.podoStudentLabels,
        (val, key) => {
          return {
            value: key,
            label: val,
            disabled: true,
          };
        },
      ),
      activeStudentLabels: _.map(
        data?.userLabels?.activeStudentLabels || userLabels.activeStudentLabels,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      archivedStudentLabels: _.map(
        data?.userLabels?.archivedStudentLabels ||
          userLabels.archivedStudentLabels,
        (val, key) => {
          return {
            value: key,
            label: val,
          };
        },
      ),
      holidays: data?.holidays,
      redListCountConstant: data?.redListCountConstant,
      admin: data?.admins?.map((e) => {
        return {
          label: e?.firstname + " " + e.lastname,
          value: e.id,
          avatar: e.avatar,
        };
      }),
      levelRecommendationConstant: data?.levelRecommendationConstant,
      groups: data?.groups?.map((item) => {
        return {
          label: item?.name,
          value: `${item?.id}`,
        };
      }),
    };
  }, [data, args]);
};
export const useGCPageDataMemo = () => {
  const { data, ...args } = useGCPageData(true);
  return useMemo(() => {
    const a = [];
    for (const [key, value] of Object.entries(data?.groupStates || {})) {
      a.push({
        label: value,
        value: `${key}`,
      });
    }
    return {
      args: args,
      teachers: [
        { firstname: "No teacher", lastname: "", user_id: -1 },
        ...(data?.academic?.teachers || []),
      ]?.map((item) => {
        return {
          label: item?.firstname + " " + item?.lastname,
          value: `${item?.user_id}`,
        };
      }),
      groupName: data?.academic?.groups?.map((item) => {
        return {
          label: item?.name,
          value: `${item?.id}`,
        };
      }),
      addedBy: data?.responsibles
        ?.filter((e: any) => +e?.type == ADDED_BY)
        ?.map((item) => {
          return {
            label: `${item.firstname} ${item.lastname}`,
            value: `${item?.user_id}`,
          };
        }),
      groupStatus: a,
    };
  }, [data]);
};
