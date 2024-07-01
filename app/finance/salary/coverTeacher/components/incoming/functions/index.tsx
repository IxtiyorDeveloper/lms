import moment from "moment";
import { ICoverTeacherComponent } from "types/finance/salary";
import { removeDuplicatesByDate } from "../toolTip/utils";
import { calculateTotalScore } from "../rightCoverItem/utils";
import { RestructuredObject } from "../../calendarFilter/functions";
import { IAssignment } from "types";

// Bu funksiya ICoverTeacherComponent turidagi ma'lumotlar massivini sana formatiga o'zgartiradi
export function formatDateRange(data: ICoverTeacherComponent[]) {
  // Ma'lumotlardagi sana dublikatlarini olib tashlaymiz
  const initialData = removeDuplicatesByDate(data);

  // Har bir ma'lumot obyektini sana obyektiga aylantiramiz
  const dates = initialData.map((entry) => moment(entry.data.date));

  // Faqat haqiqiy sanalarni tanlaymiz
  const validDates = dates.filter((date) => date.isValid());

  // Agar haqiqiy sana mavjud bo'lmasa, null qaytaradi
  if (validDates.length === 0) {
    return null;
  }

  // Sanalarni tartiblash
  validDates.sort((a, b) => a.diff(b));

  // Agar faqat bir sana mavjud bo'lsa, uni "MMMM D" formatida qaytaradi, aks holda birinchi va oxirgi sanalarning shaklini ko'rsatadigan massivni qaytaradi
  if (validDates.length === 1) {
    return [validDates[0].format("MMMM D")];
  }

  return [validDates[0].format("MMMM D"), `+${validDates.length - 1}`];
}

// Bu funksiya restructured obyektni qabul qilib, foydalanuvchining umumiy yig'indini va o'qituvchi uchun umumiy yig'indini hisoblaydi
export function sumAmountCalculator({
  restructured,
}: {
  restructured: {
    user_id?: number | undefined;
    covers_for_teacher: RestructuredObject[];
    receiver: IAssignment;
  }[];
}) {
  let leftSum = 0; // Foydalanuvchi uchun umumiy yig'indi
  let rightSum = 0; // O'qituvchi uchun umumiy yig'indi

  // Agar restructured massivi mavjud bo'lsa
  if (restructured?.length)
    for (let i = 0; i < restructured?.length; i++) {
      const singleIncomingRestructured = restructured[i];
      // Foydalanuvchi uchun yig'indini hisoblaymiz
      leftSum = leftSum + calculateTotalScore(singleIncomingRestructured);

      // Agar covers_for_teacher ro'yxati mavjud bo'lsa
      if (singleIncomingRestructured.covers_for_teacher.length)
        for (
          let j = 0;
          j < singleIncomingRestructured.covers_for_teacher.length;
          j++
        ) {
          const covers_for_teacher =
            singleIncomingRestructured.covers_for_teacher[j];
          // O'qituvchi uchun yig'indini hisoblaymiz
          rightSum =
            rightSum +
            covers_for_teacher?.user_covers?.reduce((acc, cur) => {
              return acc + (parseFloat(cur?.pair?.value?.toString()) || 0);
            }, 0);
        }
    }

  // Natijani qaytaradi: foydalanuvchi uchun umumiy yig'indi va o'qituvchi uchun umumiy yig'indini
  return {
    leftSum,
    rightSum,
  };
}
