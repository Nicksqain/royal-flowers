export type PosifloraStoresResponse = PosifloraStore[];

export interface StoreAttributes {
  title: string;
  addressCity: string;
  address: string | null;
  printLogo: boolean;
  printAddress: boolean;
  concealmentItems: number;
  calculatedAt: string;
  externalLinkId: string;
  anotherTitle: string | null;
  formDeliveryTimeFormat: string;
  revision: number;
}

export interface StoreRelationships {
  timezone: {
    data: {
      type: string;
      id: string;
    };
  };
  warehouse: {
    data: {
      type: string;
      id: string;
    };
  };
  image: {
    data: null | any;
  };
  printSettings: {
    data: any[];
  };
  deliveryDiapasons: {
    data: any[];
  };
  mainApplication: {
    data: null | any;
  };
}

export interface PosifloraStore {
  type: string;
  id: string;
  attributes: StoreAttributes;
  relationships: StoreRelationships;
}

// PRODUCTS
export type PosifloraProductsResponse = PosifloraProduct[];
export interface ProductAttributes {
  title?: string;
  description?: string | null;
  itemType?: string;
  globalId?: any;
  updatedAt?: string;
  added?: any;
  postfix?: any;
  public?: boolean;
  fractional?: boolean;
  minPrice?: number;
  maxPrice?: number;
  revision?: number;
  deleted?: boolean;
  cost?: number;
}
export interface ProductRelationships {
  group: {
    data: {
      type: string;
      id: string;
    };
  };
  category: {
    data: {
      type: string;
      id: string;
    };
  };
  measure: {
    data: {
      type: string;
      id: string;
    };
  };
  logo: {
    data: null | any;
  };
  markdowns: {
    data: any[];
  };
}
export interface PosifloraProduct {
  type: string;
  id: string;
  attributes: ProductAttributes;
  relationships: ProductRelationships;
}