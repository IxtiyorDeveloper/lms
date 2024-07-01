import React from "react";
import { AntdModal, Button, MySelect } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import {
  CardWrapper,
  GroupWrapper,
  Title,
  Wrapper,
  ButtonWrapper,
} from "./style";
import RankingCard from "./components/rankingCard";
import { useForm } from "react-hook-form";
import { bgColors, textColors } from "styles/theme";
import { IRanking } from "types";
import { useStaffGroups, useSaveObservation } from "hooks";
import { makeOptions } from "./components/makeOptions";
import { validationErrorHandler } from "utils";
import { useRouter } from "next/router";

const ObservationModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleSubmit, control } = useForm<{ group_id: string }>();

  const {
    observation: { open, data },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "observation",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const rankingData: IRanking | undefined = data?.data;

  const save = useSaveObservation({
    onSuccess: (data) => {
      const newURL = `/academic-resource/observation/${data?.id}`;

      router.push(newURL);
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmit = ({ group_id }: { group_id: string }) => {
    save.mutate({
      query_params: {
        expand:
          "observer.userProfile.avatar,details,buttonActions,aspects,group_id",
        fields:
          "observer.userProfile.avatar,observer.userProfile.fullName,created_at,status,score,id,group_id",
      },
      body: {
        mentor_id: rankingData?.mentor?.base_user_id,
        group_id,
      },
    });
  };

  const { data: groups, isLoading } = useStaffGroups({
    query_params: {
      user_id: rankingData?.mentor?.base_user_id,
      expand: "active_contact_count,lessonDay",
      state: [100, 200, 300, 400],
    },
  });

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      padding="2px"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <Title>Create observation</Title>
          <CardWrapper>
            <RankingCard rankingData={rankingData} groups={groups} />
          </CardWrapper>
          <GroupWrapper>
            <MySelect
              name="group_id"
              options={makeOptions({
                groups: groups,
              })}
              optionLabelProp="extra"
              placeholder="Select group"
              control={control}
              label="Select group"
            />
          </GroupWrapper>
        </Wrapper>
        <ButtonWrapper>
          <Button
            onClick={handleClose}
            textColor={textColors.yourShadow}
            bgColor={bgColors.wildSand}
          >
            Cancel
          </Button>
          <Button type="submit" buttonLoading={save.isLoading}>
            Create
          </Button>
        </ButtonWrapper>
      </form>
    </AntdModal>
  );
};

export default ObservationModal;
