export const generateTabs = ({
  openedTasks,
  refOpened,
  opened,
}: {
  openedTasks: any;
  refOpened: any;
  opened: any;
}) => {
  return [
    {
      key: "1",
      type: "OPENED",
      count: openedTasks?.pages.map((item: any) => item.statistics),
      data: opened,
      ref: refOpened,
    },
  ];
};
