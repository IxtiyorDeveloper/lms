export default {
  boss: "BOSS",
  teacher: "TEACHER",
  pupil: "PUPIL",
};

export const ROLE_DEFAULT_ROUTES = [
  {
    url: "/schedule",
    label: "Schedule Page",
    value: "100",
  },
  {
    url: "/welcome",
    label: "Welcome Page",
    value: "200",
  },
  {
    url: "/finance/transactions",
    label: "Transaction Page",
    value: "300",
  },
];

export enum RbacRoleDocumentEnum {
  PRIVACY_POLICY = 100,
  RULES_AND_CONTRACTS = 200
}