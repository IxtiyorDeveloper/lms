import { DebounceSelect } from "components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { fetchSearchFields } from "./utils/fetchSearchFields";
import { FormWrapper } from "./style";
import { useEffect } from "react";

const SearchInput = () => {
  const router = useRouter();
  const { id, status, stage, vacancy_id, roundedTabIndex } = router.query;

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const handleSearch = (data: any) => {};

  const onClear = () => {
    router.replace({
      pathname: router.pathname,
      query: {
        status,
        stage,
        roundedTabIndex,
        vacancy_id,
      },
    });
  };

  useEffect(() => {
    if (id) {
      setValue("search", id);
    }
  }, []);

  return (
    <FormWrapper autoComplete="off" onSubmit={handleSubmit(handleSearch)}>
      <DebounceSelect
        isValue
        showSearch
        label=""
        control={control}
        name="search"
        optionLabelProp="labelShow"
        placeholder="At least 3 letters"
        fetchOptions={async (searchString) => {
          const replace = searchString.replace(/[^A-Za-z0-9]/g, "");
          var replacedString = isNaN(replace as any) ? searchString : replace;

          const options = await fetchSearchFields({
            query_params: {
              search: replacedString,
            },
          });
          return options;
        }}
        onClear={onClear}
        error={(errors as any)?.phone_number?.message}
      />
    </FormWrapper>
  );
};

export default SearchInput;
