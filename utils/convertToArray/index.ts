import Router from "next/router";

export const convertToArray = ({ routerKey }: { routerKey: string }) => {
  return Router.query?.[routerKey]
    ? Array.isArray(Router.query[routerKey])
      ? Router.query[routerKey]
      : [Router.query[routerKey]]
    : [];
};
