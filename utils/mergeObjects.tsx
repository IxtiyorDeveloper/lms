export function mergeObjects(data?: any) {
  const mergedData = [];
  const mergedMap: any = {};
  if (data) {
    data.forEach((item: { name: any; count: any }) => {
      const { name, count } = item;

      if (mergedMap[name]) {
        mergedMap[name].count += parseInt(count);
      } else {
        mergedMap[name] = {
          name,
          count: parseInt(count),
        };
      }
    });

    for (const name in mergedMap) {
      mergedData.push(mergedMap[name]);
    }

    return mergedData;
  }
}
