import React, { useEffect } from "react";
import { Container, Wrapper } from "./style";
import Info from "./components/info";
import FeedbacksSave from "./components/feedbacksSave";
import Feedbacks from "./components/feedbacks";
import { useFieldArray, useForm } from "react-hook-form";
import {
  useAdminV1SecretClientCycleAction,
  useAdminV1SecretClientCycleView,
} from "hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Spin } from "antd";

const CycleActionPage = () => {
  const router = useRouter();
  const { control, setValue, watch, handleSubmit } = useForm<{ root: any }>({
    defaultValues: {
      root: {
        reviews: [
          {
            id: undefined,
            role_id: undefined,
            department_id: undefined,
            user_id: undefined,
            rate: undefined,
            role_name: undefined,
            comment: undefined,
          },
        ],
      },
    },
  });

  const { fields, append, remove, replace, update } = useFieldArray({
    control,
    name: "root.reviews",
    shouldUnregister: true,
  });

  const { isFetching, data } = useAdminV1SecretClientCycleView({
    query_params: {
      id: router.query.id,
      expand: "reviews",
    },
    enabled: !!router.query.id,
  });
  useEffect(() => {
    if (!!data) {
      const a = data?.reviews?.map((e, index) => {
        return {
          id: e.id,
          role_id: e.role_id?.toString(),
          department_id: e.department_id?.toString(),
          user_id: e.user_id?.toString(),
          rate: e.rate?.toString(),
          role_name: e.role_name,
          comment: e.comment,
        };
      });
      replace(a);
    }
  }, [data]);

  const action = useAdminV1SecretClientCycleAction({
    onSuccess: () => {
      toast.success("Action completed successfully!");
      router.push({
        pathname: "/analytics/secret-client",
        query: { tabId: router.query.type },
      });
    },
    onError: () => {},
  });

  const onSubmit = handleSubmit((data: any) => {
    action.mutate({
      action: router.query.id && "admin_v1_secret_client_cycle_update",
      query_params: {
        id: router.query.id,
      },
      body: {
        type: router.query.type,
        branch_id: router.query.branch_id,
        location_name: router.query.name,
        reviews: data?.root?.reviews,
      },
    });
  });

  return (
    <Spin spinning={isFetching}>
      <Wrapper>
        <Container>
          <Info />
        </Container>
        <Container mt={20}>
          <FeedbacksSave
            onSubmit={onSubmit}
            action={action}
            count={fields.length}
          />
        </Container>
        {fields?.map((e, index) => {
          return (
            <Container key={e.id} mt={8}>
              <Feedbacks
                index={index}
                append={append}
                remove={remove}
                setValue={setValue}
                watch={watch}
                control={control}
              />
            </Container>
          );
        })}
      </Wrapper>
    </Spin>
  );
};

export default CycleActionPage;
