import { API_DOCFLOW } from "./api";

type PaginatedDto = {
  page: number,
  limit: number,
  search: string
}

export const getDocuments = async () => {
  return API_DOCFLOW.get('documents').then(response => response?.data);
}

export const getPaginatedDocuments = async (query: PaginatedDto) => {
  return API_DOCFLOW.get(
    'documents/paginated',
    { params: { ...query } }
  ).then((response) => response?.data);
};

export const getDocumentById = async (id: number) => {
  return API_DOCFLOW.get(`documents/${id}`).then(response => response?.data);
}


export const addDocument = async (newItem: object) => {
  return API_DOCFLOW.post('documents', { ...newItem })
    .then(response => response?.data);
}

export const updateDocument = async (id: number, item: object) => {
  return API_DOCFLOW.put(`documents/${id}`, { ...item }).then(response => response?.data);
}

export const deleteDocument = async (id: number) => {
  return API_DOCFLOW.delete(`documents/${id}`).then(response => response?.data);
}