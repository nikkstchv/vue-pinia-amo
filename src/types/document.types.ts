export type Document = {
  id: number,
  entityId: number,
  entityType: number,
  url: string,
  number: string,
  templateId: number,
  organizationsId: number,
  settlementAccountId: number,
  isSigned: string,
  userId: number,
  isDeleted: string,
  createdAt: number,
};

export type NewDocument = {
  entityId: number,
  entityType: number,
  url: string,
  number: string,
  templateId: number,
  organizationsId: number,
  settlementAccountId: number,
  isSigned: string,
  userId: number,
  isDeleted: string,
  createdAt: number,
};


export class DocumentState {
  items: Document[];
  paginated: Document[];
  page: number;
  limit: number;
  total: number;
  userId: number;
  entityId: number;
  entityType: number;
  isLoading: boolean;
  isTabLoading: boolean;
  currOrgId: string;
  currSettlmentId: string;
  currSettlment: object;
  currOrganization: object;
  currTemplateId: string;
  newItem: NewDocument;
  isLoad: boolean;
}
