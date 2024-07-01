import { Popover } from "antd";
import { textColors } from "styles/theme";
import { IVacancy } from "types";
import { Button, FilledSmsSvg, ShareSqueareSvg } from "components";
import { VacancyList, VacancyListItem } from "../style";
import { useShareVacancy } from "hooks";
import { validationErrorHandler } from "utils";
import { toast } from "react-toastify";
import { useId, useMemo, useState } from "react";

export enum shareType {
  all = "all",
  contact = "contact",
  vacancy = "vacancy",
}

const ShareVacancy = ({
  vacancy,
  phone,
}: {
  vacancy: IVacancy[] | undefined;
  phone: string;
}) => {
  const customId = useId();
  const [open, setOpen] = useState(false);

  const shareVacancy = useShareVacancy({
    onSuccess: () => {
      toast.success("Contact shared");
      setOpen(false);
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleClick = ({
    id,
    type,
  }: {
    id: string | number;
    type: shareType;
  }) => {
    if (phone) {
      shareVacancy.mutate({
        query_params: {
          type,
        },
        body: {
          phone,
          ...(type == shareType.vacancy ? { vacancy_id: id } : {}),
        },
      });
    }
  };

  const allVacancyList = useMemo(() => {
    const all = [
      {
        id: `${customId}-all`,
        title: "All",
        type: shareType.all,
      },
      {
        id: `${customId}-my`,
        title: "Share my contact",
        type: shareType.contact,
      },
      ...(vacancy?.map((item) => ({
        id: item.id,
        title: item.title,
        type: shareType.vacancy,
      })) || []),
    ];
    return all;
  }, [vacancy]);

  return (
    <Popover
      open={open}
      onOpenChange={(visible) => setOpen(visible)}
      content={
        <VacancyList>
          {allVacancyList?.map((item) => (
            <VacancyListItem
              key={item.id}
              onClick={() =>
                handleClick({
                  id: item.id,
                  type: item.type,
                })
              }>
              {item.title}
              <ShareSqueareSvg />
            </VacancyListItem>
          ))}
        </VacancyList>
      }
      trigger="click"
      placement="bottomRight">
      <Button
        icon={<FilledSmsSvg />}
        style={{
          padding: "0 12px",
          minWidth: 50,
          color: textColors.blueGray,
        }}
      />
    </Popover>
  );
};

export default ShareVacancy;
