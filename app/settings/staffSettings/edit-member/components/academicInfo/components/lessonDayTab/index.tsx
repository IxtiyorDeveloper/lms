import { Segmented } from "components";
import { usePageDataMemo } from "hooks";
import { TabWrapper } from "./style";
import { useRouter } from "next/router";

const LessonDayTab = () => {
  const router = useRouter();
  const { lesson_day_id, staff_tab, date, staffId } = router.query;
  const day = Number(lesson_day_id ?? 1);

  const selects = usePageDataMemo();
  const options =
    selects.days?.map((item) => ({
      ...item,
      children: null,
    })) ?? [];

  return (
    <TabWrapper>
      <Segmented
        options={options}
        initValue={day}
        onChange={(e: any) => {
          router.replace(
            {
              pathname: router.pathname,
              query: {
                staffId,
                staff_tab,
                date,
                lesson_day_id: e ?? 1,
              },
            },
            undefined,
            {
              scroll: false,
            }
          );
        }}
      />
    </TabWrapper>
  );
};

export default LessonDayTab;
