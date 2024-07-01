import React from "react";
import { Wrapper } from "./style";
import { AntdTable } from "components";
import { IType } from "./type";
import PotentialColumns from "./components/columns";
import { separateByLessonTimeId } from "./components/separateByLessonTime";
import { findLongestRelatedGroups } from "./components/findLongestRelatedGroups";
import { usePageDataMemo } from "hooks";

const Content = ({
  data,
  day_id,
  potentialGroups,
  initValue,
  isLoading,
}: IType) => {
  const related_groups: any = separateByLessonTimeId({
    data: potentialGroups,
    day_id,
  });

  const dataSource = findLongestRelatedGroups({ data: related_groups });
  const { groupType, level } = usePageDataMemo();

  return (
    <Wrapper>
      <AntdTable
        dataSource={dataSource}
        columns={PotentialColumns({
          data,
          day_id,
          related_groups,
          groupType,
          level,
          initValue,
        })}
        loading={isLoading}
      />
    </Wrapper>
  );
};

export default Content;
