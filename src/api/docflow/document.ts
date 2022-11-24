import { API_DOCFLOW } from "./api";


export const getDocuments = async () => {
  return API_DOCFLOW.get('document').then(response => response?.data);
}

export const getDocumentById = async (id: number) => {
  return API_DOCFLOW.get(`document/${id}`).then(response => response?.data);
}


export const addDocument = async (newItem: object) => {
  return API_DOCFLOW.post('document', { ...newItem })
    .then(response => response?.data);
}

export const updateDocument = async (id: number, item: object) => {
  return API_DOCFLOW.put(`document/${id}`, {...item}).then(response => response?.data);
}

export const deleteDocument = async (id: number) => {
  return API_DOCFLOW.delete(`document/${id}`).then(response => response?.data);
}