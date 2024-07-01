import React from "react";
import { FilledLocationSvg } from "components";
import { usePageDataMemo } from "hooks";
import { Opacity, Wrapper } from "./style";
import { useRouter } from "next/router";

const Filters = () => {
  const router = useRouter();
  const { branch } = usePageDataMemo();

  const getIsActive = (id: string) => {
    const values =
      (typeof router.query.branch_id === "string"
        ? [router.query.branch_id]
        : router.query.branch_id) || [];
    if (id === "-1") {
      return values.length === (branch || [])?.length;
    } else {
      return !!values.find((e) => e === id);
    }
  };
  const branches = [
    {
      label: "All branches",
      value: "-1",
    },
    ...(branch || []),
  ]?.map((e) => {
    return {
      label: <div>{e.label}</div>,
      value: e.value,
      children: null,
      icon: (
        <Opacity isActive={getIsActive?.(e.value)}>
          <FilledLocationSvg />
        </Opacity>
      ),
    };
  });
  const handleClickItem = (id: string) => {
    const values =
      (typeof router.query.branch_id === "string"
        ? [router.query.branch_id]
        : router.query.branch_id) || [];
    if (id === "-1") {
      const a = values.length === branch?.length;
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            branch_id: !a ? branch?.map((e) => e.value) : [],
          },
        },
        undefined,
        { scroll: false }
      );
    } else {
      const a = !!values.find((e) => e === id);
      const b = a ? values.filter((e) => e !== id) : [...values, id];
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            branch_id: b,
          },
        },
        undefined,
        { scroll: false }
      );
    }
  };

  return (
    <Wrapper>
      {branches?.map((e) => {
        const isActive = getIsActive(e.value);
        return (
          <div
            className={`item ${isActive ? "active" : ""}`}
            onClick={() => handleClickItem(e.value)}
          >
            {e.icon}
            {e.label}
          </div>
        );
      })}
    </Wrapper>
  );
};

export default Filters;
