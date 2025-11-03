/**
 * Componente GalleryGrid - Grid de fotos
 */

import type { Photo } from '../../types/model.types';

interface GalleryGridProps {
  photos: Photo[];
  columns?: number;
  gap?: number;
  onPhotoClick?: (photo: Photo) => void;
}

export const GalleryGrid = ({ 
  photos, 
  columns = 3, 
  gap = 16,
  onPhotoClick 
}: GalleryGridProps) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
  };

  return (
    <div className="gallery-grid" style={gridStyle}>
      {photos.map(photo => (
        <div 
          key={photo.id} 
          className="gallery-item"
          onClick={() => onPhotoClick?.(photo)}
        >
          <img 
            src={photo.thumbnail} 
            alt={photo.alt}
            loading="lazy"
            className="gallery-image"
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;

