import React, { FC } from "react";
import { GroupsWrapper, Groups } from "./style";
import { Button, CircleImage, PrintDocSvg } from "components";
import Group from "../group";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { Empty } from "antd";

const TeacherGroups: FC<{ data: any }> = ({ data }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(
      toggleModal({
        key: "blackListPrint",
        data: {
          data: data,
          open: true,
        },
      })
    );
  };

  return (
    <GroupsWrapper>
      <div className="head">
        <div className="teacher">
          <CircleImage src={data.avatar} width={100} height={100} />
          <div>
            <h2 className="name">{data.name}</h2>
            <span>
              {data.shift} {data.role}
            </span>
          </div>
        </div>
        <div className="print">
          <Button onClick={handleOpenModal} className="btn">
            Print &nbsp;
            <PrintDocSvg />
          </Button>
        </div>
      </div>
      <Groups>
        {!data?.groups?.length ? <Empty /> : null}
        {data?.groups.map((group: any, index: number) => {
          return <Group group={group} key={index} />;
        })}
      </Groups>
    </GroupsWrapper>
  );
};

export default TeacherGroups;
