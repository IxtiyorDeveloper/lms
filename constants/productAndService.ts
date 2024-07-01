export const TYPE_PRODUCT = 100;
export const TYPE_SERVICE = 200;
export const PRODUCT_TYPE_STATIC = 100;
export const PRODUCT_TYPE_DYNAMIC = 200;

export const ProductAndServiceType = {
  [TYPE_PRODUCT]: "Product",
  [TYPE_SERVICE]: "Service",
};

export const ProductAndServiceSell = {
  [PRODUCT_TYPE_STATIC]: "Static",
  [PRODUCT_TYPE_DYNAMIC]: "Dynamic",
};

export const productAndServiceEnums = {
  sellPlaces: {
    "100": "Everywhere",
    "200": "Cashier",
    "300": "External app",
  },
  pricingTypes: {
    "100": "Static",
    "200": "Dynamic",
  },
  viewLevels: {
    "100": "All",
    "200": "Management",
  },
  types: {
    "100": "Product",
    "200": "Service",
  },
};
