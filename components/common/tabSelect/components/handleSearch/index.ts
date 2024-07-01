import { ISearchType } from "./type";

export function handleSearch({ searchText, data, setValue }: ISearchType) {
  const options = data?.map((group) => ({
    ...group,
    options: group.options?.filter((option) =>
      typeof option.label === "string"
        ? option.label?.toLowerCase().includes(searchText.toLowerCase())
        : true,
    ),
  }));

  setValue("options", options);
}
