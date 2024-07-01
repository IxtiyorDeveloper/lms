export const getAllFormValues = (data: any) => {
  const values = {
    color: data.root.color,
    title: data.root.title,
    slug: data.root.slug,
    order: data.root.order,
    description: data.root.description,
    vacancy_url: data.root.vacancy_url,
    require_ielts: data.root.require_ielts,
    is_bonus_for: data.root.is_bonus_for,
    application_status: data.root.application_status,
    terms_and_conditions_link: data.root.terms_and_conditions_link,
    description_template: data.root.description_template,
    file_storage_item_id: data.root.file_storage_item_id,
    training_stages: data.root.general?.checkList
      ?.map((item: any, index: number) => {
        if (item.stage) {
          return {
            name: item.stage,
            order: index + 1,
            id: item.id ?? null,
          };
        }
      })
      .filter((item: any) => item),
    candidate_stages: Object?.entries(data.root.candidate_stages)
      .filter(([key, value]) => value && key)
      .map(([key, value]) => Number(key)),
  };
  return values;
};
