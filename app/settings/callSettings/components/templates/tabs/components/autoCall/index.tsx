import React, { useEffect } from "react";
import { Wrapper, Container, Bottom } from "./style";
import Templates from "./components/templates";
import Main from "./components/main";
import Time from "./components/time";
import { useCallCron, useCallCronSave } from "hooks";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { generateTabs } from "./components/main/components/generateTabs";
import {
  reverseTransformKeys,
  transformKeys,
} from "utils/callTemplate/generateKeyOptions";
import { Spin } from "antd";
import { DATE_FORMAT_HH_mm } from "constants/dates";
import dayjs from "dayjs";
import { Button } from "components";
import { generateTime } from "./components/utils/generateTime";
import { validationErrorHandler } from "utils";
import { toast } from "react-toastify";

const AutoCall = () => {
  const { data, isLoading } = useCallCron();
  const { control, setValue, watch, getValues, handleSubmit } = useForm();
  const { control: templateControl, getValues: getTemplateValues } = useForm();

  const router = useRouter();

  const current_template =
    router.query?.current_template?.toString() ?? data?.crons?.[0]?.key;

  const callCron = data?.crons?.find((f) => f.key == current_template);

  const { menu, templates } = generateTabs({ callCron });

  const main_tab = router.query?.main_tab?.toString() ?? menu?.[0]?.value;

  const currentTemplate = templates?.find((f) => f.id?.toString() == main_tab);

  const save = useCallCronSave({
    onSuccess: () => {
      toast.success("Auto call saved");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  useEffect(() => {
    if (templates) {
      const days = callCron?.config?.timing?.days;
      templates?.map((template, index: number) => {
        setValue(`templates[${index}].url`, template.url);
        setValue(`templates[${index}].max_attempt`, template.max_attempt);
        setValue(
          `templates[${index}].attempt_interval`,
          template.attempt_interval,
        );
        setValue(
          `templates[${index}].dial_pads`,
          reverseTransformKeys(template.dial_pads),
        );
        setValue(`templates[${index}].delay`, template?.delay);
        setValue(`templates[${index}].default`, template?.default?.toString());
        setValue(`templates[${index}].max_attempt`, template?.max_attempt);
        setValue(`templates[${index}].is_repeat`, template?.is_repeat);
        setValue(
          `templates[${index}].attempt_interval`,
          template?.attempt_interval,
        );
      });
      if (days) {
        for (let i = 0; i < days.length; i++) {
          const week_day = days?.[i]?.week_day;

          const day = days[i];
          setValue(
            `days.time_from_${week_day}`,
            dayjs(day?.time_from, DATE_FORMAT_HH_mm),
          );
          setValue(`days.status_${week_day}`, true);
          setValue(`days.day_${i}`, week_day);
          setValue(
            `days.time_to_${week_day}`,
            dayjs(day?.time_to, DATE_FORMAT_HH_mm),
          );
        }
      }
    }
  }, [templates]);

  const sidebarValues = getTemplateValues();

  const onSubmit = (values: any) => {
    if (main_tab && currentTemplate) {
      const tempObj = {
        id: +main_tab,
        scenario: currentTemplate?.scenario,
        name: currentTemplate?.name,
        url: values?.url,
        dial_pads: transformKeys(values.dial_pads),
        delay: values?.delay,
        default: values?.default,
        attempt_interval: values?.attempt_interval,
        max_attempt: values?.max_attempt,
        is_repeat: values?.is_repeat,
      };

      //   const objects = templates?.map((item) => {
      //     if (item.id?.toString() == main_tab) {
      //       return tempObj;
      //     } else return item;
      //   });

      const can_run =
        sidebarValues?.[
          `can_run_${current_template as keyof typeof sidebarValues}`
        ];

      const req = {
        key: current_template,
        can_run,
        templates: values?.templates?.map((item: any) => ({
          ...item,
          dial_pads: transformKeys(item?.dial_pads),
        })),
        config: {
          timing: {
            days: generateTime(values?.days),
            type: "weakly",
          },
        },
      };

      save.mutate({
        body: req,
      });
    }
  };
  return (
    <Spin spinning={isLoading}>
      <Wrapper onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Templates data={data} templateControl={templateControl} />
          <Main
            control={control}
            currentTemplate={currentTemplate}
            templates={templates}
            main_tab={main_tab}
            menu={menu}
            setValue={setValue}
            watch={watch}
          />
          <Time control={control} getValues={getValues} />
        </Container>
        <Bottom>
          <Button type="submit" buttonLoading={save.isLoading}>
            Save
          </Button>
        </Bottom>
      </Wrapper>
    </Spin>
  );
};

export default AutoCall;
