import { MeetingWrapper } from "./style";
import { ICandidateResponsible } from "types";
import {
  DataPickerWrapper,
  SelectWrapper,
  TimePickerWrapper,
} from "../candidateMeetingModal/style";
import { Col, Row } from "antd";
import { useMemo } from "react";
import MeetingTable from "./meetingTable";
import { useGetMeetingDays } from "hooks";
import dayjs from "dayjs";
import { IBranch } from "types/staffSettings";
import { bgColors } from "styles/theme";
import { MySelect, DatePicker, TimePicker, CircleImage } from "components";
import customParseFormat from "dayjs/plugin/customParseFormat";
const Meeting = ({
  watch,
  control,
  userList,
  branchList,
}: {
  control: any;
  watch: any;
  userList: ICandidateResponsible[] | undefined;
  branchList?: IBranch[] | undefined;
}) => {
  const meeting = watch("meeting");

  const { data: meetingDays } = useGetMeetingDays({
    body: {
      date: meeting?.date,
      responsible_id: meeting?.meeting_responsible_id,
    },
    enabled: !!meeting?.date && !!meeting?.meeting_responsible_id,
  });

  const responsibleOptions = useMemo(() => {
    return userList?.map((item) => ({
      label: (
        <Row gutter={10} align="middle">
          <Col>
            <CircleImage
              width={34}
              height={34}
              alt=""
              src={item.avatar}
              style={{
                zIndex: 100,
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </Col>
          <Col>
            {item?.fullName} ({item?.role})
          </Col>
        </Row>
      ),
      value: item.id,
      extra: item.fullName,
    }));
  }, [userList]);

  const disabledTime = (current: any) => {
    const time = watch("meeting.time") && watch("meeting.time").format("HH:mm");
    const disabledTimes = meetingDays?.map((item) => item.time);
    const disabled = disabledTimes?.find(
      (item) => item.split(":")[0] == time?.split(":")[0]
    );
    return {
      disabledHours: () => [],
      disabledMinutes: () => [Number(disabled?.split(":")[1])],
    };
  };

  const branchOptions = useMemo(() => {
    return branchList?.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }, [branchList]);

  dayjs.extend(customParseFormat);

  return (
    <MeetingWrapper>
      <SelectWrapper size="large">
        <MySelect
          control={control}
          options={responsibleOptions}
          label="Responsible person"
          name="meeting.meeting_responsible_id"
          placeholder="Select responsible person"
          dropdownStyle={{
            zIndex: 1000,
          }}
          filterOption={(input, option) => {
            return option?.extra?.toLowerCase().includes(input.toLowerCase());
          }}
        />
      </SelectWrapper>
      <Row gutter={12}>
        <Col span={12}>
          <DataPickerWrapper>
            <DatePicker name="meeting.date" label="Date" control={control} />
          </DataPickerWrapper>
        </Col>
        <Col span={12}>
          <TimePickerWrapper>
            <TimePicker
              name="meeting.time"
              label="Time"
              format="HH:mm"
              control={control}
              // disabledTime={disabledTime}
              defaultOpenValue={dayjs("00:00", "HH:mm")}
            />
          </TimePickerWrapper>
        </Col>
      </Row>
      <SelectWrapper>
        <MySelect
          label="Branch"
          control={control}
          options={branchOptions}
          placeholder="Select branch"
          name="meeting.meeting_branch_id"
          style={{
            backgroundColor: bgColors.white,
          }}
        />
      </SelectWrapper>

      {!!meetingDays?.length && <MeetingTable data={meetingDays} />}
    </MeetingWrapper>
  );
};

export default Meeting;
