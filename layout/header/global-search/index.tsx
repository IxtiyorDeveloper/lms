import React, { FC, useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { IGlobalSearch } from "types/globalSearch";
import { useForm } from "react-hook-form";
import { useGSearch } from "hooks";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import _ from "lodash";
import { Popover } from "antd";
import { ContentWrapper, InputC } from "./style";
import ColorTabs from "./tabs";
import { SearchSvg } from "components";

const SearchInput: FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [sData, setSData] = useState<{
    data: IGlobalSearch;
    isLoading: boolean;
  }>({
    data: { groups: [], staff_list: [], leads: [], students: [] },
    isLoading: false,
  });
  const { handleSubmit, control, getValues } = useForm();

  const globalSearch = useGSearch({
    onSuccess: (data: IGlobalSearch) => {
      setSData({ data: data, isLoading: false });
      queryClient.invalidateQueries([queryKeys.global_search]).then();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  /**
   * Debounse orqali uzunligi 2 dan oshgandan keyin
   * backend ga request ketadi
   * **/
  const search = useCallback(
    _.debounce((data) => {
      if (data.search.length > 2) {
        setSData({ ...sData, isLoading: true });
        globalSearch.mutate({
          search: data.search,
        });
      } else if (data.search.length === 0) {
        setSData({
          data: { groups: [], staff_list: [], leads: [], students: [] },
          isLoading: false,
        });
      }
    }, 400),
    [getValues],
  );

  const handleGSearch = (data: any) => {
    search(data);
  };
  const handleChange = (newValue: boolean) => {
    setOpen(newValue);
  };
  const handleClickInput = () => {
    setSData(sData);
  };

  return (
    <div>
      <Popover
        destroyTooltipOnHide
        trigger="click"
        open={open}
        placement="bottomLeft"
        onOpenChange={handleChange}
        content={
          <div>
            <ContentWrapper>
              <ColorTabs data={sData} />
            </ContentWrapper>
          </div>
        }
      >
        <form autoComplete="off" onSubmit={handleSubmit(handleGSearch)}>
          <InputC
            onFocus={handleClickInput}
            onInput={(e: any) => {
              setOpen(true);
              handleGSearch({ search: e.target.value });
            }}
            autoComplete="off"
            placeholder="Search"
            name="search"
            prefix={<SearchSvg />}
            control={control}
          />
        </form>
      </Popover>
    </div>
  );
};

export default SearchInput;
