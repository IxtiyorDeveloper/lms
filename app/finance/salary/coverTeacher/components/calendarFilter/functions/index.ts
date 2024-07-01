// Ushbu faylda TypeScript yordamida yozilgan kodni tavsiflash uchun tafsilotlar

// Importlar qismi
import { ICoverTeacherComponent } from "types/finance/salary"; // Moliyaviy maosh uchun qoplamalar turi
import { IAssignment, IUser } from "types"; // Asosiy tur
import { IRestructured } from "../content/type"; // Struktura turini import qilish
import { calculateTotalScore } from "../rightCoverItem/utils"; // Moliyaviy qoplamani hisoblash funktsiyasi

// RestructuredObject interface'i
export interface RestructuredObject {
  user_id: number; // Foydalanuvchi ID
  user?: IUser; // Foydalanuvchi obyekti
  user_covers: ICoverTeacherComponent[]; // Foydalanuvchiga tegishli qoplamalar turi
  // Bu yerga kerakli boshqa xususiyatlar qo'shishingiz mumkin
}

// sortByDateInData funksiyasi
export function sortByDateInData(data: ICoverTeacherComponent[]) {
  // Maqbul bo'lish funksiyasi
  function compareDates(
    a: { data: { date: string | number | Date } },
    b: { data: { date: string | number | Date } }
  ) {
    const dateA: any = new Date(a.data.date);
    const dateB: any = new Date(b.data.date);
    return dateA - dateB;
  }

  // Ma'lumotlar massivini taqqoslash
  data.sort(compareDates);

  return data; // Tartiblangan massivni qaytarish
}

// sortByDate funksiyasi
function sortByDate(array: IRestructured[]) {
  // Kirish ma'lumotlarini o'zgartirmaslik uchun asl massivning nusxasini olish
  const newArray = [...array];

  // Ob'ektlarni "date" xususiyati asosida tartiblash uchun maxsus taqqoslash funksiyasi
  newArray.sort((a, b) => {
    const dateA: any = new Date(a.date);
    const dateB: any = new Date(b.date);
    return dateA - dateB;
  });

  return newArray;
}

// groupByDate funksiyasi
export function groupByDate({
  components,
  assignments,
}: {
  components?: ICoverTeacherComponent[];
  assignments?: IAssignment[];
}) {
  const groupedData: any = {};
  let data: any = [];
  // Sana bo'yicha qaytadan tartiblash
  if (components)
    components.forEach((item) => {
      const date = item.data.date;
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });

  // Aylanib chiqib asosiy ma'lumotni qaytadan tartiblash
  for (const [key, value] of Object.entries(groupedData)) {
    data = [
      ...data,
      {
        date: key,
        data: restructureDataByReceiverId({
          data: value as ICoverTeacherComponent[],
          assignments,
        }),
      },
    ];
  }
  return sortByDate(data);
}

// IRestructureDataByReceiverId interface'i
export interface IRestructureDataByReceiverId {
  user_id: number; // Foydalanuvchi ID
  receiver?: IAssignment; // Qabul qiluvchi vazifa
  covers_for_teacher: ICoverTeacherComponent[]; // O'qituvchiga tegishli qoplamalar turi
}

// restructureDataByReceiverId funksiyasi
export function restructureDataByReceiverId({
  data,
  assignments,
}: {
  data?: ICoverTeacherComponent[];
  assignments?: IAssignment[];
}): {
  user_id?: number;
  covers_for_teacher: RestructuredObject[];
  receiver: IAssignment;
}[] {
  const restructuredData: {
    [receiverId: number]: IRestructureDataByReceiverId;
  } = {};

  // Asl ma'lumotlardan o'tib ketish
  data?.forEach((item) => {
    const user_id = item.salary?.receiver_id || 0;

    // Yangi obyektni tuzish
    const newItem: ICoverTeacherComponent = {
      ...item,
      pair: {
        ...item.pair,
        receiver: assignments?.find(
          (assignment) => assignment?.user?.id == item.pair?.salary?.receiver_id
        ),
      },
    };

    // Ma'lumotlar ro'yxatida emas, yangi ro'yxat tuzish
    if (!restructuredData[user_id]) {
      restructuredData[user_id] = {
        user_id: user_id,
        receiver: assignments?.find(
          (assignment) => assignment?.user?.id == user_id
        ),
        covers_for_teacher: [newItem],
      };
    } else {
      restructuredData[user_id].covers_for_teacher.push(newItem);
    }
  });

  // Massiv shaklida qaytarish
  const restructuredDataAsArray = Object.values(restructuredData);
  let mergeForReceiver: any = [];
  if (restructuredDataAsArray) {
    for (let i = 0; i < restructuredDataAsArray?.length; i++) {
      mergeForReceiver = [
        ...mergeForReceiver,
        {
          receiver: restructuredDataAsArray?.[i]?.receiver,
          user_id: restructuredDataAsArray?.[i]?.user_id,
          covers_for_teacher: restructureArrayToUser({
            data: sortByDateInData(
              restructuredDataAsArray?.[i]?.covers_for_teacher
            ),
          }),
        },
      ];
    }
  }
  return mergeForReceiver?.sort((a: any, b: any) => {
    const dateA: any = new Date(
      a.covers_for_teacher?.[0]?.user_covers?.[0]?.created_at
    );
    const dateB: any = new Date(
      b.covers_for_teacher?.[0]?.user_covers?.[0]?.created_at
    );
    return dateB - dateA;
  });
}

// restructureArrayToUser funksiyasi
export function restructureArrayToUser({
  data,
}: {
  data?: ICoverTeacherComponent[];
}): RestructuredObject[] {
  const restructuredArray: RestructuredObject[] = [];

  if (data) {
    data.forEach((item) => {
      const { receiver_id } = item.pair.salary;

      // Mavjud foydalanuvchi
      const existingReceiver = restructuredArray.find(
        (receiver) => receiver.user_id == receiver_id
      );

      // Yangi obyektni tuzish
      const newObj: RestructuredObject = {
        user_id: receiver_id,
        user: item?.pair?.receiver?.user,
        user_covers: [],
        // Xohlagan boshqa xususiyatlarni asl obyektdan qo'shishingiz mumkin
      };

      // Foydalanuvchi ro'yxatda mavjud, yangi obyektni qo'shish
      if (existingReceiver) {
        existingReceiver.user_covers.push(item);
      } else {
        newObj.user_covers.push(item);
        restructuredArray.push(newObj);
      }
    });
  }

  return restructuredArray;
}

// sumAmountCalculator funksiyasi
export function sumAmountCalculator({
  restructured,
}: {
  restructured: IRestructured[];
}) {
  let leftSum = 0;
  let rightSum = 0;
  if (restructured?.length) {
    for (let i = 0; i < restructured?.length; i++) {
      const single = restructured[i];

      if (single?.data?.length) {
        for (let j = 0; j < single?.data?.length; j++) {
          const singleData = single?.data[j];

          // O'ng tomondagi qoplamani hisoblash
          leftSum = leftSum + calculateTotalScore(singleData);

          if (singleData?.covers_for_teacher?.length)
            for (let k = 0; k < singleData?.covers_for_teacher?.length; k++) {
              const covers_for_teacher = singleData?.covers_for_teacher[k];
              // Moliyaviy miqdorni qo'shish
              rightSum =
                rightSum +
                covers_for_teacher?.user_covers?.reduce((acc, cur) => {
                  return acc + (parseFloat(cur?.pair?.value) || 0);
                }, 0);
            }
        }
      }
    }
  }
  return {
    leftSum,
    rightSum,
  };
}
