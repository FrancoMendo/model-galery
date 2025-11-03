/**
 * Datos de producciones/experiencias fotográficas
 */

import type { Production } from '../types/production.types';

/**
 * Helper para generar fotos de una producción automáticamente
 * Basado en nomenclatura: production_{productionId}_item_{photoNumber}.JPG
 */
const generatePhotos = (productionId: number, totalPhotos: number) => {
  return Array.from({ length: totalPhotos }, (_, index) => ({
    id: `p${productionId}-${index + 1}`,
    url: `/src/assets/images/models/production_${productionId}_item_${index + 1}.JPG`,
    alt: /* `Producción ${productionId} - Foto ${index + 1}` */  "",
  }));
};

export const mockProductions: Production[] = [
  {
    id: '2',
    title: 'Sesión Artística',
    description: 'Producción artística con fotografías conceptuales y creativas, explorando diferentes ángulos y composiciones.',
    coverImage: '/src/assets/images/models/production_2_item_1.JPG',
    category: 'Artística',
    date: new Date('2024-11-11'),
    location: 'Estudio',
    photographer: 'Fotógrafo',
    photos: generatePhotos(2, 7),
    tags: ['artistica', 'conceptual', 'creativo'],
  },
  {
    id: '3',
    title: 'Polaroid Collection',
    description: 'Colección de fotografías con estética polaroid. Sesión espontánea y natural capturando momentos únicos.',
    coverImage: '/src/assets/images/models/production_3_item_1.JPG',
    category: 'Polaroid',
    date: new Date('2025-01-03'),
    location: 'Estudio',
    photographer: 'Fotógrafo',
    photos: generatePhotos(3, 10),
    tags: ['polaroid', 'vintage', 'espontaneo'],
  },
  {
    id: '4',
    title: 'Producción fotografica',
    description: 'Primera producción profesional del año. Sesión con diferentes looks y estilos variados.',
    coverImage: '/src/assets/images/models/production_4_item_1.JPG',
    category: 'Editorial',
    date: new Date('2024-10-02'),
    location: 'Exterior',
    photographer: 'Fotógrafo',
    photos: generatePhotos(4, 4),
    tags: ['editorial', 'profesional', 'variado'],
  },
  {
    id: '5',
    title: 'TEC Italy Studio',
    description: 'Sesión fotográfica para TEC Italy. Producción en estudio con iluminación profesional.',
    coverImage: '/src/assets/images/models/production_5_item_1.JPG',
    category: 'Comercial',
    date: new Date('2024-11-04'),
    location: 'Estudio',
    photographer: 'Fotógrafo',
    photos: generatePhotos(5, 2),
    tags: ['comercial', 'marca', 'tecitaly'],
  },
  {
    id: '6',
    title: 'Veganis Campaign',
    description: 'Campaña fotográfica para Veganis. Producción enfocada en lifestyle y producto vegano.',
    coverImage: '/src/assets/images/models/production_6_item_1.JPG',
    category: 'Comercial',
    date: new Date('2024-11-04'),
    location: 'Exteriores',
    photographer: 'Fotógrafo',
    photos: generatePhotos(6, 3),
    tags: ['comercial', 'lifestyle', 'veganis'],
  },
];

/**
 * Obtiene todas las producciones
 */
export const getAllProductions = (): Production[] => {
  return mockProductions;
};

/**
 * Obtiene una producción por ID
 */
export const getProductionById = (id: string): Production | undefined => {
  return mockProductions.find(prod => prod.id === id);
};

/**
 * Filtra producciones por categoría
 */
export const getProductionsByCategory = (category: string): Production[] => {
  return mockProductions.filter(prod => 
    prod.category.toLowerCase() === category.toLowerCase()
  );
};

/**
 * Busca producciones por término
 */
export const searchProductions = (searchTerm: string): Production[] => {
  const term = searchTerm.toLowerCase();
  return mockProductions.filter(prod => 
    prod.title.toLowerCase().includes(term) ||
    prod.description.toLowerCase().includes(term) ||
    prod.tags?.some(tag => tag.toLowerCase().includes(term))
  );
};

