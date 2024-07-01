import React, { useEffect, useState } from "react";
import { Buttons, Content, Tabs, Wrapper } from "./style";
import {
  useGroup,
  useObservation,
  useObservationEnums,
  usePageDataMemo,
  useSaveObservation,
} from "hooks";
import { expand } from "./expand";
import {
  Button,
  GroupInsideHeaderInfo,
  Segmented,
  SupportCardInfo,
} from "components";
import Menu from "./components/menu";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Contents from "./components/contents";
import { restructureObject } from "./components/restruct";
import { validationErrorHandler } from "utils";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { EFieldType, EObservationStaff } from "types/observation";
import { Spin } from "antd";
import DeleteObservation from "globals/components/deleteObservation";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";

const Observation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const id = router.query?.id;

  const selects = usePageDataMemo();

  const { data, isLoading } = useObservation({
    query_params: {
      id,
      expand:
        "observer.userProfile.avatar,details,buttonActions,aspects,group_id,mentor_id,branch_id,mentor.userProfile.avatar",
      fields:
        "observer.userProfile.avatar,observer.userProfile.fullName,mentor.userProfile.avatar,mentor.userProfile.fullName,created_at,status,score,id,group_id,mentor_id,type,origin_id",
    },
  });

  const [disableAlert, setDisableAlert] = useState<boolean>(false);

  const { data: enums, isLoading: enumLoading } = useObservationEnums();

  const save = useSaveObservation({
    onSuccess: () => {
      if (!disableAlert) {
        toast.success("Success");
      }

      if(disableAlert) {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.admin_ranking_observation_view],
        });
      }
      setDisableAlert(false);
    },
    onError: (err) => {
      setDisableAlert(false);
      validationErrorHandler({ err });
    },
  });

  const tab =
    router.query?.tab?.toString() || enums?.structure?.[0]?.group?.toString();

  const isTeacherObservation = data?.type == EObservationStaff.teacher;

  const { data: group, isInitialLoading: isGroupLoading } = useGroup({
    id: isTeacherObservation ? data?.origin_id : undefined,
    expand,
  });

  const { control, handleSubmit, setValue, watch } = useForm();

  const aspects = enums?.structure?.find((s) => s.group?.toString() == tab);

  const type = data?.type;
  const origin_id = data?.origin_id;

  const onSubmit = (values: any) => {
    save.mutate({
      query_params: {
        id,
        expand: "observer.userProfile.avatar,details,buttonActions,aspects",
        fields:
          "observer.userProfile.avatar,observer.userProfile.fullName,created_at,status,score,id",
      },
      body: {
        mentor_id: data?.mentor_id,
        group_id: data?.group_id,
        type,
        origin_id,
        items: restructureObject({ values, enums }),
      },
    });
  };

  const handleSave = () => {
    setDisableAlert(true);
    onSubmit(watch());
  };

  const handleOpen = () => {
    dispatch(
      toggleModal({
        key: "deleteObservation",
        data: {
          data: {
            id,
          },
          open: true,
        },
      })
    );
  };

  useEffect(() => {
    if (data) {
      const aspects = data?.aspects;
      for (let i = 0; i < aspects?.length; i++) {
        const item = aspects?.[i];
        const groupNumber = item?.group;
        for (let j = 0; j < item?.aspects?.length; j++) {
          const aspect = item?.aspects?.[j];
          const keyNumber = aspect?.key;
          if (item?.type == EFieldType.Rating) {
            setValue(`rate_${groupNumber}_${keyNumber}`, aspect?.score);
            setValue(`input_${groupNumber}_${keyNumber}`, aspect?.comment);
          } else {
            setValue(`input_${groupNumber}_${keyNumber}`, aspect?.comment);
          }
        }
      }
    }
  }, [data]);

  const branch_name = selects?.branch?.find(
    (f) => f.value == data?.branch_id
  )?.label;

  return (
    <Wrapper>
      <DeleteObservation />
      <Spin spinning={isLoading || enumLoading || isGroupLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isTeacherObservation ? (
            <GroupInsideHeaderInfo group={group} />
          ) : (
            <SupportCardInfo
              support={
                {
                  ...data?.mentor,
                  id: data?.mentor_id,
                } as any
              }
              branch_name={branch_name}
              date={data?.details?.office_hour?.date}
              students={data?.details?.students}
              timetable={data?.details?.office_hour?.time}
              data={data}
            />
          )}
          <Tabs>
            <Segmented
              routerKey="tab"
              initValue={tab}
              options={Menu({ enums })}
            />
            <Buttons>
              <Button
                textColor={textColors.pop}
                bgColor={bgColors.wildSand}
                onClick={handleOpen}
              >
                Delete
              </Button>
              <Button type="submit" buttonLoading={save.isLoading}>
                Save
              </Button>
            </Buttons>
          </Tabs>
          <Content>
            <Contents
              handleSave={handleSave}
              aspects={aspects}
              control={control}
              tab={tab}
            />
          </Content>
        </form>
      </Spin>
    </Wrapper>
  );
};

export default Observation;
