export interface CreateOrderParams {
  amocrm_id: number;
  bouquets: {
    id: string;
    items: {
      productId: string;
      quantity: number;
    }[];
  }[];
  files?: File[];
  notes?: string;
}