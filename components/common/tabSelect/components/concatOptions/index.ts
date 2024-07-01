import { IConcatData } from "./type";

export function concatOptions({ data }: IConcatData) {
  // Initialize an empty array to store concatenated options
  let concatenatedOptions: any = [];

  // Iterate through each object in the mock array
  data?.forEach((item) => {
    // Concatenate the options of each object to the concatenatedOptions array
    if (!!item?.options)
      concatenatedOptions = concatenatedOptions.concat(item?.options);
  });

  // Return the concatenated options array
  return concatenatedOptions;
}
