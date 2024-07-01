import React, { FC, useCallback, useEffect, useMemo } from "react";
import { Item, Wrapper, Content, SubContent, Top, Title, Right } from "./style";
import {
  AntdSwitch,
  CheckBox,
  CircleQuestionMarkSvg,
  ErrorLabel,
  RedBadgeTitle,
} from "components";
import { bgColors } from "styles/theme";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useController,
} from "react-hook-form";
import { Checkbox } from "antd";
import { separateByType } from "./components/separateByType";
import { findMatchingTypes } from "./components/findMatchingTypes";
import { ELessonTimeType } from "types";
import { getUniqueKeys } from "./components/getUniqueKeys";
import { usePageDataMemo } from "hooks";

interface IProps {
  control: any;
  errors: any;
  watch: any;
  selects: any;
  setValue: any;
}

const TimeSelect: FC<IProps> = ({
  control,
  errors,
  watch,
  selects,
  setValue,
}) => {
  const { time } = usePageDataMemo();
  const values = watch("root.lesson_time_id") || [];
  const isStrict = watch("root.strict_by_time");
  const len = values?.length;

  const onChangeBranch = (
    field: ControllerRenderProps<FieldValues, "root.lesson_time_id">,
    id: any,
  ) => {
    const isHave = (field.value || []).includes(id);
    if (!isHave) {
      field.onChange(
        (field.value || []).length > 0 ? [...field.value, id] : [id],
      );
    } else {
      field.onChange((field.value || []).filter((e: any) => e != id));
    }
  };

  const times = useMemo(() => {
    return separateByType({ arr: time });
  }, [time]);

  useEffect(() => {
    const subscription = watch((value: any, { name, type }: any) => {
      if (name === "root.lesson_time_id") {
        const all = findMatchingTypes({
          values: value?.root?.lesson_time_id,
          times,
        });
        if (times?.length) {
          for (let i = 0; i < times?.length; i++) {
            const exist = all?.some((a: number) => a == times[i].type);
            setValue(`root.all_${times[i].type}`, exist);
          }
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, times]);

  const handleChange = ({
    events,
    type,
  }: {
    events: any;
    type: ELessonTimeType;
  }) => {
    const data = times?.find((f) => f.type == type);
    const current = data?.data;
    let keys: any = [];
    if (current) {
      for (let i = 0; i < current?.length; i++) {
        keys = [...keys, current?.[i]?.value];
      }
    }

    if (events?.target?.checked) {
      const remaining = getUniqueKeys({
        current: watch(`root.lesson_time_id`),
        added: keys,
      });
      setValue(`root.lesson_time_id`, remaining);
    } else {
      let remaining = watch(`root.lesson_time_id`)?.filter(
        (element: any) => !keys.includes(element),
      );
      setValue(`root.lesson_time_id`, remaining);
    }
  };

  const { field } = useController({ control, name: "root.lesson_time_id" });

  useEffect(() => {
    field.onChange(values);
  }, [values]);

  return (
    <Wrapper isStrict={isStrict}>
      <div className="flex">
        <div className="title">
          <RedBadgeTitle count={len} title="Lesson time" />
        </div>
        <div className="flex gap-4">
          <CircleQuestionMarkSvg
            width={16}
            height={16}
            color={bgColors.sadet}
          />
          <div className="strict">Strict</div>
          <div className="ml-4">
            <AntdSwitch
              size="small"
              control={control}
              name="root.strict_by_time"
            />
          </div>
        </div>
      </div>
      <Content>
        {times?.map((item, index) => {
          return (
            <SubContent key={index}>
              <Top>
                <Title>{item?.label}</Title>
                <Right>
                  <CheckBox
                    control={control}
                    name={`root.all_${item?.type}`}
                    onChange={(events) =>
                      handleChange({ events, type: item?.type })
                    }
                    checked={watch(`root.all_${item?.type}`)}
                  >
                    All
                  </CheckBox>
                </Right>
              </Top>
              <Controller
                name="root.lesson_time_id"
                control={control}
                render={({ field }) => {
                  return (
                    <div className="container">
                      {item?.data?.map((e: any) => {
                        const isSelected = (field.value || []).includes(
                          e.value,
                        );
                        return (
                          <Item
                            className="item"
                            onClick={() => onChangeBranch(field, e.value)}
                            isActive={isSelected}
                          >
                            <div className="flex w-100">
                              <div className="branch-name">{e.label}</div>
                              <div>
                                <Checkbox checked={isSelected} />
                              </div>
                            </div>
                          </Item>
                        );
                      })}
                    </div>
                  );
                }}
              />
            </SubContent>
          );
        })}
      </Content>
      <ErrorLabel error={errors?.lesson_time_id?.message} />
    </Wrapper>
  );
};

export default TimeSelect;
