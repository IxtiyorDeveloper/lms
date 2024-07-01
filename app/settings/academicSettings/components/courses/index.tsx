import React from "react";
import {
  Container,
  ContentWrapper,
  Course,
  ImgContent,
  ImgWrapper,
  Row,
  Wrapper,
} from "./style";
import {
  ClockSvg,
  DeleteSvg,
  EditSvg,
  LearningSvg,
  ScoreBoardSvg,
} from "components";
import { bgColors } from "styles/theme";
import Image from "next/image";
import { useCourses } from "hooks";
import { Spin } from "antd";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { queryKeys } from "constants/queryKeys";

const Courses = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading, isPreviousData } = useCourses({
    query_params: {
      expand:
        "coursePrices,lessonTimes,lessonDays.lessonWeeks,parentLevels.children,groupTypes",
    },
  });
  let color: string;
  const handleEdit = (id: number) => {
    router.push({
      pathname: "/settings/academic-settings/create-course",
      query: {
        update_id: id,
      },
    });
  };
  return (
    <Spin spinning={isLoading || isPreviousData}>
      <Wrapper>
        <Container>
          {data?.list?.map((item, index) => {
            let number = index % 4;
            switch (number) {
              case 0:
                color = bgColors.lemon;
                break;
              case 1:
                color = bgColors.transparentGreen;
                break;
              case 2:
                color = bgColors.pale;
                break;
              case 3:
                color = bgColors.sinter;
            }
            const duration = item?.parentLevels?.reduce((acc, cur) => {
              return acc + +(cur?.duration || 0);
            }, 0);
            const subLevels = item?.parentLevels?.reduce((acc, cur) => {
              return acc + +(cur?.children?.length || 0);
            }, 0);
            return (
              <Course key={index}>
                <ImgWrapper style={{ backgroundColor: color }}>
                  <ImgContent>
                    <div className="title">{item?.name}</div>
                    <div className="icons">
                      <div
                        className="editIcon"
                        onClick={() => handleEdit(item?.id)}
                      >
                        <EditSvg />
                      </div>
                      <div
                        className="deleteIcon"
                        onClick={() =>
                          dispatch(
                            toggleModal({
                              key: "deleteCourse",
                              data: {
                                open: true,
                                data: {
                                  courseId: item?.id,
                                  queryKeys: [queryKeys.admin_course_index],
                                },
                              },
                            })
                          )
                        }
                      >
                        <DeleteSvg color={bgColors.yourShadow} />
                      </div>
                    </div>
                  </ImgContent>
                  <div className="img">
                    <Image
                      src="/settings/books.png"
                      alt="staticImage"
                      width={150}
                      height={150}
                    />
                  </div>
                </ImgWrapper>
                <ContentWrapper>
                  <Row>
                    <div className="text">
                      <ScoreBoardSvg />
                      <p>Level</p>
                    </div>
                    <div className="count">{item?.parentLevels?.length}</div>
                  </Row>
                  <Row>
                    <div className="text">
                      <LearningSvg />
                      <p>Sub level</p>
                    </div>
                    <div className="count">{subLevels}</div>
                  </Row>
                  <Row>
                    <div className="text">
                      <ClockSvg />
                      <p>Duration</p>
                    </div>
                    <div className="count">
                      {Math.round(duration / 86400)} days
                    </div>
                  </Row>
                </ContentWrapper>
              </Course>
            );
          })}
        </Container>
      </Wrapper>
    </Spin>
  );
};

export default Courses;
