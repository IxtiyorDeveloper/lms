export function findMatchingTypes({
  values,
  times,
}: {
  values: any;
  times: any;
}) {
  // Convert array 'a' to a Set for efficient lookup
  const setA = new Set(values);

  // Array to hold the types which have all their values in 'a'
  const matchingTypes: any = [];

  // Iterate over each item in 'b'
  times?.forEach((item: { data: any[]; type: any }) => {
    // Check if all values in the item's data array are in 'a'
    const allValuesMatch = item.data.every((dataItem) =>
      setA.has(dataItem.value),
    );

    // If all values match, add the type to the matchingTypes array
    if (allValuesMatch) {
      matchingTypes.push(item.type);
    }
  });

  // Return the array of matching types
  return matchingTypes;
}
