/**
 * Datos de ejemplo (mock) para desarrollo
 * Reemplazar con llamadas a API en producción
 */

import type { Model } from '../types/model.types';
import { ModelCategory } from '../types/model.types';

export const mockModels: Model[] = [
  {
    id: '1',
    name: 'Ana García',
    slug: 'ana-garcia',
    age: 24,
    height: 175,
    measurements: '86-61-89',
    hairColor: 'Castaño',
    eyeColor: 'Verde',
    nationality: 'Argentina',
    languages: ['Español', 'Inglés'],
    bio: 'Modelo profesional con 5 años de experiencia en pasarelas y campañas comerciales. Especializada en moda y editorial.',
    photos: [
      {
        id: 'p1',
        url: '/images/models/ana-garcia-1.jpg',
        thumbnail: '/images/models/ana-garcia-1-thumb.jpg',
        alt: 'Ana García - Portfolio 1',
        width: 1200,
        height: 1600,
        category: 'fashion',
        tags: ['fashion', 'editorial', 'outdoor'],
      },
    ],
    profilePhoto: '/images/models/ana-garcia-profile.jpg',
    featured: true,
    categories: [ModelCategory.FASHION, ModelCategory.EDITORIAL],
    socialMedia: {
      instagram: '@anagarcia_model',
    },
    availability: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-11-01'),
  },
  {
    id: '2',
    name: 'Carlos Méndez',
    slug: 'carlos-mendez',
    age: 28,
    height: 183,
    hairColor: 'Negro',
    eyeColor: 'Marrón',
    nationality: 'Chile',
    languages: ['Español', 'Inglés', 'Portugués'],
    bio: 'Actor y modelo con experiencia en cine, teatro y publicidad. Disponible para proyectos nacionales e internacionales.',
    photos: [
      {
        id: 'p2',
        url: '/images/models/carlos-mendez-1.jpg',
        thumbnail: '/images/models/carlos-mendez-1-thumb.jpg',
        alt: 'Carlos Méndez - Portfolio 1',
        width: 1200,
        height: 1600,
        category: 'commercial',
        tags: ['actor', 'commercial', 'portrait'],
      },
    ],
    profilePhoto: '/images/models/carlos-mendez-profile.jpg',
    featured: true,
    categories: [ModelCategory.ACTOR, ModelCategory.COMMERCIAL],
    socialMedia: {
      instagram: '@carlosmendez',
      twitter: '@carlosmendez',
    },
    availability: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-10-28'),
  },
  {
    id: '3',
    name: 'Sofía Rodríguez',
    slug: 'sofia-rodriguez',
    age: 26,
    height: 168,
    measurements: '84-63-91',
    hairColor: 'Rubio',
    eyeColor: 'Azul',
    nationality: 'Uruguay',
    languages: ['Español', 'Inglés'],
    bio: 'Actriz versátil con amplia trayectoria en teatro, televisión y cine. Apasionada por los desafíos creativos.',
    photos: [
      {
        id: 'p3',
        url: '/images/models/sofia-rodriguez-1.jpg',
        thumbnail: '/images/models/sofia-rodriguez-1-thumb.jpg',
        alt: 'Sofía Rodríguez - Portfolio 1',
        width: 1200,
        height: 1600,
        category: 'actress',
        tags: ['actress', 'portrait', 'dramatic'],
      },
    ],
    profilePhoto: '/images/models/sofia-rodriguez-profile.jpg',
    featured: false,
    categories: [ModelCategory.ACTRESS],
    socialMedia: {
      instagram: '@sofiarodriguez',
    },
    availability: false,
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-10-25'),
  },
];

// Función helper para obtener un modelo por slug
export const getModelBySlug = (slug: string): Model | undefined => {
  return mockModels.find(model => model.slug === slug);
};

// Función helper para obtener modelos destacados
export const getFeaturedModels = (): Model[] => {
  return mockModels.filter(model => model.featured);
};

// Función helper para obtener modelos por categoría
export const getModelsByCategory = (category: ModelCategory): Model[] => {
  return mockModels.filter(model => model.categories.includes(category));
};

