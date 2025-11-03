/**
 * Tipos relacionados con la galería de imágenes
 */

import type { Photo } from './model.types';

export interface GalleryState {
  photos: Photo[];
  filteredPhotos: Photo[];
  selectedPhoto: Photo | null;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  layout: GalleryLayout;
  sortBy: SortOption;
}

export const GalleryLayout = {
  GRID: 'grid',
  MASONRY: 'masonry',
  CAROUSEL: 'carousel',
  SLIDESHOW: 'slideshow',
} as const;

export type GalleryLayout = typeof GalleryLayout[keyof typeof GalleryLayout];

export const SortOption = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  POPULAR: 'popular',
  RANDOM: 'random',
} as const;

export type SortOption = typeof SortOption[keyof typeof SortOption];

export interface GalleryFilters {
  category?: string;
  tags?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  orientation?: 'portrait' | 'landscape' | 'square';
}

export interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  photos: Photo[];
}

