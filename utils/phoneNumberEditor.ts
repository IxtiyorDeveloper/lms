export const phoneEditor = (phone?: string) => {
  return (
    phone?.split(",")?.map((p: any) => {
      const text = p?.split?.(":");
      return {
        id: p,
        type: text[0],
        is_confirmed: +text[2],
        phone_number: text[1],
      };
    }) || []
  );
};
