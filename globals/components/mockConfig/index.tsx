import React, { useEffect, useMemo, useState } from "react";
import { AntdModal, Button, InputNumber, Segmented } from "components";
import { useForm } from "react-hook-form";
import { useMockConfig, usePageDataMemo, useSetMockConfig } from "hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { Buttons, Title, Wrapper, Content, SubContent, Flex } from "./style";
import { bgColors } from "styles/theme";
import { validationErrorHandler } from "utils";
import { queryKeys } from "../../../constants/queryKeys";
import { Spin } from "antd";
import { EMockAttemptConfig } from "types/exam/exam";

const MockConfigModal = () => {
  const dispatch = useDispatch();
  const {
    mockConfig: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const [activeIndex, setActiveIndex] = useState<string | undefined>(undefined);

  const selects = usePageDataMemo();
  const level = selects?.level;

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "mockConfig",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const queryClient = useQueryClient();

  const { data: mockConfig, isLoading } = useMockConfig({
    query_params: {
      level_id: activeIndex,
    },
    enabled: open,
  });

  const addAction = useSetMockConfig({
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: [queryKeys.page_data],
      });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const { reset, control, handleSubmit, setValue } = useForm();

  const onSubmit = (data: any) => {
    let mockConfigs: any = {};
    for (const [key, value] of Object.entries(data ?? {})) {
      const [_, inputKey] = key.split("_");
      mockConfigs = {
        ...mockConfigs,
        [inputKey]: value,
      };
    }
    addAction.mutate({
      body: {
        level_id: activeIndex,
        mockConfigs,
      },
    });
  };

  const tabs = useMemo(() => {
    let array: any = [];
    if (level?.options) {
      for (let i = 0; i < level?.options?.length; i++) {
        const currentLevel = level?.options?.[i];
        array = [
          ...array,
          {
            label: currentLevel?.label?.slice(0, 10),
            value: currentLevel?.value,
          },
        ];
      }
    }
    return array;
  }, [level]);

  useEffect(() => {
    if (level.options?.[0] && !activeIndex) {
      setActiveIndex(level.options?.[0]?.value);
    }
  }, [open, level]);

  useEffect(() => {
    if (mockConfig) {
      for (const [key, value] of Object.entries(mockConfig)) {
        setValue(`data_${key}`, value);
      }
    }
  }, [mockConfig]);

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
    >
      <Spin spinning={selects.args.isFetching || isLoading}>
        <Wrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Title>Mock exam config</Title>
            <Content>
              <Segmented
                block
                options={tabs}
                onChange={(e: string) => setActiveIndex(e)}
                initValue={activeIndex}
              />
              <SubContent>
                <Flex>
                  <InputNumber
                    label="Max attempt count"
                    name={`data_${EMockAttemptConfig.MOCK_MAX_ATTEMPT}`}
                    control={control}
                  />
                  <InputNumber
                    label="Attempt per day"
                    name={`data_${EMockAttemptConfig.MOCK_ATTEMPT_PER_DAY}`}
                    control={control}
                  />
                </Flex>
                <Flex>
                  <InputNumber
                    label="Start date"
                    name={`data_${EMockAttemptConfig.MOCK_START_DATE}`}
                    control={control}
                  />
                  <InputNumber
                    label="Finish date"
                    name={`data_${EMockAttemptConfig.MOCK_END_DATE}`}
                    control={control}
                  />
                </Flex>
              </SubContent>
            </Content>
            <Buttons>
              <Button
                className="cancel"
                onClick={handleClose}
                bgColor={bgColors.whiteSmoke}
              >
                Cancel
              </Button>
              <Button
                className="save"
                type="submit"
                buttonLoading={addAction?.isLoading}
              >
                Save
              </Button>
            </Buttons>
          </form>
        </Wrapper>
      </Spin>
    </AntdModal>
  );
};

export default MockConfigModal;
