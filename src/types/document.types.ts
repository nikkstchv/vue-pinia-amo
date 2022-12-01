export type Document = {
  [key: string]: string,
}

export type Settlement = {
  [key: string]: string,
}

export type Template = {
  [key: string]: string,
}

export class DocumentState {
  items: Document[];
  isLoading: boolean;
  currOrgId: string;
  currSettlmentId: string;
  currSettlment: Settlement;
  currOrganization: Document;
  currTemplateId: string;
  newItem: {};
}  
