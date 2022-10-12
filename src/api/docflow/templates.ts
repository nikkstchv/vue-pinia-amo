import { API_DOCFLOW } from "./api";


export const getTemplates = async () => {
  return API_DOCFLOW.get('doc-templates').then(response => response?.data);
}