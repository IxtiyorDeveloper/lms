import { IStore, toggleModal } from "store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AntdModal, Button, CheckBox } from "components";
import {
  Title,
  TimeLineWrapper,
  OrderWrapper,
  ItemTitle,
  ItemWrapper,
} from "./style";
import { Flex, Timeline } from "antd";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useSetTraningStage } from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { ICandidate, ICandidateTraningStage } from "types";
import { useEffect } from "react";
import { queryKeys } from "constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";

const CheckListModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { control, watch, reset, setValue } = useForm();

  const {
    checkList: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const candidate = data?.candidate as ICandidate;

  const updateData = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.applicant_main_index],
    });
  };
  const setTraningStage = useSetTraningStage({
    onSuccess: () => {
      updateData();
      toast.success("Check list updated");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleClose = () => {
    reset();
    dispatch(
      toggleModal({
        key: "checkList",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const handleClick = (id: number) => {
    const checked = Number(watch(`${id}`));
    setTraningStage.mutate(
      {
        query_params: {
          id: candidate?.id,
        },
        body: {
          training_stage_id: id,
          is_checked: !checked,
        },
      },
      {
        onSuccess: () => {
          updateData();
          setValue(`${id}`, !checked);
        },
      }
    );
  };

  useEffect(() => {
    if (candidate?.trainingStages) {
      candidate?.trainingStages?.forEach((item: ICandidateTraningStage) => {
        setValue(`${item?.id}`, Number(item?.is_checked));
      });
    }
  }, [candidate?.trainingStages]);

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={712}
      padding="20px">
      <Title>
        Check list
        <p>({candidate?.vacancy?.title})</p>
      </Title>
      <form>
        <TimeLineWrapper>
          <Timeline>
            {candidate?.trainingStages?.map((item: ICandidateTraningStage) => (
              <Timeline.Item
                key={item.id}
                className={`timeline-item ${
                  Number(item.is_checked) ? "checked" : "unchecked"
                }`}
                dot={
                  <OrderWrapper passed={!!Number(item?.is_passed)}>
                    {item?.order}
                  </OrderWrapper>
                }
                children={
                  <ItemWrapper>
                    <Flex
                      justify="space-between"
                      align="center"
                      onClick={() => handleClick(item?.id)}>
                      <ItemTitle>{item?.name}</ItemTitle>
                      <CheckBox
                        control={control}
                        name={`${item?.id}`}
                        colorPrimary={bgColors.midori}
                      />
                    </Flex>
                  </ItemWrapper>
                }
              />
            ))}
          </Timeline>
        </TimeLineWrapper>
      </form>
      <Flex
        justify="flex-end"
        style={{
          marginTop: 40,
        }}>
        <Button bgColor={bgColors.wildSand} onClick={handleClose}>
          Cancel
        </Button>
      </Flex>
    </AntdModal>
  );
};

export default CheckListModal;
