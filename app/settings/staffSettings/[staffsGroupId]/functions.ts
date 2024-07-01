import { Router } from "next/router";

export const onRowClick = (record: any, router: Router) => {
  router.push(`/settings/staff-settings/edit-member/${record?.user?.id}`);
};

export const handleSearch = (value: { [x: string]: any }, router: any) => {
  router
    .replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          ...value,
        },
      },
      undefined,
      { shallow: true }
    )
    .then();
};

export const handleClose = (setModals: (a: any) => void) => {
  setModals({
    deleteModal: {
      isOpen: false,
      id: 0,
    },
  });
};
