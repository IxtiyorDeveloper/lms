import React, { useCallback, useEffect } from "react";
import { Container, Wrapper } from "./style";
import { Button, InputWithIcon, SearchSvg, PlusSvg } from "components";
import { useForm } from "react-hook-form";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { EObservationStaff } from "types/observation";
import { useRouter } from "next/router";
import debounce from "lodash/debounce";

const TableActions = () => {
  const { control, handleSubmit, watch } = useForm();
  const router = useRouter();

  const type = router.query?.tab?.toString() ?? EObservationStaff.teacher;

  const dispatch = useDispatch();

  const onSubmit = () => {};
  const handleCreate = () => {
    dispatch(
      toggleModal({
        key: "createObservation",
        data: {
          data: {
            type,
          },
          open: true,
        },
      }),
    );
  };

  const push = useCallback(
    debounce((data: any) => {
      if (!!data?.search) {
        return router.replace({
          pathname: router.pathname,
          query: {
            ...router.query,
            ...data,
          },
        });
      } else {
        const { search, ...rest } = router.query;
        return router.replace({
          pathname: router.pathname,
          query: {
            ...rest,
          },
        });
      }
    }, 400),
    [router.query],
  );

  useEffect(() => {
    const subscription = watch((value) => {
      push({ search: value?.full_name });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <InputWithIcon
            icon={SearchSvg}
            name="full_name"
            control={control}
            placeholder="Search"
          />
          <Button onClick={handleCreate}>
            <PlusSvg />
            Create
          </Button>
        </Container>
      </form>
    </Wrapper>
  );
};

export default TableActions;
