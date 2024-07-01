const regex = /^(\+\d{12})$/;

export const validatePhone = (phoneNumber: string) => {
  return regex.test(phoneNumber);
};
