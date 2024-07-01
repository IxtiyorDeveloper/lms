import moment from "moment";
import {
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRED_STUDENT,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";
import { IContacts } from "types/contact";
import { IActualPayment } from "types/actualPayment";

export function deleteDuplicates(objects: IContacts[] | undefined) {
  let uniqueObjects: any = {};
  let data = objects;
  if (objects) {
    for (let i = 0; i < (objects?.length || 0); i++) {
      let obj = objects[i];
      let key = obj?.user?.id; // Use a unique identifier for each object
      const date1 = moment(obj?.actualPayment?.start_date);
      const date2 = moment(
        uniqueObjects[key as keyof typeof uniqueObjects]?.actualPayment
          ?.start_date
      );
      const diff = date1?.diff(date2, "days");
      if (diff >= 0 && uniqueObjects[key as keyof typeof uniqueObjects]) {
        const old: IContacts = uniqueObjects[key as keyof typeof uniqueObjects];
        obj = {
          ...obj,
          actualPayment: {
            ...(obj.actualPayment as IActualPayment),
            lesson_count:
              (old.actualPayment?.lesson_count || 0) +
              (obj.actualPayment?.lesson_count || 0),
          },
        };
        data = data?.map((item) => {
          const mapDate = moment(item?.actualPayment?.start_date);
          const diff = mapDate?.diff(date1, "days");
          if (item?.user?.id == key && diff === 0) {
            return obj;
          } else return item;
        });
      }
      if (!uniqueObjects[key as keyof typeof uniqueObjects] || diff >= 0) {
        uniqueObjects[key as keyof typeof uniqueObjects] = obj;
      }
    }

    const contacts = Object.values(uniqueObjects);

    const studying_transferring = contacts?.filter(
      (c: any) =>
        c.status.toString() === STUDYING_STUDENT?.toString() ||
        c.status.toString() === TRANSFERRING_STUDENT?.toString()
    );

    const stopping_transferred = contacts?.filter(
      (c: any) =>
        c.status.toString() === STOPPING_STUDENT?.toString() ||
        c.status.toString() === TRANSFERRED_STUDENT?.toString()
    );

    return [
      ...(studying_transferring?.sort((x: any, y: any) => {
        return (
          (y.actualPayment?.lesson_count || 0) -
          (x.actualPayment?.lesson_count || 0)
        );
      }) || []),
      ...(stopping_transferred?.sort((x: any, y: any) => {
        return (
          (y.actualPayment?.lesson_count || 0) -
          (x.actualPayment?.lesson_count || 0)
        );
      }) || []),
    ];
  }
}
