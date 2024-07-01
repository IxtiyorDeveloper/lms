import { AntdInfoCell, AntdUserProfile, TableHeading } from "components";
import React from "react";
import { Wrapper, Text } from "./style";
import { Rate, Switch } from "antd";
import Students from "./components/students";
import {
  EObservationStaff,
  EObservationStatus,
  IRankingObservation,
} from "types/observation";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { fields } from "./fields";
import { createGroup } from "utils/observation/createGroup";
import { useDispatch } from "react-redux";
import { toggleModal } from "store";

const Columns = () => {
  const router = useRouter();
  const type = router.query?.tab?.toString() ?? EObservationStaff.teacher;
  const field = fields[type as keyof typeof fields];

  const dispatch = useDispatch();
  const handleOpen = ({
    id,
    status,
  }: {
    id: string;
    status: EObservationStatus;
  }) => {
    dispatch(
      toggleModal({
        key: "changeObservation",
        data: {
          data: {
            id,
            status,
          },
          open: true,
        },
      }),
    );
  };

  const cols = {
    observer: {
      title: (
        <TableHeading isId padding>
          Teacher observer
        </TableHeading>
      ),
      dataIndex: ["observer", "userProfile"],
      render: (value: any, record: IRankingObservation, index: number) => {
        return (
          <AntdUserProfile
            disabled
            props={record}
            propsValue={value}
            index={index}
          />
        );
      },
    },
    created_at: {
      title: <TableHeading>Created date</TableHeading>,
      dataIndex: "created_at",
      render: (value: any, record: any, index: number) => {
        const current = moment(value, "YYYY-MM-DD HH:mm:ss");
        const date = current.format("DD MMM YYYY");
        const time = current.format("HH:mm");
        return (
          <Wrapper>
            <Text>{date}</Text>
            <Text>{time}</Text>
          </Wrapper>
        );
      },
    },
    timetable_date: {
      title: <TableHeading>Timetable & Date</TableHeading>,
      dataIndex: "progress",
      render: (value: any, record: any, index: number) => {
        return (
          <Wrapper>
            <Text>09:30 Thursday</Text>
            <Text>16 Jan 2023</Text>
          </Wrapper>
        );
      },
    },
    students_timetable: {
      title: <TableHeading>Students on this timetable</TableHeading>,
      dataIndex: "progress",
      render: (value: any, record: any, index: number) => {
        return <Students record={record} />;
      },
    },
    score: {
      title: <TableHeading>Observation score</TableHeading>,
      dataIndex: "score",
      render: (value: any, record: any, index: number) => {
        return (
          <Wrapper>
            <Rate value={value} disabled allowHalf />
          </Wrapper>
        );
      },
    },
    teacher_and_support: {
      dataIndex: "details",
      title: <TableHeading>Teacher and Support</TableHeading>,
      render: (value: any, record: any, index: number) => {
        const teacher = value?.teacher;
        const support = value?.support;

        return (
          <Wrapper>
            <Text>{teacher}</Text>
            <Text>{support}</Text>
          </Wrapper>
        );
      },
    },
    group_info: {
      title: <TableHeading>Group info</TableHeading>,
      dataIndex: ["details", "group"],
      render: (value: any, record: any, index: number) => {
        const group = createGroup({ value });
        return (
          <AntdInfoCell
            record={{
              group: {
                id: record?.group_id,
              },
            }}
            value={group}
          />
        );
      },
    },
    publish: {
      dataIndex: "id",
      title: <TableHeading>Publish</TableHeading>,
      render: (value: any, record: any, index: number) => {
        return (
          <Wrapper>
            <Switch
              onClick={(checked, event) => {
                event.stopPropagation();
                handleOpen({ id: value, status: record?.status });
              }}
              checked={record?.status == EObservationStatus.Published}
            />
          </Wrapper>
        );
      },
    },
  };
  return field?.map((item) => cols[item as keyof typeof cols]);
};

export default Columns;
