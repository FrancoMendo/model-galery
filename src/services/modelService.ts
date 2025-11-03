/**
 * Servicio para operaciones relacionadas con modelos
 */

import { apiClient } from './api';
import type { Model, ModelFilters } from '../types/model.types';
import type { PaginatedResponse } from '../types';

/**
 * Obtiene todos los modelos con paginación y filtros opcionales
 */
export const getModels = async (
  page = 1,
  pageSize = 12,
  filters?: ModelFilters
): Promise<PaginatedResponse<Model>> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  // Agregar filtros a los query params
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });
  }

  return apiClient.get<PaginatedResponse<Model>>(`/models?${queryParams}`);
};

/**
 * Obtiene un modelo por su ID
 */
export const getModelById = async (id: string): Promise<Model> => {
  return apiClient.get<Model>(`/models/${id}`);
};

/**
 * Obtiene un modelo por su slug
 */
export const getModelBySlug = async (slug: string): Promise<Model> => {
  return apiClient.get<Model>(`/models/slug/${slug}`);
};

/**
 * Obtiene modelos destacados
 */
export const getFeaturedModels = async (): Promise<Model[]> => {
  return apiClient.get<Model[]>('/models/featured');
};

/**
 * Busca modelos por término de búsqueda
 */
export const searchModels = async (searchTerm: string): Promise<Model[]> => {
  return apiClient.get<Model[]>(`/models/search?q=${encodeURIComponent(searchTerm)}`);
};

/**
 * Crea un nuevo modelo (requiere autenticación)
 */
export const createModel = async (modelData: FormData): Promise<Model> => {
  const response = await fetch(`${apiClient['baseUrl']}/models`, {
    method: 'POST',
    body: modelData, // FormData para subir archivos
    // No establecer Content-Type, el navegador lo hará automáticamente
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

/**
 * Actualiza un modelo existente (requiere autenticación)
 */
export const updateModel = async (id: string, modelData: Partial<Model>): Promise<Model> => {
  return apiClient.put<Model>(`/models/${id}`, modelData);
};

/**
 * Elimina un modelo (requiere autenticación)
 */
export const deleteModel = async (id: string): Promise<void> => {
  return apiClient.delete<void>(`/models/${id}`);
};

export default {
  getModels,
  getModelById,
  getModelBySlug,
  getFeaturedModels,
  searchModels,
  createModel,
  updateModel,
  deleteModel,
};

