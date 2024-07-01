import React, { FC, useEffect, useMemo, useState } from "react";
import {
  Wrapper,
  Box,
  ScenarioWrapper,
  SwitchWrapper,
  TitleWrapper,
  TextWrapper,
  SmsTitle,
  ImageWrapper,
  HeadX,
  HeadWrapper,
  SMS,
} from "./style";
import Switch from "components/antd/switch";
import { useForm } from "react-hook-form";
import { Button } from "components";
import Trow from "./trow";
import { ICron } from "types";
import { useRouter } from "next/router";
import MessageEnter from "../messageEnter";
import { useSaveCronSms, useSwitchSms } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { DATE_FORMAT_HH_mm } from "constants/dates";
import { Spin } from "antd";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { queryKeys } from "constants/queryKeys";

interface IProps {
  data: ICron[];
  isLoading: boolean;
}

const defaultDays = [
  {
    time_to: null,
    week_day: 1,
    time_from: null,
  },
  {
    time_to: null,
    week_day: 2,
    time_from: null,
  },
  {
    time_to: null,
    week_day: 3,
    time_from: null,
  },
  {
    time_to: null,
    week_day: 4,
    time_from: null,
  },
  {
    time_to: null,
    week_day: 5,
    time_from: null,
  },
  {
    time_to: null,
    week_day: 6,
    time_from: null,
  },
  {
    time_to: null,
    week_day: 7,
    time_from: null,
  },
];

