import {
  AntdModal,
  Button,
  Call,
  CircleImage,
  Input,
  Mail,
  PhoneCell,
} from "components";
import Switch from "components/antd/switch";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { ICandidate } from "types";
import { Row, Col, Badge, Flex } from "antd";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import {
  ActionsWrap,
  CandidateInfo,
  FormWItemrapper,
  FormWrapper,
  ModalFooter,
  ModalHeader,
  Title,
} from "./style";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useGetHRInitialData, useRejectedCandidate } from "hooks";
import SelectVacancy from "../approveCandidateModal/components/selectVacancy";
import { useEffect } from "react";

const RejectCandidateModal = () => {
  const dispatch = useDispatch();
  const { control, reset, setValue, handleSubmit } = useForm();
  const queryClient = useQueryClient();

  const {
    rejectCandidate: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const { data: initialData } = useGetHRInitialData({
    enabled: open,
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

  const rejected = useRejectedCandidate({
    onSuccess: () => {
      updateKeys();
      handleClose();
      toast.error("Candidate rejected successfully", {
        theme: "colored",
      });
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const handleClose = () => {
    reset();
    dispatch(
      toggleModal({
        key: "rejectCandidate",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const candidate = data?.candidate as ICandidate;

  const onSubmit = (values: any) => {
    const allValues = Object.entries(values).filter(([key, value]) => value);
    const body = Object.fromEntries(allValues);
    if (!values?.vacancy) {
      return toast.error("Please select a candidate role!");
    }

    const [department_id, vacancy_id] = values?.vacancy?.split("_");

    rejected.mutate({
      query_params: {
        id: candidate?.id,
      },
      body: {
        ...body,
        vacancy_id: vacancy_id ?? candidate?.vacancy?.id,
        department_id: !!department_id?.length
          ? department_id
          : candidate?.vacancy?.department_id,
      },
    });
  };

  useEffect(() => {
    const department = initialData?.departmentListByVacancy?.find(
      (item) => item?.id == +candidate?.vacancy?.department_id
    );
    const is_vacancy = department?.vacancyList?.find(
      (item) => item?.id == candidate?.vacancy?.id
    );

    if (is_vacancy) {
      setValue(
        "vacancy",
        `${candidate?.vacancy?.department_id}_${candidate?.vacancy?.id}`
      );
      setValue("notify_candidate", true);
    }
  }, [open, candidate, initialData?.departmentListByVacancy]);

  return (
    <AntdModal open={open} centered width={520} padding="4px">
      <ModalHeader>
        <Title>Reject</Title>
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
                  defaultValue={String(candidate?.vacancy?.title)}
                />
              </Flex>
            </Col>
            <Col className="col_right">
              <ActionsWrap>
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
              </ActionsWrap>

              <Badge count="Rejected" color={bgColors.pop}></Badge>
            </Col>
          </Row>
        </CandidateInfo>
      </ModalHeader>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Comment"
          name="comment"
          control={control}
          type="textarea"
          rows={3}
          placeholder="Type here..."
          style={{
            marginBottom: 0,
          }}
        />
        <FormWItemrapper>
          <Switch
            name="notify_candidate"
            label="Notify Candidate"
            control={control}
          />
        </FormWItemrapper>
        <FormWItemrapper>
          <Switch name="is_banned" label="Banned" control={control} />
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
          buttonLoading={rejected.isLoading}
          onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </ModalFooter>
    </AntdModal>
  );
};

export default RejectCandidateModal;
