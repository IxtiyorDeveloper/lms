import React, { useEffect, useState } from "react";
import { GroupsWrapper, TeachersAndGroupsWrapper } from "./style";
import { Empty, Spin } from "antd";
import { TeacherGroups } from "./components";
import _ from "lodash";

const GroupsData = ({ isLoading, data }: { isLoading: boolean; data: any }) => {
  const [sortedData, setSortedData] = useState(data || []);

  useEffect(() => {
    const dataForSort = data?.map((teacher: any) => {
      return {
        ...teacher,
        groups: _.sortBy(teacher.groups, "time"),
      };
    });
    setSortedData(dataForSort);
  }, [data]);

  return (
    <Spin spinning={isLoading}>
      <TeachersAndGroupsWrapper>
        {data === undefined ? (
          <GroupsWrapper>
            <div className="empty">
              <Empty />
            </div>
          </GroupsWrapper>
        ) : (
          sortedData?.map((teacher: any, index: number) => {
            return <TeacherGroups key={index} data={teacher} />;
          })
        )}
      </TeachersAndGroupsWrapper>
    </Spin>
  );
};

export default GroupsData;