const AutoSMS: FC<IProps> = ({ data: propData, isLoading }) => {
  const router = useRouter();
  const { control, watch, handleSubmit, setValue, getValues } = useForm<any>({
    defaultValues: {
      preview: true,
    },
  });
  const { control: control1, watch: watch1 } = useForm();
  const [text, setText] = useState("some text here");
  const [templates, setTemplates] = useState<ICron | null>();
  const queryClient = useQueryClient();
  const onChangeScenario = (id: string) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        scenarioId: id,
      },
    });
    setTemplates(propData.filter((e) => e.key === id)[0]);
  };

  const scenarios = useMemo(() => {
    if (propData?.length > 0) {
      if (!router.query.scenarioId) {
        onChangeScenario(propData[0].key);
      }
      // if (!templates)
      else {
        onChangeScenario(router.query?.scenarioId as string);
      }
      return propData?.map((e, index) => {
        return {
          selected: e.can_run,
          text: e.description,
          title: e.label,
          value: e.key,
          texts: e.config.variables,
        };
      });
    }
    return [];
  }, [propData, router.query?.scenarioId]);

  const firstChangeText = (e: string, bool = true) => {
    if (bool) {
      if (!!text) {
        setText(e);
      }
    } else {
      setText(e);
    }
  };

  const saveCron = useSaveCronSms({
    onSuccess: () => {
      toast.success("Cron saved");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.sms_cron],
      });
      setTemplates(null);
    },
    onError: () => {},
  });

  const switchCron = useSwitchSms({
    onSuccess: () => {
      toast.success("Cron saved");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.sms_cron],
      });
    },
    onError: () => {},
  });

  useEffect(() => {
    const subscription = watch1((value, { name, type }) => {
      if (type === "change") {
        switchCron.mutate({
          key: name,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch1]);

  const onSubmit = (data: any) => {
    let newDays: any = defaultDays;
    newDays = newDays
      .map((e: any, index: number) => {
        const day = data[`${e.week_day}`];
        if (!!day && !!day.time_to && !!day.time_from) {
          return {
            week_day:
              typeof day.week_day === "number" ? day.week_day : index + 1,
            time_to: dayjs(day.time_to).format("HH:mm"),
            time_from: dayjs(day.time_from).format("HH:mm"),
          };
        } else return e;
      })
      .filter((e: any) => {
        return e.time_to && e.time_from && !!e.week_day;
      });
    saveCron.mutate({
      key: templates?.key,
      can_run: templates?.can_run,
      templates: templates?.templates,
      config: {
        timing: {
          days: newDays,
          type: "weakly",
        },
      },
    });
  };

  const allTime = watch("all_time");
  useEffect(() => {
    templates &&
      templates.config.timing?.days?.map((day) => {
        setValue(`${day.week_day}.week_day`, day.week_day);
        setValue(
          `${day.week_day}.time_from`,
          day.time_from && dayjs(day.time_from, DATE_FORMAT_HH_mm),
        );
        setValue(
          `${day.week_day}.time_to`,
          day.time_to && dayjs(day.time_to, DATE_FORMAT_HH_mm),
        );
      });
    return () => {
      new Array(7).fill(null).map((r, index) => {
        const a = index + 1;
        setValue(`${a}.week_day`, null);
        setValue(`${a}.time_from`, null);
        setValue(`${a}.time_to`, null);
      });
    };
  }, [templates]);

  useEffect(() => {
    if (!!allTime) {
      new Array(7).fill(null).map((r, index) => {
        const a = index + 1;
        const b = templates?.config?.timing?.days?.find(
          (e) => e.week_day === a,
        );
        setValue(`${a}.week_day`, a);
        setValue(`${a}.time_from`, b && dayjs(b.time_from, DATE_FORMAT_HH_mm));
        setValue(`${a}.time_to`, b && dayjs(b.time_to, DATE_FORMAT_HH_mm));
      });
    } else {
      new Array(7).fill(null).map((r, index) => {
        const a = index + 1;
        setValue(`${a}.week_day`, null);
        setValue(`${a}.time_from`, null);
        setValue(`${a}.time_to`, null);
      });
    }
  }, [allTime]);

  const change = (newTemplate: any) => {
    setTemplates({
      ...templates,
      // @ts-ignore
      templates: templates?.templates?.map((e) => {
        return e.name === newTemplate.name ? newTemplate : e;
      }),
    });
  };
  const renderMessageEdit = () => {
    return templates?.templates.map((template, index) => {
      return (
        <MessageEnter
          template={template}
          texts={templates?.config.variables}
          setText={firstChangeText}
          change={change}
        />
      );
    });
  };
  const replacedText = text.replace(/\{(\w+)\}/g, (match, key) => {
    const matchObj: any = templates?.config.variables.find(
      (obj) => obj.key === key,
    );
    if (matchObj) {
      return matchObj.default;
    }
    return match;
  });

  return (
    <Spin spinning={saveCron.isLoading}>
      <Wrapper>
        <Box width={30}>
          {scenarios?.map((scenario, key) => {
            return (
              <ScenarioWrapper
                onClick={() => onChangeScenario(scenario.value)}
                key={`${scenario.title}_${key}`}
                active={router.query.scenarioId === scenario.value}
              >
                <TitleWrapper>{scenario.title}</TitleWrapper>
                <TextWrapper>{scenario.text}</TextWrapper>
                <SwitchWrapper>
                  <Switch
                    name={scenario.value}
                    //@ts-ignore
                    defaultValue={scenario.selected}
                    control={control1}
                    widthSwitch={1}
                    size="small"
                  />
                </SwitchWrapper>
              </ScenarioWrapper>
            );
          })}
        </Box>
        <Box style={{ display: "grid" }} width={60}>
          {renderMessageEdit()}
        </Box>
        <form
          style={{ position: "relative" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <HeadWrapper
            style={{
              maxWidth: "400px",
              display: "flex",
              flex: 2,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <div>
              <div>
                <HeadX>
                  <SmsTitle>Preview</SmsTitle>
                  <div style={{ width: "30px" }}>
                    <Switch name="preview" control={control} size="small" />
                  </div>
                </HeadX>
                {!!watch("preview") && (
                  <ImageWrapper>
                    <SMS>
                      <p>{replacedText}</p>
                    </SMS>
                    <img
                      src="/iphone14.svg"
                      alt="iphoneSMS"
                      width="100%"
                      height="100%"
                    />
                  </ImageWrapper>
                )}
              </div>
              <div
                style={{
                  marginTop: "10px",
                  height: "100%",
                }}
              >
                <HeadX>
                  <SmsTitle>Time</SmsTitle>
                  <div style={{ width: "30px" }}>
                    <Switch name="all_time" control={control} size="small" />
                  </div>
                </HeadX>
                <div
                  style={{
                    boxShadow: "inset 0 0 40px rgba(0, 0, 0, 0.06)",
                    height: "100%",
                    padding: "10px",
                  }}
                >
                  <table>
                    <tbody>
                      {["1", "2", "3", "4", "5", "6", "7"].map((date) => (
                        <Trow
                          control={control}
                          key={date}
                          day={date as any}
                          getValues={getValues}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </HeadWrapper>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginTop: "10px",
            }}
          >
            <CheckPermission
              permission={[COMPONENTS_VIEWS.can_manage_sms_settings]}
            >
              <Button type="submit">Save</Button>
            </CheckPermission>
          </div>
        </form>
      </Wrapper>
    </Spin>
  );
};

export default AutoSMS;
