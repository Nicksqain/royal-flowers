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
export interface AmoCrmLead {
}
