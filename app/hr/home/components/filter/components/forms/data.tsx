import { AntdSwitch, MyDateRangePicker, MySelect } from "components";
import { ageOptions } from "utils/age";
import { CandidateStatus } from "constants/hr";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { InitialDataHR } from "types";

export const generateFormData = ({
  control,
  initialData,
}: {
  control: any;
  initialData: InitialDataHR | undefined;
}) => {
  const router = useRouter();

  const status = Number(router.query.status || CandidateStatus.CANDIDATE);

  const vacancyOptions = useMemo(() => {
    return initialData?.activeVacancyList
      ?.sort((a, b) => a.title.localeCompare(b.title))
      .map((item) => ({
        label: item.title,
        value: item.id.toString(),
      }));
  }, [initialData?.activeVacancyList]);

  const userOptions = useMemo(() => {
    return initialData?.userList?.map((item) => ({
      label: item.fullName,
      value: item.id.toString(),
    }));
  }, [initialData?.userList]);

  const rejectedByOptions = useMemo(() => {
    return initialData?.rejectedByList?.map((item) => ({
      label: item.fullName,
      value: item.id.toString(),
    }));
  }, [initialData?.userList]);

  const responsibleOptions = useMemo(() => {
    return initialData?.meetingUserList?.map((item) => ({
      label: item.fullName,
      value: item.id.toString(),
    }));
  }, [initialData?.userList]);

  return [
    // {
    //   name: "search",
    //   hide: false,
    //   render: () => {
    //     return (
    //       <InputWithIcon
    //         placeholder="Search"
    //         icon={SearchSvg}
    //         name="search"
    //         control={control}
    //       />
    //     );
    //   },
    // },
    {
      name: "create_date",
      hide: status !== CandidateStatus.APPLICANT,
      render: () => {
        return (
          <MyDateRangePicker
            name="date"
            label="Create date"
            control={control}
          />
        );
      },
    },
    {
      name: "age",
      hide: status === CandidateStatus.REJECTED,
      render: () => {
        return (
          <MySelect
            name="age"
            label="Age"
            control={control}
            placeholder="Select"
            options={ageOptions({})}
          />
        );
      },
    },
    {
      name: "vacancy",
      hide: status !== CandidateStatus.CANDIDATE,
      render: () => {
        return (
          <MySelect
            name="vacancy"
            control={control}
            label="Vacancy"
            placeholder="Select"
            options={vacancyOptions}
          />
        );
      },
    },
    {
      name: "Created date period",
      hide: status !== CandidateStatus.CANDIDATE,
      render: () => {
        return (
          <MyDateRangePicker
            name="date"
            label="Create date period"
            control={control}
          />
        );
      },
    },
    {
      name: "Meeting responsible",
      hide: status !== CandidateStatus.CANDIDATE,
      render: () => {
        return (
          <MySelect
            control={control}
            placeholder="Select"
            name="meeting_responsible_id"
            label="Meeting responsible"
            options={responsibleOptions}
          />
        );
      },
    },
    {
      name: "Meeting date period",
      hide: status !== CandidateStatus.CANDIDATE,
      render: () => {
        return (
          <MyDateRangePicker
            name="meeting_date"
            label="Meeting date period"
            control={control}
          />
        );
      },
    },
    {
      name: "Reserved date period",
      hide: status !== CandidateStatus.RESERVED,
      render: () => {
        return (
          <MyDateRangePicker
            name="date"
            label="Reserved date period"
            control={control}
          />
        );
      },
    },
    {
      name: "Rejected date period",
      hide: status !== CandidateStatus.REJECTED,
      render: () => {
        return (
          <MyDateRangePicker
            name="date"
            label="Rejected date period"
            control={control}
          />
        );
      },
    },
    {
      name: "Rejection Type",
      hide: status !== CandidateStatus.REJECTED,
      render: () => {
        return (
          <MySelect
            name="rejection_type"
            label="Rejection Type"
            placeholder="Select"
            control={control}
            options={initialData?.rejectionTypeList.map((item) => ({
              label: item.label,
              value: item.value.toString(),
            }))}
          />
        );
      },
    },
    {
      name: "Banned",
      hide: status !== CandidateStatus.REJECTED,
      render: () => {
        return (
          <MySelect
            name="banned_type"
            placeholder="Select"
            control={control}
            label="Banned"
            options={initialData?.bannedTypeList.map((item) => ({
              label: item.label,
              value: item.value.toString(),
            }))}
          />
        );
      },
    },
    {
      name: "Hired date period",
      hide: status !== CandidateStatus.HIRED,
      render: () => {
        return (
          <MyDateRangePicker
            name="date"
            label="Hired date period"
            control={control}
          />
        );
      },
    },
    {
      name: "Source",
      hide: false,
      render: () => {
        return (
          <MySelect
            name="source"
            label="Source"
            control={control}
            placeholder="Select"
            options={initialData?.sourceList.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            }))}
            maxTagCount={1}
            mode="multiple"
          />
        );
      },
    },
    {
      name: "Rejected by",
      hide: status !== CandidateStatus.REJECTED,
      render: () => {
        return (
          <MySelect
            name="updated_by"
            control={control}
            label="Rejected by"
            placeholder="Select"
            options={rejectedByOptions}
          />
        );
      },
    },
    {
      name: "Approved by CEO",
      hide: status !== CandidateStatus.REJECTED,
      render: () => {
        return (
          <AntdSwitch control={control} name='ceo_approved' label='Approved by CEO'  />
        );
      },
    },
    {
      name: "Created by",
      hide: status === CandidateStatus.APPLICANT,
      render: () => {
        return (
          <MySelect
            name="created_by"
            control={control}
            label="Created by"
            placeholder="Select"
            options={userOptions}
          />
        );
      },
    },
  ];
};
