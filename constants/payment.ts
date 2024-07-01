export const PAYMENT_FULL_PAID = 100;
export const PAYMENT_PARTIALLY_PAID = 200;
export const PAYMENT_NOT_PAID = 300;
export const PAYMENT_INCOME = 100;
export const PAYMENT_EXPENSE = 200;
export const PAYMENT_MOT = 100;
export const PAYMENT_BANK = 200;
export const PAYMENT_CASH = 200;
export const PAYMENT_CARD = 300;
export const ONLINE_PAYMENT = 400;
export const STUDENT_BALANCE = 1100;
export const PAYMENT_BALANCE = 500;
export const HAS_STUDENT_BALANCE = 100;
export const NO_STUDENT_BALANCE = 200;

export const paymentTypes = {
  [PAYMENT_CASH]: "Cash",
  [PAYMENT_MOT]: "MOT",
  [PAYMENT_CARD]: "Plastic Card",
  [ONLINE_PAYMENT]: "Online Payment",
};

export const paymentForms = {
  [PAYMENT_MOT]: "MOT",
  [PAYMENT_BANK]: "Bank",
};

export enum EPayment {
  PAYMENT_MOT = 100,
  PAYMENT_BANK = 200,
  PAYMENT_CASH = 200,
  PAYMENT_CARD = 300,
  ONLINE_PAYMENT = 400,
}

export enum ESubPaymentPayment {
  ONLINE_UZUM = 100,

  ONLINE_PAYME = 200,

  ONLINE_CLICK = 300,

  ONLINE_PLUM = 400,
}
export const paymentOptions = [
  { label: "Online Uzum", value: ESubPaymentPayment.ONLINE_UZUM },
  { label: "Online Payme", value: ESubPaymentPayment.ONLINE_PAYME },
  { label: "Online Click", value: ESubPaymentPayment.ONLINE_CLICK },
  { label: "Online Plum", value: ESubPaymentPayment.ONLINE_PLUM },
];
export const SubPaymentTypes = {
  [ESubPaymentPayment.ONLINE_UZUM]: {
    label: "Uzum",
    img: "https://lms.api.inter-nation.uz/images/uzum_light.png",
  },
  [ESubPaymentPayment.ONLINE_PAYME]: {
    label: "Payme",
    img: "https://lms.api.inter-nation.uz/images/payme_light.png",
  },
  [ESubPaymentPayment.ONLINE_CLICK]: {
    label: "Click",
    img: "https://lms.api.inter-nation.uz/images/click_light.png",
  },
  [ESubPaymentPayment.ONLINE_PLUM]: {
    label: "Plum",
    img: "https://lms.api.inter-nation.uz/images/plum_light.png",
  },
};
