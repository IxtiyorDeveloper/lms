import { menuList } from "../constants";

export const getByRouteFromMenuList = (route: string) => {
  let title = "";
  menuList.map((menu) => {
    if (menu?.route && menu.route.startsWith(`/${route.split("/")[1]}`)) {
      title = menu.title;
    }

    if (menu?.child) {
      menu?.child.map((menuInside) => {
        if (
          menuInside?.route &&
          menuInside.route.startsWith(
            `/${route.split("/")[1]}/${route.split("/")[2]}`
          )
        ) {
          title = menuInside.title;
        }
      });
    }
  });

  return title;
};
