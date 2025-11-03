/**
 * Componente Lightbox para ver fotos en pantalla completa
 */

import { useEffect, useState, useRef } from 'react';
import type { Photo } from '../../types/production.types';

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const Lightbox = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) => {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Animación al cambiar de foto
  useEffect(() => {
    if (direction) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setDirection(null);
      }, 150); // Duración del fade suave
      return () => clearTimeout(timer);
    }
  }, [currentIndex, direction]);

  // Manejar teclas de navegación
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          setDirection('right');
          onPrevious();
          break;
        case 'ArrowRight':
          setDirection('left');
          onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  // Manejar scroll/arrastre horizontal
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const swipeThreshold = 100; // Mínimo de píxeles para considerar un swipe
    const swipeDistance = touchStart - touchEnd;

    // Solo navegar si realmente hubo un arrastre significativo
    if (touchEnd !== 0 && Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe hacia la izquierda = siguiente foto
        setDirection('left');
        onNext();
      } else {
        // Swipe hacia la derecha = foto anterior
        setDirection('right');
        onPrevious();
      }
    }
    
    setIsDragging(false);
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Manejar arrastre con mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevenir si es click en los botones
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setTouchStart(e.clientX);
    setTouchEnd(0); // Reset touchEnd
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const swipeThreshold = 100; // Aumentado para evitar clicks accidentales
    const swipeDistance = touchStart - touchEnd;

    // Solo navegar si realmente se movió el mouse (touchEnd fue actualizado)
    // y si la distancia es mayor al threshold
    if (touchEnd !== 0 && Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        setDirection('left');
        onNext();
      } else {
        setDirection('right');
        onPrevious();
      }
    }
    
    setIsDragging(false);
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setTouchStart(0);
      setTouchEnd(0);
    }
  };

  // Manejar scroll horizontal con rueda del mouse
  const handleWheel = (e: React.WheelEvent) => {
    // Solo responder a scroll horizontal (shift + scroll)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (e.deltaX > 0) {
        setDirection('left');
        onNext();
      } else {
        setDirection('right');
        onPrevious();
      }
    }
  };

  // Prevenir scroll cuando el lightbox está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div
      className="lightbox-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        cursor: isDragging ? 'grabbing' : 'default',
      }}
      onClick={(e) => {
        // Solo cerrar si se hace click en el fondo, no en la imagen
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: 'none',
          color: 'white',
          fontSize: '32px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.3s',
          zIndex: 10001,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
        }}
        aria-label="Cerrar galería"
      >
        ×
      </button>

      {/* Contador de fotos */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: '16px',
          fontWeight: '600',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '10px 20px',
          borderRadius: '24px',
          zIndex: 10001,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span>{currentIndex + 1}</span>
        <span style={{ fontSize: '12px', opacity: 0.7 }}>/</span>
        <span>{photos.length}</span>
      </div>

      {/* Imagen con animación fade suave */}
      <div
        ref={imageRef}
        onClick={(e) => {
          e.stopPropagation();
          // No hacer nada al hacer click en la imagen
        }}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          opacity: isAnimating ? 0.4 : 1,
          transition: isDragging 
            ? 'none' 
            : 'opacity 0.15s ease-in-out',
        }}
      >
        <img
          key={currentPhoto.id}
          src={currentPhoto.url}
          alt={currentPhoto.alt}
          draggable={false}
          style={{
            maxWidth: '100%',
            maxHeight: '90vh',
            objectFit: 'contain',
            borderRadius: '8px',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Información de la foto y controles */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          zIndex: 10001,
        }}
      >
        {currentPhoto.alt && (
          <div
            style={{
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '12px 24px',
              borderRadius: '8px',
              maxWidth: '80vw',
              textAlign: 'center',
              fontSize: '14px',
            }}
          >
            {currentPhoto.alt}
          </div>
        )}
        
        {/* Botones de navegación */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          {/* Botón Anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDirection('right');
              onPrevious();
            }}
            disabled={photos.length <= 1}
            style={{
              background: photos.length <= 1 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              fontSize: '20px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              cursor: photos.length <= 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              opacity: photos.length <= 1 ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (photos.length > 1) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (photos.length > 1) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
            aria-label="Foto anterior"
          >
            ←
          </button>

          {/* Indicador de página */}
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '14px',
              fontWeight: '600',
              minWidth: '60px',
              textAlign: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '8px 16px',
              borderRadius: '20px',
            }}
          >
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDirection('left');
              onNext();
            }}
            disabled={photos.length <= 1}
            style={{
              background: photos.length <= 1 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              fontSize: '20px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              cursor: photos.length <= 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              opacity: photos.length <= 1 ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (photos.length > 1) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (photos.length > 1) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
            aria-label="Foto siguiente"
          >
            →
          </button>
        </div>
        
        {/* Hint de navegación */}
        <div
          style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '12px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>Arrastra, o usa ←→ los botones</span>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;

