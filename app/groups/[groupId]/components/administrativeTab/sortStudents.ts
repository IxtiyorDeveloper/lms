import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRED_STUDENT,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";
import { IContacts } from "types/contact";

export function sortStudents(contacts: IContacts[] | undefined) {
  if (contacts) {
    let studying: IContacts[] = [];
    let transferring: IContacts[] = [];
    let attended: IContacts[] = [];
    let not_attended: IContacts[] = [];
    let stopping: IContacts[] = [];
    let transferred: IContacts[] = [];
    contacts?.map((c: any) => {
      switch (c.status.toString()) {
        case STUDYING_STUDENT?.toString():
          return studying.push(c);
        case TRANSFERRING_STUDENT?.toString():
          return transferring.push(c);
        case NEW_STUDENT_ATTENDED?.toString():
          return attended.push(c);
        case NEW_STUDENT_NOT_ATTENDED?.toString():
          return not_attended.push(c);
        case STOPPING_STUDENT?.toString():
          return stopping.push(c);
        case TRANSFERRED_STUDENT?.toString():
          return transferred.push(c);
      }
    });

    return [
      ...sortContacts(studying),
      ...sortContacts(transferring),
      ...sortContacts(attended),
      ...sortContacts(not_attended),
      ...sortContacts(stopping),
      ...sortContacts(transferred),
    ];
  }
}

const sortContacts = (contacts: IContacts[] | undefined) => {
  return (
    contacts
      ?.sort((x: any, y: any) => {
        return (
          (y.actualPayment?.lesson_count || 0) -
          (x.actualPayment?.lesson_count || 0)
        );
      })
      ?.sort((x, y) => {
        return (
          (y.actualPayment?.balance || 0) - (x.actualPayment?.balance || 0)
        );
      })
      .sort((x, y) => {
        return (x.actualPayment?.debt || 0) - (y.actualPayment?.debt || 0);
      }) || []
  );
};
