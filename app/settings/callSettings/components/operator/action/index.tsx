import React, { useEffect, useRef } from "react";
import { Button, Input, PlusSvg } from "components";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { Wrapper, Inputs } from "./style";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import debounce from "lodash/debounce";

const Action = () => {
  const dispatch = useDispatch();
  const { control, watch } = useForm();
  const router = useRouter();
  const debouncedHandleSearchRef = useRef<any>(null);
  const handleSearch = (value: { [x: string]: any }) => {
    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          search: value.search,
        },
      },
      undefined,
      { shallow: true },
    );
  };
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "search" && type === "change") {
        if (debouncedHandleSearchRef.current) {
          debouncedHandleSearchRef.current.cancel();
        }
        debouncedHandleSearchRef.current = debounce(
          () => handleSearch(value),
          400,
        );
        debouncedHandleSearchRef.current();
      }
    });

    return () => {
      if (debouncedHandleSearchRef.current) {
        debouncedHandleSearchRef.current.cancel();
      }
      subscription.unsubscribe();
    };
  }, [watch, router.query]);
  return (
    <Wrapper>
      <div className="add-button">
        <Button
          onClick={() =>
            dispatch(
              toggleModal({
                key: "operator",
                data: {
                  data: {
                    type: "create",
                  },
                  open: true,
                },
              }),
            )
          }
        >
          <PlusSvg />
          &nbsp; Create Operator
        </Button>
      </div>
      <Inputs>
        <Input name="search" control={control} placeholder="Search" />
      </Inputs>
    </Wrapper>
  );
};

export default Action;
