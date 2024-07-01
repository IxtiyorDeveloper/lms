import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { IStore } from "store";
import withAuth from "utils/guard";
import { ROLE_DEFAULT_ROUTES } from "constants/role";
function Home() {
  const default_route = useSelector(
    (state: IStore) => state.user.user?.default_route
  );
  const router = useRouter();

  /**
   * Global login shu yerda tutib olinyapti va
   * kelgan token orqali login bo'lyapti
   * **/
  useEffect(() => {
    if (!router.asPath?.split("/?token=")[1] && router.query?.redirect) {
      router.replace(`${router?.query?.redirect as string}`);
    } else if (default_route) {
      ROLE_DEFAULT_ROUTES.map((e) => {
        if (default_route == +e.value) {
          router.push(e.url);
        }
      });
    }
  }, [default_route]);

  return <div className="loader-wrapper"></div>;
}

export default withAuth(Home, []);
