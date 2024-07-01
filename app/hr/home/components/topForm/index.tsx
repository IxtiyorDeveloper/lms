import { Flex } from "antd";
import React, { useCallback, useEffect } from "react";
import { Buttons } from "../../style";
import {
  Button,
  InputWithIcon,
  PlusSvg,
  SearchSvg,
  SettingsSvg,
} from "components";
import { bgColors } from "styles/theme";
import Link from "next/link";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { CandidateModalType } from "globals/components/candidateModal/type";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { debounce } from "utils/debounce";
import { filterQuery } from "utils";
import SearchInput from "./components/searchInput";

const TopForm = () => {
  const router = useRouter();
  const { id, search } = router.query;

  const { control, watch, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      toggleModal({
        key: "candidateModal",
        data: {
          data: {
            title: "Create",
            type: CandidateModalType.CREATE,
          },
          open: true,
        },
      })
    );
  };

  const onChangeInput = useCallback(
    debounce((values: any) => filterQuery({ ...values }), 500),
    []
  );

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        onChangeInput(value);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!!search) {
      setValue("search", search ?? id);
    }
  }, [search, id]);

  const onSubmit = (values: any) => {};

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{
        marginBottom: 20,
      }}>
      <Flex gap={14}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWithIcon
            autoComplete="off"
            placeholder="Search"
            icon={SearchSvg}
            name="search"
            control={control}
          />
        </form>
        <SearchInput />
      </Flex>
      <Buttons>
        <Button icon={<PlusSvg />} onClick={handleClick}>
          Create
        </Button>
        <Link href="/hr/config">
          <Button icon={<SettingsSvg />} bgColor={bgColors.wildSand}>
            Config
          </Button>
        </Link>
      </Buttons>
    </Flex>
  );
};

export default TopForm;
