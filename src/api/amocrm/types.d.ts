export type AmoCrmPipelinesResponse = AmoCrmPipeline[];
export interface AmoCrmPipeline {
  id: number;
  name: string;
  sort: number;
  is_main: boolean;
  is_unsorted_on: boolean;
  is_archive: boolean;
  account_id: number;
  _links: {
    self: {
      href: string;
    };
  };
  _embedded: {
    statuses: AmoCrmStatus[];
  };
}

export interface AmoCrmStatus {
  id: number;
  name: string;
  sort: number;
  is_editable: boolean;
  pipeline_id: number;
  color: string;
  type: number;
  account_id: number;
  _links: {
    self: {
      href: string;
    };
  };
}

export type AmoCrmLeadsResponse = AmoCrmLead[];
export interface AmoCrmLead {
  id: number;
  name: string;
  price: number;
  responsible_user_id: number;
  group_id: number;
  status_id: number;
  pipeline_id: number;
  loss_reason_id: number | null;
  created_by: number;
  updated_by: number;
  created_at: number;
  updated_at: number;
  closed_at: number | null;
  closest_task_at: number | null;
  is_deleted: boolean;
  custom_fields_values: Array<{
    field_id: number;
    field_name: string;
    field_code: string | null;
    field_type: string;
    values: Array<{
      value: string | number;
      enum_id?: number;
      enum_code?: string | null;
    }>;
  }>;
  score: number | null;
  account_id: number;
  labor_cost: number | null;
  _links: {
    self: {
      href: string;
    };
  };
  _embedded: {
    tags: any[];
    companies: any[];
    contacts: Array<{
      id: number;
      is_main: boolean;
      _links: {
        self: {
          href: string;
        };
      };
    }>;
  };
}
