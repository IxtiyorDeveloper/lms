import {
  AntdModal,
  Button,
  Call,
  CircleImage,
  Input,
  Mail,
  PhoneCell,
  TreeSelect,
} from "components";
import Switch from "components/antd/switch";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { ICandidate } from "types";
import { Row, Col, Flex, Spin, Skeleton } from "antd";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import {
  CandidateInfo,
  FormWItemrapper,
  FormWrapper,
  ModalFooter,
  ModalHeader,
  Title,
  TreeSelectWrapper,
} from "./style";
import {
  useApproveCandidate,
  useApproveInfo,
  useGetHRInitialData,
  useGetStageList,
  useMeetingResponsible,
} from "hooks";
import { validationErrorHandler } from "utils";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import Meeting from "./meeting";
import { useEffect, useMemo } from "react";
import { DATE_FORMAT_HH_mm } from "constants/dates";
import SelectVacancy from "./components/selectVacancy";
import { CandidateStages, CandidateStatus } from "constants/hr";
import { Options } from "./options";
import BonusForm from "../candidateModal/components/bonus";

const CandidateApproveModal = () => {
  const dispatch = useDispatch();
  const {
    control,
    watch,
    reset,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm();
  const queryClient = useQueryClient();

  const {
    approveCandidate: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const candidate = data?.candidate as ICandidate;
  const [status, stage] = String(watch("status"))?.split("_");
  const [department_id, vacancy_id] = String(watch("vacancy") ?? "")?.split(
    "_"
  );
  const { data: approveInfo, isLoading } = useApproveInfo({
    id: candidate?.id,
    enabled: open && !!candidate?.id,
  });

  const { data: stageList, isLoading: stageListLoading } = useGetStageList({
    query_params: {
      vacancy_id: vacancy_id ?? candidate?.vacancy?.id,
    },
    enabled: open && !!candidate?.id,
  });

  const { data: responsible } = useMeetingResponsible({
    enabled: open && !!candidate?.id && !!stage,
    query_params: {
      stage: stage,
      vacancy_id: vacancy_id ?? candidate?.vacancy?.id,
    },
  });

  const updateKeys = () => {
    const queryKeysToInvalidate = [
      [queryKeys.applicant_main_index],
      [queryKeys.applicant_status_list],
    ];
    queryKeysToInvalidate.forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey });
    });
  };

  const approve = useApproveCandidate({
    onSuccess: () => {
      updateKeys();
      handleClose();
      toast.success("Successfully");
    },
    onError: (err: any) => {
      validationErrorHandler({ err, setError, showToast: true });
    },
  });

  const { data: initialData, isLoading: initialDataLoading } =
    useGetHRInitialData({
      enabled: open,
    });

  const handleClose = () => {
    reset();
    dispatch(
      toggleModal({
        key: "approveCandidate",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const isMeeting = watch("on_meeting");

  const onSubmit = (values: any) => {
    const [status, stage] = String(values?.status)?.split("_");
    const [department_id, vacancy_id] = String(values?.vacancy ?? "")?.split(
      "_"
    );
    const meeting = values?.meeting;
    const time = meeting?.time && meeting?.time?.format(DATE_FORMAT_HH_mm);
    const branch = initialData?.branchList?.find(
      (item) => item?.id == meeting?.meeting_branch_id
    );

    const allValues = {
      ...values.root,
      stage: Number(stage),
      status: Number(status),
      department_id: !!department_id?.length
        ? department_id
        : approveInfo.department_id,
      vacancy_id: vacancy_id ?? approveInfo?.current_vacancy_id,
      comment: values?.comment,
      on_meeting: values?.on_meeting,
      notify_candidate: values?.notify_candidate,
      meeting_datetime: time && `${meeting?.date} ${time}`,
      meeting_responsible_id: meeting?.meeting_responsible_id,
      meeting_branch_id: meeting?.meeting_branch_id,
      meeting_location_url: branch?.location_url,
      meeting_branch_name: branch?.name,
    };

    approve.mutate({
      query_params: {
        id: candidate?.id,
      },
      body: allValues,
    });
  };

  useEffect(() => {
    const department = initialData?.departmentListByVacancy?.find(
      (item) => item?.id == approveInfo?.department_id
    );
    const is_vacancy = department?.vacancyList?.find(
      (item) => item?.id == approveInfo?.current_vacancy_id
    );
    if (!isLoading && !initialDataLoading && is_vacancy) {
      setValue(
        "vacancy",
        `${approveInfo?.department_id}_${approveInfo?.current_vacancy_id}`
      );
      setValue("notify_candidate", true);
    }
  }, [
    approveInfo?.current_vacancy_id,
    initialData?.departmentListByVacancy,
    isLoading,
    initialDataLoading,
  ]);

  useEffect(() => {
    if (stage) {
      setValue("meeting", {
        date: undefined,
        time: undefined,
        meeting_branch_id: undefined,
        meeting_responsible_id: undefined,
      });
    }
  }, [stage]);

  useEffect(() => {
    if (Number(status) !== CandidateStatus.CANDIDATE) {
      setValue("on_meeting", false);
    }
  }, [status]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        clearErrors();
      }
      if (type === "change" && name === "vacancy") {
        setValue("status", undefined);
        setValue("root.bonus_for_type", undefined);
        setValue("root.bonus_for", undefined);
        setValue("root.bonus_for_id", undefined);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const stagesObj = stageList
      ?.find((item) => item?.value === CandidateStatus.CANDIDATE)
      ?.stages?.at(0) as any;
    const stages = Object.entries(stagesObj ?? {})?.map(([key, value]) => ({
      key,
      value,
    }));
    const isNextStage = stages?.find(
      (item) => item?.key == approveInfo?.next_stage
    );

    const isStage = approveInfo?.next_stage && isNextStage;
    const isStatus = stageList?.find(
      (item) => item?.value === approveInfo?.current_status
    );

    if (!!approveInfo && !!stages) {
      if (
        approveInfo?.current_status === CandidateStatus.CANDIDATE &&
        isStage
      ) {
        setValue(
          "status",
          `${approveInfo?.current_status}_${approveInfo?.next_stage}`
        );
      } else if (
        approveInfo?.current_status !== CandidateStatus.CANDIDATE &&
        isStatus
      ) {
        setValue("status", `${approveInfo?.current_status}`);
      }
    }
  }, [approveInfo, open, stageList]);

  const isBonusFor = useMemo(() => {
    const vacancy = initialData?.vacancyList?.find(
      (item) => item?.id == Number(vacancy_id)
    );
    return Number(vacancy?.is_bonus_for ?? 0);
  }, [vacancy_id]);

  return (
    <AntdModal open={open} centered width={520} padding="4px">
      <Spin spinning={isLoading || stageListLoading}>
        <ModalHeader>
          <Title>Approve</Title>
          <CandidateInfo>
            <Row justify="space-between" wrap={false}>
              <Col className="col_left">
                <CircleImage
                  src={data?.candidate?.candidateAvatar?.url ?? "/user.svg"}
                  width={75}
                  height={75}
                />
                <Flex vertical gap={8}>
                  <h4>
                    {candidate?.first_name} {candidate?.last_name} (
                    {candidate?.age})
                  </h4>
                  <PhoneCell value={candidate?.candidatePhoneNumbers} />

                  <SelectVacancy
                    control={control}
                    name="vacancy"
                    data={initialData?.departmentListByVacancy}
                    defaultValue={
                      initialData?.vacancyList?.find(
                        (item) => item?.id == approveInfo?.current_vacancy_id
                      )?.title
                    }
                  />
                </Flex>
              </Col>
              <Col className="col_right">
                <Flex justify="flex-end" gap={10}>
                  <Call
                    size="small"
                    key={`call_${candidate?.id}_key`}
                    value={candidate?.candidatePhoneNumbers || []}
                  />
                  <Mail
                    key={`sms_${candidate?.id}_key`}
                    size="small"
                    onClick={() => {
                      dispatch(
                        toggleModal({
                          key: "candidateSMS",
                          data: {
                            data: {
                              candidate: candidate,
                            },
                            open: true,
                          },
                        })
                      );
                    }}
                  />
                </Flex>
                {stageListLoading || isLoading ? (
                  <Skeleton.Button
                    active
                    style={{
                      width: 100,
                      height: 36,
                      borderRadius: 20,
                    }}
                  />
                ) : (
                  <TreeSelectWrapper>
                    <TreeSelect
                      control={control}
                      name="status"
                      options={Options({
                        stageList,
                      })}
                      placeholder="Select"
                      className="tree_select_candidate"
                      loading={stageListLoading || isLoading}
                      dropdownStyle={{
                        width: "auto",
                      }}
                      treeDefaultExpandAll
                    />
                  </TreeSelectWrapper>
                )}
              </Col>
            </Row>
          </CandidateInfo>
        </ModalHeader>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          {(approveInfo?.current_status === CandidateStatus.REJECTED ||
            approveInfo?.current_status === CandidateStatus.BANNED) &&
            !!isBonusFor && (
              <BonusForm
                control={control}
                initialData={initialData}
                watch={watch}
                setValue={setValue}
              />
            )}
          <FormWItemrapper>
            <Switch
              name="on_meeting"
              label="Meeting"
              control={control}
              disabled={
                Number(status) !== CandidateStatus.CANDIDATE ||
                Number(stage) === CandidateStages.APPROVED ||
                Number(stage) === CandidateStages.NEW
              }
            />
          </FormWItemrapper>
          {isMeeting && (
            <Meeting
              control={control}
              watch={watch}
              userList={responsible}
              branchList={initialData?.branchList}
            />
          )}
          <Input
            label="Comment"
            name="comment"
            control={control}
            type="textarea"
            rows={3}
            placeholder="Type here..."
          />
          <FormWItemrapper>
            <Switch
              name="notify_candidate"
              label="Notify Candidate"
              control={control}
            />
          </FormWItemrapper>
        </FormWrapper>
        <ModalFooter>
          <Button
            type="submit"
            className="button"
            bgColor={bgColors.wildSand}
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="button"
            buttonLoading={approve.isLoading}
            onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </ModalFooter>
      </Spin>
    </AntdModal>
  );
};

export default CandidateApproveModal;
