/**
 * Componente ModelCard - Tarjeta de modelo
 */

import type { Model } from '../../types/model.types';

interface ModelCardProps {
  model: Model;
  onClick?: () => void;
}

export const ModelCard = ({ model, onClick }: ModelCardProps) => {
  return (
    <div className="model-card" onClick={onClick}>
      <div className="model-card-image">
        <img 
          src={model.profilePhoto} 
          alt={model.name}
          loading="lazy"
        />
        {model.featured && (
          <span className="featured-badge">Destacado</span>
        )}
      </div>
      
      <div className="model-card-content">
        <h3 className="model-name">{model.name}</h3>
        
        <div className="model-stats">
          <span>{model.age} años</span>
          <span>{model.height}cm</span>
        </div>
        
        <div className="model-categories">
          {model.categories.slice(0, 2).map(category => (
            <span key={category} className="category-badge">
              {category}
            </span>
          ))}
        </div>
        
        {!model.availability && (
          <span className="unavailable-badge">No disponible</span>
        )}
      </div>
    </div>
  );
};

export default ModelCard;

