import { API_DOCFLOW } from "./api";


export const getTemplates = async () => {
  return API_DOCFLOW.get('doc-templates').then(response => response?.data);
}

export const getTemplateById = async (id: number) => {
  return API_DOCFLOW.get(`doc-templates/${id}`).then(response => response?.data);
}


export const addTemplate = async (newItem: object) => {
  return API_DOCFLOW.post('doc-templates', { ...newItem })
    .then(response => response?.data);
}

export const updateTemplate = async (id: number, item: object) => {
  return API_DOCFLOW.put(`doc-templates/${id}`, { ...item }).then(response => response?.data);
}

export const deleteTemplate = async (id: number) => {
  return API_DOCFLOW.delete(`doc-templates/${id}`).then(response => response?.data);
}