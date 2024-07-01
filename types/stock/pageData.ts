import { IShopOption } from "types/finance";

export interface IStockPage {
  categories: IStockCategory[];
  shopCategories: IStockCategory[];
  locations: IStockLocation[];
  unitStatuses: IStockUnitStatuses;
  tags: string[];
  users: {
    id: number;
    username: string;
  }[];
  buttonActions: { [k: string]: boolean };
}

export interface IStockProductStatistics {
  "100": {
    external: string;
    internal: string;
  };
  "200": {
    external: string;
    internal: string;
  };
  label: string;
}

export interface IStockCategory {
  id: number;
  name: string;
  products: IStockProduct[];
  imageUrl: string;
  image: {
    id: number;
    name: string;
    base_url: string;
    path: string;
  };
  buttonActions: {
    canUpdate: boolean;
    canDelete: boolean;
    canCreateProduct: boolean;
  };
}

export interface IStockLocation {
  id: number;
  name: string;
}

export interface IStockUnitStatuses {
  "100": string;
  "200": string;
  "300": string;
}

export interface IStockProduct {
  id: number;
  name: string;
  barcode: string;
  note: string;
  cover_photo: string;
  category_id: number;
  alert_count: number;
  type: number;
  order: number;
  count: number;
  units: IStockUnit;
  isStationary: false;
  notification_status: any;
  alert_counts: any;
  category: {
    id: number;
    name: string;
  };
  status: number;
  amount_status: EStockAmountStatus;
  price: number;
  sellPlaces: {
    type: number;
    price: number;
  }[];
  cover_file_id: number;
  photos: {
    id: number;
    name: string;
    base_url: string;
    path: string;
  }[];
  stationary_type: number;
  description: string;
  level_id: number;
  tags: string[];
  properties: IStockProductOption[];
  allProperties: IStockProductOption[];
  locations: {
    location_id: number;
    units: IStockUnit;
  }[];
  variations: {
    id: number;
    count: number;
    options: {
      property_id: number;
      option_id: number;
    }[];
    optionsValue: IShopOption[];
    units: IStockUnit;
  }[];
  allVariations: {
    id: number;
    options: {
      property_id: number;
      option_id: number;
    }[];
    units: IStockUnit;
  }[];
  buttonActions: {
    canUpdate: boolean;
    canDelete: boolean;
    canArrival: boolean;
    canDeparture: boolean;
    canChange: boolean;
    canTransfer: boolean;
  };
}

export enum EStockAmountStatus {
  LITTLE_LEFT = 100,
  NORMAL = 200,
  MORE_THAN_NORMAL = 300,
}

export interface IStockProductOption {
  id: number;
  name: string;
  options: {
    id: number;
    name: string;
  }[];
  allOptions: {
    id: number;
    name: string;
  }[];
}

export interface IStockUnit {
  "100": number;
  "200": number;
  "300": number;
  "400": number;
}

export interface IStockProductAction {
  id: number;
  type: number;
  created_by: number;
  created_at: string;
  locations: number[];
  note: string;
  count: number;
  createdBy: {
    id: number;
    username: string;
  };
  variation: {
    id: number;
    options: {
      property_id: number;
      option_id: number;
    }[];
    units: IStockUnit;
  };
}
