export type Document = {
  [key: string]: string;
};

export type Paginated = {
  [key: string]: string;
};

export type Settlement = {
  [key: string]: string;
};

export type Template = {
  [key: string]: string;
};

export class DocumentState {
  items: Document[];
  paginated: Paginated[];
  page: number;
  limit: number;
  total: number;
  userId: number;
  entityType: number;
  isLoading: boolean;
  currOrgId: string;
  currSettlmentId: string;
  currSettlment: Settlement;
  currOrganization: Document;
  currTemplateId: string;
  newItem: {};
}
