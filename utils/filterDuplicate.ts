export const filterDuplicate = (arr: any[]) => {
  return arr.reduce((acc, current) => {
    const x = acc.find((item: { id: any }) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
};
