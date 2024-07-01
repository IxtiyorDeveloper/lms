import React, { FC, useEffect } from "react";
import { Wrapper } from "./style";
import { ITeacherReplaceInfoTeacher } from "types";
import { CircleImage, DatePicker, DoubleArrowSvg, MySelect } from "components";
import { usePageDataMemo } from "hooks";
import { NO_SUPPORT } from "app/academic-resource/control/components/filter/progressFilter";
import { findNextAvailableDate } from "utils/functions/findNextAviableDay";

interface IProps {
  data?: ITeacherReplaceInfoTeacher[];
  lessonDays?: string[];
  control: any;
  name: string;
  setValue: any;
  hidden: boolean;
  isTeacher: boolean;
}

function transformArray(
  inputArray: any[]
): (ITeacherReplaceInfoTeacher | null)[][] {
  const result: (any | null)[][] = [];
  const len = inputArray.length;
  for (let i = 0; i <= (len % 2 == 0 ? len + 1 : len); i++) {
    const subarray = [inputArray[i], inputArray[i + 1] || null];
    result.push(subarray);
    if (!inputArray[i + 1]) {
      break;
    }
  }
  return result;
}

const Info: FC<IProps> = ({
  data,
  control,
  name,
  setValue,
  hidden,
  isTeacher,
  lessonDays,
}) => {
  const transformedData = transformArray(data || []);
  const pageData = usePageDataMemo();

  useEffect(() => {
    if (!!transformedData) {
      transformedData.map((i, j) => {
        const isLast = j + 1 == transformedData.length;
        i.map((e, g) => {
          if (isLast) {
            const a = findNextAvailableDate(lessonDays || []);
            if (g == 0) {
              setValue(`${name}.i_${j}.${g}_date`, a);
            } else {
              const indexOfItem = lessonDays?.findIndex((i) => i == a);
              setValue(
                `${name}.i_${j}.${g}_date`,
                indexOfItem ? lessonDays?.[indexOfItem + 1] : null
              );
            }
          } else {
            setValue(
              `${name}.i_${j}.${g}_date`,
              g == 0 ? e?.from_date : e?.to_date
            );
          }
          setValue(
            `${name}.i_${j}.${g}_id`,
            e?.user?.id
              ? (e?.user?.id).toString()
              : isLast && g == 0
              ? isTeacher
                ? -1
                : NO_SUPPORT
              : null
          );
        });
      });
    }
  }, [transformedData]);
  return (
    <Wrapper hidden={hidden}>
      {transformedData?.map((i, indexCount) => {
        const isLast = indexCount + 1 == transformedData.length;
        return (
          <div className="item">
            <div>Form {indexCount + 1}</div>
            <div className="childs">
              {i.map((e, index) => {
                return (
                  <>
                    <div className="child">
                      <div className="info">
                        <CircleImage src={e?.user.userProfile?.avatar} />

                        <div>
                          {e?.user?.userProfile ? (
                            <div>
                              {e?.user.userProfile?.firstname + " "}
                              {e?.user.userProfile?.lastname}
                            </div>
                          ) : (
                            <div className="no-name">Name</div>
                          )}
                        </div>
                      </div>
                      <div style={{ width: "100%" }}>
                        <MySelect
                          style={{ width: "100%" }}
                          name={`${name}.i_${indexCount}.${index}_id`}
                          control={control}
                          label={
                            isTeacher
                              ? index == 0
                                ? "Last Teacher"
                                : "Changed Teacher"
                              : index == 0
                              ? "Last Support"
                              : "Changed Support"
                          }
                          placeholder="Select"
                          options={
                            isTeacher ? pageData.teacher : pageData.support
                          }
                          disabled={!isLast || index == 0}
                        />
                      </div>

                      <div style={{ width: "100%" }}>
                        <DatePicker
                          name={`${name}.i_${indexCount}.${index}_date`}
                          control={control}
                          label={
                            index == 0
                              ? "Lesson over date"
                              : "Lesson start date"
                          }
                          disabled={isLast ? index == 1 : true}
                          enabledDates={lessonDays}
                        />
                      </div>
                    </div>
                    {index == 0 && <DoubleArrowSvg width={14} height={14} />}
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default Info;
