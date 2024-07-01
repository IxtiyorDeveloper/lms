import Router from "next/router";
export function resetQuery(array: string[]) {
  let newObj = {};
  for (const [key, value] of Object.entries(Router.query)) {
    if (array.includes(key)) {
      newObj = {
        ...newObj,
        [key]: value,
      };
    }
  }
  return Router.replace(
    {
      pathname: Router.pathname,
      query: newObj,
    },
    undefined,
    {
      scroll: false,
    },
  );
}
