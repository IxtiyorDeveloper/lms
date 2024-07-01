import { Spin } from "antd";
import { useEffect } from "react";
import { Collapse } from "components";
import { useForm } from "react-hook-form";
import { queryKeys } from "constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { VacancyStatus } from "../jobListRow/type";
import { validationErrorHandler } from "utils";
import { useGetConfigVacancy, useSwitchVacancy } from "hooks";
import { Panel } from "./panel";

import { CollapseHeaderWrapper, CollapseWrapper } from "./style";

const Vacancy = () => {
  const queryClient = useQueryClient();
  const { control, watch } = useForm();

  const { data, isLoading } = useGetConfigVacancy();

  const changeStatus = useSwitchVacancy({
    onSuccess: () => {
      toast.success("Change status successfully");
      queryClient.invalidateQueries([queryKeys.config_vacancy_index]);
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  useEffect(() => {
    const subscription = watch?.((value, { name, type }) => {
      changeStatus.mutate({
        role_id: name,
        status: value[name!] ? VacancyStatus.ACTIVE : VacancyStatus.NOT_ACTIVE,
      });
    });
    return () => subscription?.unsubscribe();
  }, [watch]);

  return (
    <Spin spinning={isLoading}>
      <CollapseHeaderWrapper>
        <p>Name</p>
        <p>Action</p>
      </CollapseHeaderWrapper>
      <CollapseWrapper>
        <Collapse
          bordered={false}
          items={Panel({
            control,
            data,
          })}
        />
      </CollapseWrapper>
    </Spin>
  );
};

export default Vacancy;
