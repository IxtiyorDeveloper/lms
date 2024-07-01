import { Spin } from "antd";
import { FC, useEffect, useMemo } from "react";
import { bgColors } from "styles/theme";
import {
  useGetConfigVacancy,
  useGetHRInitialData,
  useGetVacancyData,
  useVacancyFormSave,
} from "hooks";
import { IVacancy } from "types";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { getAllFormValues } from "./values";
import { useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useDispatch } from "react-redux";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import {
  AntdModal,
  Button,
  Paint,
  PaintSecondSvg,
  Segmented,
} from "components";
import { CheckList, JobDescription, Vacancy } from "./components";

import {
  ModalTitle,
  ModalWrapper,
  Buttons,
  PaintWrapper,
  WrapFooter,
} from "./style";
import { vacancyColors } from "constants/colors";

const VacancyConfigModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    vacancyConfig: { open, data: modalData },
  } = useSelector((state: IStore) => state.modals);

  const { data: vacancyData } = useGetConfigVacancy(open);
  const { data, isLoading } = useGetVacancyData(
    {
      role_id: modalData.role_id,
    },
    open,
  );

  const {
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{ root: { [key: string]: any } }>();

  useEffect(() => {
    if (!!data && !isLoading) {
      setValue("root", data);
      let a: any = [];
      data?.training_stages?.map((item, index) => {
        a = [
          ...a,
          { stage: item.name, order: item.order, id: item.id ?? null },
        ];
      });

      let b = {};
      data?.candidate_stages?.map((item) => {
        b = { ...b, [item.stage]: true };
      });
      setValue("root.candidate_stages", b);
      setValue("root.general.checkList", a.length ? a : [{}]);
    }
  }, [isLoading, data, open]);

  const isHaveColor = useMemo(() => {
    if (data && !isLoading) {
      return data?.color || "";
    }
  }, [data, isLoading, open]);

  const options = [
    {
      label: "Vacancies",
      value: "vacancies",
      children: (
        <Vacancy
          data={data}
          control={control}
          vacancyData={vacancyData}
          role_name={modalData.role_name}
        />
      ),
    },
    {
      label: "Checklist",
      value: "checklist",
      children: (
        <CheckList
          data={data}
          control={control}
          watch={watch}
          setValue={setValue}
          errors={errors}
        />
      ),
    },
    {
      label: "Job description",
      value: "job_description",
      children: (
        <JobDescription
          data={data}
          control={control}
          setValue={setValue}
          errors={errors}
          role_name={modalData.role_name}
        />
      ),
    },
  ];

  const onSubmitChangeColor = (color: string) => {
    setValue("root.color", color);
  };

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "vacancyConfig",
        data: {
          data: {},
          open: false,
        },
      }),
    );
    reset();
  };

  const formSave = useVacancyFormSave({
    onSuccess: (fetchData: IVacancy) => {
      handleClose();
      toast.success("Vacancy config saved");
      queryClient.invalidateQueries([queryKeys.config_vacancy_index]);
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: true,
        formHookMainField: "root",
        setError,
      });
    },
  });

  const handleSave = (data: any) => {
    const values = {
      role_id: modalData.role_id,
      department_id: modalData.department_id,
      ...getAllFormValues(data),
    };
    formSave.mutate(values);
  };

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      width={580}
      forceRender
    >
      <ModalWrapper>
        <ModalTitle>Vacancy Config</ModalTitle>
        <Spin spinning={isLoading}>
          <form onSubmit={handleSubmit(handleSave)}>
            <Segmented block options={options} initValue="vacancies" />

            <WrapFooter>
              <Paint
                size="small"
                isSubmit={false}
                name="root.color"
                isOpen={isHaveColor}
                colors={vacancyColors}
                defaultColor={data?.color || ""}
                onSubmit={(color: string) => onSubmitChangeColor(color)}
                customButton={
                  <PaintWrapper bgColor={watch("root.color") || isHaveColor}>
                    <PaintSecondSvg />
                    Color
                  </PaintWrapper>
                }
              />
              <Buttons>
                <Button
                  className="cancel"
                  bgColor={bgColors.wildSand}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  className="save"
                  type="submit"
                  buttonLoading={formSave.isLoading}
                >
                  Save
                </Button>
              </Buttons>
            </WrapFooter>
          </form>
        </Spin>
      </ModalWrapper>
    </AntdModal>
  );
};

export default VacancyConfigModal;
