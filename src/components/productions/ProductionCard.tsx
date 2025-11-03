/**
 * Tarjeta de producción fotográfica
 */

import type { Production } from '../../types/production.types';

interface ProductionCardProps {
  production: Production;
  onClick: () => void;
}

export const ProductionCard = ({ production, onClick }: ProductionCardProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div 
      className="production-card"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: '#fff',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Imagen de portada */}
      <div 
        className="production-card-image"
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '75%', // Ratio 4:3
          overflow: 'hidden',
          backgroundColor: '#f3f4f6',
        }}
      >
        <img 
          src={production.coverImage}
          alt={production.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          loading="lazy"
        />
        
        {/* Badge con cantidad de fotos */}
        <div 
          className="photo-count-badge"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>📸</span>
          <span>{production.photos.length}</span>
        </div>

        {/* Categoría */}
        <div 
          className="category-badge"
          style={{
            position: 'absolute',
          bottom: '12px',
          left: '12px',
          backgroundColor: 'rgba(70, 126, 3, 0.95)',
          color: 'white',
            padding: '4px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {production.category}
        </div>
      </div>

      {/* Contenido */}
      <div 
        className="production-card-content"
        style={{
          padding: '20px',
        }}
      >
        <h3 
          style={{
            margin: '0 0 8px 0',
            fontSize: '20px',
            fontWeight: '700',
            color: '#1a1a18',
            lineHeight: '1.3',
          }}
        >
          {production.title}
        </h3>

        <p 
          style={{
            margin: '0 0 12px 0',
            fontSize: '14px',
            color: '#3f3f39',
            lineHeight: '1.5',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {production.description}
        </p>

        {/* Metadata */}
        <div 
          className="production-meta"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            fontSize: '13px',
            color: '#9fa499',
          }}
        >
          {production.date && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📅</span>
              <span>{formatDate(production.date)}</span>
            </div>
          )}
          
          {production.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📍</span>
              <span>{production.location}</span>
            </div>
          )}

         {/*  {production.photographer && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>📷</span>
              <span>{production.photographer}</span>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProductionCard;

