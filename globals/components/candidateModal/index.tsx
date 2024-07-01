import { IStore, toggleModal } from "store";
import { AntdModal, Button, NotComeSvg } from "components";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { validationErrorHandler } from "utils";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import Forms from "./components/forms";
import {
  useCreateCandidate,
  useDeleteApplicant,
  useGetCandidate,
  useGetHRInitialData,
  useMergeCandidate,
  useTakeCandidate,
  useUpdateCandidate,
} from "hooks";
import { CandidateStatus } from "constants/hr";
import { MainPhone } from "constants/phoneTypes";
import { Spin } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { CandidateModalType } from "./type";
import { Footer, Buttons } from "./style";
import { setValues } from "./components/setValues";
import CandidateMergeModal from "./components/candidateMergeModal";
import { useRouter } from "next/router";

const CandidateModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    candidateModal: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const { user } = useSelector((state: IStore) => state.user);

  const { data: initialData } = useGetHRInitialData({
    enabled: !!open,
  });

  const { data: candidate, isLoading } = useGetCandidate({
    query_params: {
      id: data?.id,
    },
    enabled: !!data?.id,
  });

  const isMeAvailable =
    initialData?.userList?.find(
      (i) => i?.base_user_id == user?.userProfile?.user_id
    ) ||
    initialData?.rejectedByList?.find(
      (i) => i?.base_user_id == user?.userProfile?.user_id
    );

  const updateKeys = () => {
    const queryKeysToInvalidate = [
      [queryKeys.applicant_main_index],
      [queryKeys.applicant_status_list],
      [...(isMeAvailable ? [] : [queryKeys.hr_initial_data])],
    ];

    queryKeysToInvalidate.forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey });
    });
  };

  const create = useCreateCandidate({
    onSuccess: () => {
      handleClose();
      toast.success("Candidate created successfully");
      updateKeys();
    },
    onError: (err: any) => {
      validationErrorHandler({
        err,
        showToast: false,
        formHookMainField: "root",
        setError,
      });
    },
  });

  const update = useUpdateCandidate({
    onSuccess: () => {
      toast.success("Updated successfully");
      handleClose();
      updateKeys();
    },
    onError: (err: any) => {
      validationErrorHandler({
        err,
        showToast: false,
        formHookMainField: "root",
        setError,
      });
    },
  });

  const take = useTakeCandidate({
    onSuccess: () => {
      toast.success("Changed successfully");
      handleClose();
      updateKeys();
    },
    onError: (err: any) => {
      validationErrorHandler({
        err,
        showToast: false,
        formHookMainField: "root",
        setError,
      });
    },
  });

  const deleteApplicant = useDeleteApplicant({
    onSuccess: () => {
      toast.success("Deleted successfully");
      handleClose();
      updateKeys();
    },
    onError: (err: any) => {
      validationErrorHandler({
        err,
        showToast: false,
        formHookMainField: "root",
        setError,
      });
    },
  });

  const {
    control,
    watch,
    getValues,
    setValue,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    reset();
    queryClient.resetQueries([queryKeys.candidate_model_data]);
    dispatch(
      toggleModal({
        key: "candidateModal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const handleCloseMerge = () => {
    dispatch(
      toggleModal({
        key: "mergeCandidate",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const isDelete =
    watch("is_disabled") && candidate?.status === CandidateStatus.APPLICANT;

  const onSubmit = (values: any) => {
    const status = CandidateStatus.CANDIDATE;
    const allValues = {
      ...values.root,
      status,
      documents: values.root.documents?.map((item: any) => {
        return {
          file_storage_item_id: item.file_storage_item_id,
        };
      }),
    };

    if (isDelete) {
      deleteApplicant.mutate({
        query_params: {
          id: candidate?.id,
        },
      });
    } else {
      if (data?.type === CandidateModalType.CREATE) {
        create.mutate({
          body: allValues,
        });
        return;
      }
      if (data?.type === CandidateModalType.EDIT) {
        update.mutate({
          query_params: {
            id: data?.id,
          },
          body: allValues,
        });
      }
      if (data?.type === CandidateModalType.TAKE) {
        take.mutate({
          query_params: {
            id: data?.id,
          },
          body: allValues,
        });
      }
    }
  };

  const handleReject = () => {
    const values = watch("root");
    const status = CandidateStatus.REJECTED;

    if (data?.type === CandidateModalType.CREATE) {
      create.mutate({
        body: {
          ...values,
          status,
        },
      });
    }
    if (data?.type === CandidateModalType.TAKE) {
      take.mutate({
        query_params: {
          id: data?.id,
        },
        body: {
          ...values,
          status,
        },
      });
    }
  };

  const merge = useMergeCandidate({
    onSuccess: (data) => {
      toast.success("Candidate merged successfully");
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          id: data?.id,
          status: data?.status,
          stage: data?.stage,
          roundedTabIndex: data?.vacancy_id,
        },
      });
      handleCloseMerge();
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleMerge = (candidate: any) => {
    merge.mutate({
      query_params: {
        id: candidate?.id,
      },
      body: {
        ...watch("root"),
        applicant_id: data?.id,
      },
    });
  };

  useEffect(() => {
    if (data?.type !== CandidateModalType.CREATE && candidate && !isLoading) {
      setValues({
        candidate,
        setValue,
      });
    }
  }, [isLoading, candidate, data?.type, open]);

  useEffect(() => {
    if (data?.type === CandidateModalType.CREATE) {
      setValue("root.phone_numbers", [
        { type: MainPhone, phone_number: undefined },
      ]);
    }
  }, [data?.type]);

  useEffect(() => {
    const selectVacancy = Number(watch("root.vacancy_id"));
    const description = watch("root.description");
    const isDesc = description?.length >= 0 ? false : true;
    if (data?.type === CandidateModalType.CREATE && selectVacancy && isDesc) {
      const vacancy = initialData?.vacancyList?.find(
        (item) => item.id == selectVacancy
      );

      setValue("root.description", vacancy?.description_template);
    }
  }, [data?.type, watch("root.vacancy_id"), watch("root.description")]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" && name === "root.vacancy_id") {
        setValue("root.bonus_for_type", undefined);
        setValue("root.bonus_for", undefined);
        setValue("root.bonus_for_id", undefined);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch("root.vacancy_id")]);

  if (!open) return null;
  return (
    <AntdModal
      open={open}
      centered
      width={550}
      forceRender
      title={`${data?.title} candidate`}
      padding="20">
      <Spin spinning={data?.id ? isLoading : false}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Forms
            watch={watch}
            control={control}
            errors={errors}
            getValues={getValues}
            setValue={setValue}
            setError={setError}
            initialData={initialData}
            candidate={candidate}
            clearErrors={clearErrors}
          />
          <Footer>
            <div>
              {(data?.type === CandidateModalType.CREATE ||
                data?.type === CandidateModalType.TAKE) && (
                <Button
                  onClick={handleReject}
                  bgColor={bgColors.pop}
                  icon={<NotComeSvg color={bgColors.white} />}
                  buttonLoading={create.isLoading || take.isLoading}>
                  <span className="reject" style={{ marginLeft: "4px" }}>
                    Online reject
                  </span>
                </Button>
              )}
            </div>
            <Buttons>
              <Button onClick={handleClose} bgColor={bgColors.wildSand}>
                Cancel
              </Button>
              <Button
                type="submit"
                bgColor={isDelete ? bgColors.pop : bgColors.primary}
                style={{
                  color: isDelete ? textColors.white : textColors.dark,
                }}
                disabled={
                  watch("root.is_banned") || watch("root.notify_candidate")
                }
                buttonLoading={
                  create.isLoading ||
                  update.isLoading ||
                  take.isLoading ||
                  deleteApplicant.isLoading
                }>
                {isDelete ? "Delete" : "Save"}
              </Button>
            </Buttons>
          </Footer>
          <CandidateMergeModal
            onSubmit={(data: any) => {
              handleMerge(data?.candidate);
            }}
          />
        </form>
      </Spin>
    </AntdModal>
  );
};

export default CandidateModal;
