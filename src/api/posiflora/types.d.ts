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