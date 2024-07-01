import { useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Row, Col, Flex, Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import {
  AntdModal,
  MySelect,
  DatePicker,
  TimePicker,
  Input,
  Button,
  CircleImage,
  ClearSvg,
} from "components";
import { useEffect, useMemo } from "react";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";
import { bgColors, textColors } from "styles/theme";
import {
  useAbsentMeeting,
  useClearMeeting,
  useGetHRInitialData,
  useGetMeetingDays,
  useMeetingResponsible,
  useSetMeeting,
} from "hooks";
import {
  ContainerTop,
  DataPickerWrapper,
  Footer,
  SelectWrapper,
  TimePickerWrapper,
} from "./style";
import { toast } from "react-toastify";
import moment from "moment";
import {
  DATE_FORMAT_CREATED_AT,
  DATE_FORMAT_HH_mm,
  DATE_FORMAT_YYYY_MM_DD,
  DATE_FORMAT_YYYY_MM_DD_HH_mm,
} from "constants/dates";
import dayjs from "dayjs";
import { ICandidate } from "types";
import { MeetingAction } from "components/elements/labels/meeting/type";
import MeetingTable from "../approveCandidateModal/meetingTable";

const MeetingCandidateModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    meetingCandidateModal: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const candidate = data?.candidate as ICandidate;

  const {
    data: responsible,
    isLoading,
    isFetching,
  } = useMeetingResponsible({
    enabled: open,
    query_params: {
      stage: candidate?.stage,
      vacancy_id: candidate?.vacancy?.id,
    },
  });

  const disabled = data?.type === MeetingAction.ABSENT;

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm<any>();

  const meeting = {
    date: watch("root.date"),
    meeting_responsible_id: watch("root.meeting_responsible_id"),
  };

  const { data: initialData } = useGetHRInitialData({
    enabled: open,
  });

  const { data: meetingDays } = useGetMeetingDays({
    body: {
      date: moment(meeting?.date, DATE_FORMAT_YYYY_MM_DD_HH_mm).format(
        DATE_FORMAT_YYYY_MM_DD
      ),
      responsible_id: meeting?.meeting_responsible_id,
    },
    enabled: !!meeting?.date && !!meeting?.meeting_responsible_id && !disabled,
  });

  const setMeeting = useSetMeeting({
    onSuccess: () => {
      toast.success("Meeting created successfully");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.applicant_main_index],
      });
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const absentMeeting = useAbsentMeeting({
    onSuccess: () => {
      toast.success("Meeting absent successfully");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.applicant_main_index],
      });
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const clearMeeting = useClearMeeting({
    onSuccess: () => {
      toast.success("Meeting clear successfully");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.applicant_main_index],
      });
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleClose = () => {
    reset({});
    queryClient.setQueryData(
      [queryKeys.admin_v1_main_general_get_meeting_responsible],
      () => undefined
    );
    dispatch(
      toggleModal({
        key: "meetingCandidateModal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const responsibleOptions = useMemo(() => {
    return responsible?.map((item) => ({
      label: (
        <Row gutter={10} align="middle">
          <Col>
            <CircleImage width={34} height={34} alt="" src={item.avatar} />
          </Col>
          <Col>
            {item?.fullName} ({item?.role})
          </Col>
        </Row>
      ),
      value: item.id,
      extra: item.fullName,
    }));
  }, [responsible]);

  const branchOptions = useMemo(() => {
    return initialData?.branchList?.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }, [initialData]);

  const onSubmit = (values: any) => {
    const date = moment(values.root.date, DATE_FORMAT_YYYY_MM_DD_HH_mm).format(
      DATE_FORMAT_YYYY_MM_DD
    );
    const time = values.root.time && values.root.time.format(DATE_FORMAT_HH_mm);
    const meeting_datetime = `${date} ${time}`;

    const branch = initialData?.branchList?.find(
      (item) => item?.id == values.root?.meeting_branch_id
    );

    if (disabled) {
      absentMeeting.mutate({
        query_params: {
          id: candidate?.id,
        },
        body: {
          comment: values.root.comment,
          meeting_id: data?.meeting?.id,
        },
      });
    } else {
      setMeeting.mutate({
        query_params: {
          id: candidate?.id,
        },
        body: {
          meeting_datetime,
          comment: values.root.comment,
          meeting_responsible_id: values.root.meeting_responsible_id,
          meeting_branch_id: values.root?.meeting_branch_id,
          meeting_location_url: branch?.location_url,
          meeting_branch_name: branch?.name,
          ...(data?.meeting ? { meeting_id: data?.meeting?.id } : {}),
        },
      });
    }
  };

  const handleClearMeeting = () => {
    const values = getValues();
    const date = moment(values.root.date, DATE_FORMAT_YYYY_MM_DD_HH_mm).format(
      DATE_FORMAT_YYYY_MM_DD
    );
    const time = values.root.time && values.root.time.format(DATE_FORMAT_HH_mm);
    const meeting_datetime = `${date} ${time}`;
    clearMeeting.mutate({
      query_params: {
        id: candidate?.id,
      },
      body: {
        meeting_datetime,
        meeting_responsible_id: values.root.meeting_responsible_id,
      },
    });
  };

  useEffect(() => {
    if (!!data?.meeting) {
      setValue("root", {
        comment: disabled ? "" : data?.meeting?.comment,
        meeting_responsible_id: data?.meeting?.responsible?.id,
        meeting_branch_id: data?.meeting?.options?.branch_id,
        time: dayjs(data?.meeting?.datetime, DATE_FORMAT_CREATED_AT),
        date: dayjs(data?.meeting?.datetime, DATE_FORMAT_CREATED_AT).format(
          DATE_FORMAT_YYYY_MM_DD_HH_mm
        ),
      });
    }

    return () => {};
  }, [data, isFetching]);

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      forceRender
      title={<h3>{data?.title}</h3>}
      destroyOnClose
      padding="20px"
    >
      <Spin spinning={isLoading || isFetching}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ContainerTop>
            <SelectWrapper size="large">
              <MySelect
                name="root.meeting_responsible_id"
                label="Responsible person"
                placeholder="Select responsible person"
                control={control}
                options={responsibleOptions}
                disabled={disabled}
                filterOption={(input, option) => {
                  return option?.extra
                    ?.toLowerCase()
                    .includes(input.toLowerCase());
                }}
              />
            </SelectWrapper>
            <Row gutter={12}>
              <Col span={12}>
                <DataPickerWrapper>
                  <DatePicker
                    name="root.date"
                    label="Date"
                    control={control}
                    disabled={disabled}
                    disabledDate={(current) =>
                      current.isBefore(moment().startOf("day") as any)
                    }
                  />
                </DataPickerWrapper>
              </Col>
              <Col span={12}>
                <TimePickerWrapper>
                  <TimePicker
                    label="Time"
                    name="root.time"
                    defaultValue={watch("root.time")}
                    format={DATE_FORMAT_HH_mm}
                    control={control}
                    disabled={disabled}
                    watchDefaultValue={open}
                    defaultOpenValue={dayjs()}
                  />
                </TimePickerWrapper>
              </Col>
            </Row>

            <SelectWrapper>
              <MySelect
                label="Branch"
                control={control}
                options={branchOptions}
                disabled={disabled}
                placeholder="Select branch"
                name="root.meeting_branch_id"
              />
            </SelectWrapper>

            {!!meetingDays?.length && <MeetingTable data={meetingDays} />}
          </ContainerTop>

          <Input
            label="Comment"
            name="root.comment"
            type="textarea"
            control={control}
            placeholder="Type here..."
          />

          <Footer>
            <div>
              {data?.type === MeetingAction.EDIT && (
                <Button
                  bgColor={bgColors.pop}
                  icon={<ClearSvg />}
                  style={{
                    color: textColors.white,
                  }}
                  buttonLoading={clearMeeting.isLoading}
                  onClick={handleClearMeeting}
                >
                  Clear meeting
                </Button>
              )}
            </div>
            <Flex gap={10}>
              <Button
                onClick={handleClose}
                bgColor={bgColors.purpleCrystal}
                textColor={textColors.yourShadow}
              >
                Cancel
              </Button>
              <Button type="submit" buttonLoading={setMeeting.isLoading}>
                Save
              </Button>
            </Flex>
          </Footer>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default MeetingCandidateModal;
