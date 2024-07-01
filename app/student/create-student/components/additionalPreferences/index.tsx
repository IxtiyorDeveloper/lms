import { Collapse } from "antd";
import { Content, Wrapper } from "./style";
import {
  ArrowSelect180Svg,
  PodoSvg,
  XIconSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { AntdBadge, DatePicker, MySelect } from "components";
import { FC } from "react";
import { usePageDataMemo } from "hooks";
import lodash from "lodash";

interface IProps {
  control: any;
  setValue: any;
  watch: any;
}

const AdditionalPreferences: FC<IProps> = ({ control, watch, setValue }) => {
  const { teacher } = usePageDataMemo();

  const teachers = watch("root.teacher_id");
  const group_type_id = watch("root.group_type_id");
  const len = teachers?.length || 0;

  const onSelectTeacher = (id: number) => {
    id &&
      setValue(
        "root.teacher_id",
        lodash.unionBy(
          [...(teachers || []), teacher.find((e) => e.value == id)],
          (e) => e?.value,
        ),
      );
  };

  return (
    <Wrapper>
      <Collapse
        expandIcon={(p) => (
          <ArrowSelect180Svg
            width={32}
            height={24}
            style={{
              transition: "0.3s",
              transform: `rotate(${p.isActive ? 270 : 90}deg)`,
            }}
          />
        )}
        style={{ border: 0, borderRadius: "16px", overflow: "hidden" }}
        expandIconPosition="right"
        items={[
          {
            key: "1",
            label: <p className="title">Additional preferences</p>,
            children: (
              <Content>
                <div className="warning">
                  <PodoSvg width={20} height={20} color={bgColors.white} />
                  <div>
                    We do not recommend adding these preferences, it reduces the
                    number of recommended groups for this student because
                    systems considers this preferences as “Strict”.
                  </div>
                </div>
                <div className="input-container">
                  <div className="input-item">
                    <div className="title">
                      Teacher preferences
                      <AntdBadge showZero content={len} size="small" />
                    </div>
                    <div className="divider" />
                    <div className="w-100">
                      <div className="mt">
                        <MySelect
                          control={control}
                          name="tools.teachers"
                          label="Add teacher"
                          options={
                            group_type_id
                              ? teacher?.filter((e) =>
                                  e?.group_types?.includes(
                                    group_type_id?.toString(),
                                  ),
                                ) || []
                              : teacher
                          }
                          placeholder="Select"
                          onChangeValue={onSelectTeacher}
                        />
                      </div>
                      <div className="teachers">
                        {teachers?.map((e: any) => {
                          return (
                            <div className="teacher">
                              <div>{e?.label}</div>
                              <div
                                className="x-button"
                                onClick={() =>
                                  setValue(
                                    "root.teacher_id",
                                    (teachers || []).filter(
                                      (i: any) => i?.value !== e?.value,
                                    ),
                                  )
                                }
                              >
                                <XIconSvg width={20} height={20} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="input-item">
                    <div className="title">Start date</div>
                    <div className="divider" />
                    <div className="w-100">
                      <div className="mt">
                        <DatePicker
                          control={control}
                          name="root.start_date"
                          label="Select date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Content>
            ),
          },
        ]}
      />
    </Wrapper>
  );
};

export default AdditionalPreferences;
