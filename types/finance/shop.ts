export interface IShop {
  id: number;
  customer_id: number;
  status: number;
  can_pickup_from: string;
  can_pickup_to: string;
  customer: IShopCustomer;
  items: IShopItem[];
  created: IShopCreated;
  given: {
    id: string;
    created_at: string;
    created_by: null;
    action_type: null;
    createdBy: {
      id: number;
      username: string;
    };
  };
  cancel: {
    id: string;
    created_at: string;
    created_by: null;
    action_type: null;
    createdBy: {
      id: number;
      username: string;
    };
  };
  buttonActions: {
    canGive: boolean;
  };
}

export interface IShopCustomer {
  id: number;
  username: string;
  profile: IShopProfile;
  phones: any[];
}

export interface IShopProfile {
  fullName: string;
  avatar: any;
}

export interface IShopItem {
  id: number;
  count: number;
  price: number;
  variation: IShopVariation;
}

export interface IShopVariation {
  id: number;
  optionsValue: IShopOption[];
  product: {
    id: number;
    name: string;
    cover_photo: string;
    category_id: number;
    type: number;
    order: number;
  };
}

export interface IShopOption {
  property: string;
  option: string;
}

export interface IShopCreated {
  id: number;
  created_at: string;
  created_by: number;
  action_type: number;
}
