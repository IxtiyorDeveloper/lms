import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { Label, Wrapper, Inner, Box, TypeContent, BigBox } from "./style";
import ErrorLabel from "./errorLabel";
import { Type } from "./type";
import { bgColors } from "styles/theme";
import { Spin, Tag } from "antd";
import {
  ExamDaysSvg,
  ExamPrepsSvg,
  FinishingDateSvg,
  LessonDaySvg,
  WomDaysSvg,
} from "../../elements";

const RunningType: FC<Type> = ({
  name,
  error = "",
  control,
  required = false,
  label = "",
  data,
  isLoading,
}) => {
  return (
    <Wrapper>
      <Spin spinning={isLoading}>
        {label && (
          <Label required={required} htmlFor={name}>
            {label}
          </Label>
        )}
        <Inner borderColor={!!error ? bgColors.red : bgColors.transparent}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => {
              return (
                <TypeContent>
                  {data?.map((item, k) => {
                    const active = item?.tabId === field?.value;
                    return (
                      <BigBox>
                        <Box
                          key={k}
                          onClick={() => {
                            field.onChange(item?.tabId);
                          }}
                          style={{
                            borderColor: active
                              ? bgColors.primary
                              : bgColors.transparent,
                          }}
                        >
                          {item?.svg}
                          <div className="title">{item?.title}</div>
                          {!!item?.count && (
                            <div className="count">
                              Merged lessons: {item?.count}
                            </div>
                          )}
                          {!!item?.empty_lessons && (
                            <div className="empty">
                              Empty lessons: {item?.empty_lessons}
                            </div>
                          )}
                          <div className="list">
                            <div className="lessons">
                              <div className="left">
                                <LessonDaySvg />
                                <p className="text">Lesson Days</p>
                              </div>
                              <Tag>{item?.lessons}</Tag>
                            </div>
                            <div className="lessons">
                              <div className="left">
                                <ExamPrepsSvg />
                                <p className="text">Exam preparation</p>
                              </div>
                              <Tag>{item?.prep}</Tag>
                            </div>
                            <div className="lessons">
                              <div className="left">
                                <ExamDaysSvg />
                                <p className="text">Exam Days</p>
                              </div>
                              <Tag>{item?.exam_days}</Tag>
                            </div>
                            <div className="lessons">
                              <div className="left">
                                <WomDaysSvg />
                                <p className="text">WOM Days</p>
                              </div>
                              <Tag>{item?.wom_days}</Tag>
                            </div>
                            <div className="lessons">
                              <div className="left">
                                <FinishingDateSvg />
                                <p className="text">Finish date</p>
                              </div>
                              <p className="date-text">{item?.dates}</p>
                            </div>
                          </div>
                          {item?.bottom && (
                            <div
                              className="abs"
                              style={{ backgroundColor: item?.color }}
                            />
                          )}
                        </Box>
                        {item?.error && <p className="error">{item?.error}</p>}
                      </BigBox>
                    );
                  })}
                </TypeContent>
              );
            }}
          />
        </Inner>
        <ErrorLabel error={error} />
      </Spin>
    </Wrapper>
  );
};

export default RunningType;
