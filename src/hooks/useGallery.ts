/**
 * Custom hook para manejo de estado de galería
 */

import { useState, useEffect, useCallback } from 'react';
import type { Photo } from '../types/model.types';
import { GalleryLayout, SortOption } from '../types/gallery.types';

interface UseGalleryOptions {
  initialLayout?: GalleryLayout;
  initialSortBy?: SortOption;
}

export const useGallery = (
  initialPhotos: Photo[] = [],
  options: UseGalleryOptions = {}
) => {
  const {
    initialLayout = GalleryLayout.GRID,
    initialSortBy = SortOption.NEWEST,
  } = options;

  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>(initialPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [layout, setLayout] = useState<GalleryLayout>(initialLayout);
  const [sortBy, setSortBy] = useState<SortOption>(initialSortBy);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Aplicar filtros y ordenamiento
  useEffect(() => {
    let result = [...photos];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter(
        photo =>
          photo.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          photo.tags?.some(tag =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filtrar por tags seleccionados
    if (selectedTags.length > 0) {
      result = result.filter(photo =>
        selectedTags.every(tag => photo.tags?.includes(tag))
      );
    }

    // Ordenar
    switch (sortBy) {
      case SortOption.NEWEST:
        // Asumiendo que el ID más alto es más reciente
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case SortOption.OLDEST:
        result.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case SortOption.RANDOM:
        result.sort(() => Math.random() - 0.5);
        break;
      // POPULAR requeriría datos adicionales del backend
    }

    setFilteredPhotos(result);
  }, [photos, searchTerm, selectedTags, sortBy]);

  // Función para cambiar el layout
  const changeLayout = useCallback((newLayout: GalleryLayout) => {
    setLayout(newLayout);
  }, []);

  // Función para cambiar el ordenamiento
  const changeSortBy = useCallback((newSortBy: SortOption) => {
    setSortBy(newSortBy);
  }, []);

  // Función para buscar
  const search = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Función para agregar/quitar tags
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }, []);

  // Función para limpiar filtros
  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedTags([]);
  }, []);

  // Función para seleccionar foto (para lightbox)
  const selectPhoto = useCallback((photo: Photo | null) => {
    setSelectedPhoto(photo);
  }, []);

  // Función para navegar entre fotos
  const nextPhoto = useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  }, [selectedPhoto, filteredPhotos]);

  const previousPhoto = useCallback(() => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex =
      currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  }, [selectedPhoto, filteredPhotos]);

  return {
    // Estado
    photos: filteredPhotos,
    selectedPhoto,
    layout,
    sortBy,
    searchTerm,
    selectedTags,

    // Acciones
    setPhotos,
    selectPhoto,
    changeLayout,
    changeSortBy,
    search,
    toggleTag,
    clearFilters,
    nextPhoto,
    previousPhoto,
  };
};

export default useGallery;

