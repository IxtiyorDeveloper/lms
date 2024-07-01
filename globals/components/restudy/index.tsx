import React, { useEffect } from "react";
import { AntdModal, Button, InputNumber } from "components";
import { useForm } from "react-hook-form";
import {
  useAddActionStudent,
  usePageDataMemo,
  useSetRestudyConfig,
} from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { Buttons, Title, Wrapper, Content, SubContent, Flex } from "./style";
import { bgColors } from "styles/theme";
import { LABEL_PODO } from "constants/labels";
import { yupResolver } from "@hookform/resolvers/yup";
import { BlockStudent } from "validation/actions";
import { validationErrorHandler } from "utils";
import { restudyConfigNames } from "constants/settings/academic-settings/tools";
import { queryKeys } from "../../../constants/queryKeys";
import { Spin } from "antd";

function generateMainObj(mergeObj: {
  [x: string]: any;
  hasOwnProperty: (arg0: string) => any;
}) {
  const mainObj: any = {};
  for (const key in mergeObj) {
    if (mergeObj.hasOwnProperty(key)) {
      const prefix = key.substring(0, key.lastIndexOf("_"));
      if (!mainObj[prefix]) {
        mainObj[prefix] = { from: 10, to: 20 };
      }
      const suffix = key.substring(key.lastIndexOf("_") + 1);
      mainObj[prefix][suffix] = mergeObj[key];
    }
  }
  return mainObj;
}

const RestudyModal = () => {
  const dispatch = useDispatch();
  const {
    restudyConfig: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const selects = usePageDataMemo();
  const restudyConfigConstant = selects?.restudyConfigConstant;

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "restudyConfig",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const queryClient = useQueryClient();

  const addAction = useSetRestudyConfig({
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
    addAction.mutate({
      body: {
        config: generateMainObj(data),
      },
    });
  };

  useEffect(() => {
    if (restudyConfigConstant) {
      for (const [key, value] of Object.entries(restudyConfigConstant)) {
        setValue(`${key}_from`, (value as any)?.from);
        setValue(`${key}_to`, (value as any)?.to);
      }
    }
  }, [restudyConfigConstant, open]);

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
    >
      <Spin spinning={selects.args.isFetching}>
        <Wrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Title>Restudy config</Title>
            <Content>
              {Object.entries(restudyConfigNames)?.map(
                ([key, value], index) => {
                  return (
                    <SubContent key={index}>
                      <Title>{value}</Title>
                      <Flex>
                        <InputNumber
                          control={control}
                          name={`${key}_from`}
                          label="From (less than pass rate)"
                          placeholder="0"
                          suffix={<p className="suffix">Score</p>}
                        />
                        <InputNumber
                          control={control}
                          name={`${key}_to`}
                          placeholder="0"
                          label="To (less than pass rate)"
                          suffix={<p className="suffix">Score</p>}
                        />
                      </Flex>
                    </SubContent>
                  );
                },
              )}
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

export default RestudyModal;
