export interface IStatuses {
  "100": "Fired";
  "200": "Hired";
  "300": "In vacation";
}

export enum EVacationType {
  normal = "100",
  early = "200",
}

export enum EVacationCell {
  not_recommended_period = "not-recommended",
  recommended_period = "recommended",
  unused_period = "unused",
  past_vacation = "past_vacation",
  upcoming_vacation = "upcoming_vacation",
  not_working = "not-working",
}
