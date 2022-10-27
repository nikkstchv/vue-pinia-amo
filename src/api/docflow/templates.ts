import { API_DOCFLOW } from "./api";


export const getTemplates = async () => {
  return API_DOCFLOW.get('doc-template').then(response => response?.data);
}

export const getTemplateById = async (id: number) => {
  return API_DOCFLOW.get(`doc-template/${id}`).then(response => response?.data);
}


export const addTemplate = async (newItem: object) => {
  return API_DOCFLOW.post('doc-template', { ...newItem })
    .then(response => response?.data);
}

export const updateTemplate = async (id: number, item: object) => {
  return API_DOCFLOW.put(`doc-template/${id}`, {...item}).then(response => response?.data);
}

export const deleteTemplate = async (id: number) => {
  return API_DOCFLOW.delete(`doc-template/${id}`).then(response => response?.data);
}