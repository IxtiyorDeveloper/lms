import React from "react";
import { useForm } from "react-hook-form";
import {
  AntdModal,
  Button,
  Segmented,
  TabSupportSvg,
  TabTeacherSvg,
} from "components";
import { bgColors, textColors } from "styles/theme";
import { useAdminGroupMentorReplaceInfo, useAdminGroupUpdate } from "hooks";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useQueryClient } from "@tanstack/react-query";
import { BottomSite, Content } from "./style";
import { validationErrorHandler } from "utils";
import { useRouter } from "next/router";
import { Spin } from "antd";
import Info from "./components/info";

const ChangeTeacherModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    changeTeacher: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const { data: info, isLoading } = useAdminGroupMentorReplaceInfo({
    query_params: {
      group_id: data?.id,
      expand: "user.userProfile.avatar,group",
    },
    enabled: !!data?.id,
  });

  const teacherType = router.query.teacherType || "1";
  const update = useAdminGroupUpdate({
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries(data?.queryKeys);
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const { control, reset, handleSubmit, setValue, getValues } = useForm<any>();
  const handleClose = () => {
    setValue("teacher", {});
    reset({});
    dispatch(
      toggleModal({
        key: "changeTeacher",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const onSubmit = (formData: any) => {
    const keys = Object.keys(formData.teacher);
    const lastKey = keys[keys.length - 1];
    const lastItem = formData.teacher[lastKey];

    const keysSupport = Object.keys(formData.support);
    const lastKeySupport = keys[keysSupport.length - 1];
    const lastItemSupport = formData.support[lastKeySupport];

    update.mutate({
      query_params: {
        id: data?.id,
      },
      body: {
        ...info?.group_data,
        support_id: lastItemSupport["1_id"],
        replace_from_date_support: lastItemSupport["0_date"],
        teacher_id: lastItem["1_id"],
        replace_from_date_teacher: lastItem["0_date"],
      },
    });
  };

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={640}
      padding="0"
      destroyOnClose
    >
      <Spin spinning={isLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Content>
            <div className="title">Change Teacher ({data.group?.name})</div>
            <Segmented
              options={[
                {
                  label: (
                    <div className={`flex`}>
                      <TabTeacherSvg
                        color={
                          teacherType == "2"
                            ? bgColors.yourShadow
                            : bgColors.blueGray
                        }
                      />
                      Teacher
                    </div>
                  ),
                  value: "1",
                },
                {
                  label: (
                    <div className={`flex`}>
                      <TabSupportSvg
                        color={
                          teacherType != "2"
                            ? bgColors.yourShadow
                            : bgColors.blueGray
                        }
                      />
                      Academic Support
                    </div>
                  ),
                  value: "2",
                },
              ]}
              routerKey="teacherType"
              initValue={(teacherType as string) || "1"}
            />

            <div className="infos">
              <Info
                data={info?.teacher}
                lessonDays={info?.lessonDays}
                control={control}
                name="teacher"
                setValue={setValue}
                hidden={teacherType !== "1"}
                isTeacher
              />
              <Info
                data={info?.support}
                lessonDays={info?.lessonDays}
                control={control}
                name="support"
                setValue={setValue}
                hidden={teacherType !== "2"}
                isTeacher={false}
              />
            </div>
          </Content>

          <BottomSite>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}
            >
              Cancel
            </Button>
            <Button type="submit" buttonLoading={update?.isLoading}>
              Save
            </Button>
          </BottomSite>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default ChangeTeacherModal;
