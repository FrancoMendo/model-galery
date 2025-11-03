/**
 * Tipos relacionados con modelos y actrices
 */

export interface Photo {
  id: string;
  url: string;
  thumbnail: string;
  alt: string;
  width: number;
  height: number;
  category?: string;
  tags?: string[];
}

export interface Model {
  id: string;
  name: string;
  slug: string;
  age: number;
  height: number; // en cm
  measurements?: string;
  hairColor?: string;
  eyeColor?: string;
  nationality?: string;
  languages?: string[];
  bio: string;
  photos: Photo[];
  profilePhoto: string;
  featured: boolean;
  categories: ModelCategory[];
  socialMedia?: SocialMedia;
  availability: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialMedia {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  tiktok?: string;
}

export const ModelCategory = {
  FASHION: 'fashion',
  COMMERCIAL: 'commercial',
  EDITORIAL: 'editorial',
  RUNWAY: 'runway',
  FITNESS: 'fitness',
  PLUS_SIZE: 'plus_size',
  ACTOR: 'actor',
  ACTRESS: 'actress',
} as const;

export type ModelCategory = typeof ModelCategory[keyof typeof ModelCategory];

export interface ModelFilters {
  category?: ModelCategory;
  minAge?: number;
  maxAge?: number;
  minHeight?: number;
  maxHeight?: number;
  hairColor?: string;
  eyeColor?: string;
  nationality?: string;
  searchTerm?: string;
  featured?: boolean;
  available?: boolean;
}

export interface ModelFormData {
  name: string;
  age: number;
  height: number;
  bio: string;
  categories: ModelCategory[];
  profilePhoto: File | null;
  photos: File[];
}

