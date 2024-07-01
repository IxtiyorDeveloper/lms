import React from "react";
import { Content, LeftContent, RightContent } from "./style";
import { useRouter } from "next/router";
import { useGetOneStudent, useStudentSearchOne } from "hooks";
import { expand } from "./expand";
import { Account } from "./components";
import { AcademicTab } from "components";
import administrativeTabs from "./administrativeTabs";
import { TMenuList } from "components/common/academicTab/type";
import Tabs from "./tabs";
import { Spin } from "antd";
import GiveStationary from "./components/giveStationary";

const Student = () => {
  const router = useRouter();
  const { data, isLoading, isPreviousData } = useGetOneStudent({
    expand,
    id: router.query.studentId,
    type: "update",
  });

  const { data: ars } = useStudentSearchOne({
    query_params: {
      user_id: router.query.studentId,
    },
  });

  return (
    <Spin spinning={isLoading || isPreviousData}>
      <Content>
        <LeftContent>
          <div className="top">
            <Account data={data} ars={ars} />
          </div>
          <div className="bottom">
            <div className="inner-bottom">
              <p className="title">Administrative</p>
              <AcademicTab
                p={{ pl: "24px", pr: "24px" }}
                menu={administrativeTabs() as TMenuList[]}
                tabItemWidth="90px"
                initValue={+(router?.query?.student_info_tab ?? 0)}
              />
            </div>
          </div>
        </LeftContent>
        <RightContent>
          <p className="title">Academic</p>
          <AcademicTab
            p={{ pl: "24px", pr: "24px" }}
            menu={Tabs({
              student: data,
              isLoading: isLoading || isPreviousData,
            })}
          />
        </RightContent>
      </Content>
      <GiveStationary />
    </Spin>
  );
};

export default Student;
