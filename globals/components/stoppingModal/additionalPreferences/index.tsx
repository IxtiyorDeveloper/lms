import { Content, Wrapper } from "./style";
import { CallXIcon, PodoSvg, XIconSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { DatePicker, MySelect, RedBadgeTitle } from "components";
import { FC } from "react";
import { usePageDataMemo } from "hooks";
import lodash from "lodash";
import { CloseOutlined } from "@ant-design/icons";

interface IProps {
  control: any;
  setValue: any;
  watch: any;
}

const AdditionalPreferences: FC<IProps> = ({ control, watch, setValue }) => {
  const { teacher } = usePageDataMemo();

  const teachers = watch("root.teacher_id");
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
      <Content>
        <div className="warning">
          <PodoSvg width={20} height={20} color={bgColors.white} />
          <div>
            We do not recommend adding these preferences, it reduces the number
            of recommended groups for this student because systems considers
            this preferences as “Strict”.
          </div>
        </div>
        <div className="input-container">
          <div className="input-item">
            <RedBadgeTitle title="Teacher preferences" count={len} />
            <div className="w-100">
              <div className="mt">
                <MySelect
                  control={control}
                  name="tools.teachers"
                  label="Add teacher"
                  options={teacher}
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
                        <CloseOutlined />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="input-item">
            <div className="title">Start date</div>
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
    </Wrapper>
  );
};

export default AdditionalPreferences;
